'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Waves } from 'lucide-react'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uPointer;
  uniform vec2 uRipple;
  uniform float uRippleTime;
  varying vec2 vUv;

  float surface(vec2 p) {
    float t = uTime * 0.32;
    float swell = sin(p.x * 9.0 + t + sin(p.y * 7.0 - t)) * 0.025;
    swell += sin(p.y * 13.0 - t * 1.2 + sin(p.x * 6.0 + t)) * 0.02;
    swell += sin((p.x + p.y) * 22.0 + t * 0.8) * 0.007;
    float age = max(0.0, uTime - uRippleTime);
    float d = distance(p, uRipple * vec2(uAspect, 1.0));
    float ring = d - age * 0.23;
    swell += sin(ring * 65.0) * exp(-ring * ring * 28.0) * exp(-age * 0.65) * 0.035;
    return swell;
  }

  void main() {
    vec2 p = vUv * vec2(uAspect, 1.0);
    float h = surface(p);
    vec3 normal = normalize(vec3(
      (h - surface(p + vec2(0.003, 0.0))) / 0.003,
      (h - surface(p + vec2(0.0, 0.003))) / 0.003,
      0.7
    ));
    vec3 light = normalize(vec3(uPointer * 0.6 - 0.3, 0.85));
    float reflection = max(dot(normal, light), 0.0);
    float glint = pow(reflection, 32.0);
    float softLight = pow(reflection, 5.0);
    vec3 deep = vec3(0.012, 0.085, 0.17);
    vec3 blue = vec3(0.025, 0.34, 0.49);
    vec3 color = mix(deep, blue, smoothstep(-0.5, 1.3, vUv.y + h * 3.0));
    color += vec3(0.06, 0.24, 0.29) * softLight;
    color += vec3(0.48, 0.78, 0.83) * glint * 0.6;
    color *= 1.0 - smoothstep(0.25, 0.85, distance(vUv, vec2(0.5))) * 0.45;
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

type WaterControls = { setPaused: (paused: boolean) => void }

export default function WaterSurface() {
  const hostRef = useRef<HTMLDivElement>(null)
  const surfaceRef = useRef<HTMLButtonElement>(null)
  const controlsRef = useRef<WaterControls | null>(null)
  const pausedRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
    controlsRef.current?.setPaused(paused)
  }, [paused])

  useEffect(() => {
    const host = hostRef.current
    const target = surfaceRef.current
    if (!host || !target) return

    let disposed = false
    let started = false
    let visible = false
    let cleanup: (() => void) | undefined
    let syncVisibility: (() => void) | undefined

    const initialize = async () => {
      if (started) return
      started = true

      try {
        const THREE = await import('three')
        if (disposed) return

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        const geometry = new THREE.PlaneGeometry(2, 2)
        const uniforms = {
          uTime: { value: 0 },
          uAspect: { value: 1 },
          uPointer: { value: new THREE.Vector2(0.4, 0.8) },
          uRipple: { value: new THREE.Vector2(0.5, 0.5) },
          uRippleTime: { value: -20 },
        }
        const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false })
        scene.add(new THREE.Mesh(geometry, material))
        host.appendChild(renderer.domElement)
        renderer.domElement.className = 'absolute inset-0 h-full w-full'

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let frame = 0
        let lastTime = 0
        let lost = false
        const canAnimate = () => visible && !document.hidden && !pausedRef.current && !motion.matches && !lost
        const draw = () => { if (!lost) renderer.render(scene, camera) }

        // Cap this decorative effect at 30fps; only time on screen advances it.
        const tick = (now: number) => {
          frame = 0
          if (!canAnimate()) return
          const elapsed = now - lastTime
          if (elapsed >= 1000 / 30) {
            uniforms.uTime.value += Math.min(elapsed / 1000, 0.05)
            lastTime = now
            draw()
          }
          frame = requestAnimationFrame(tick)
        }
        const sync = () => {
          cancelAnimationFrame(frame)
          frame = 0
          lastTime = performance.now()
          if (canAnimate()) frame = requestAnimationFrame(tick)
        }
        syncVisibility = sync
        controlsRef.current = { setPaused: sync }

        const resize = () => {
          if (!host.clientWidth || !host.clientHeight) return
          renderer.setSize(host.clientWidth, host.clientHeight)
          uniforms.uAspect.value = host.clientWidth / host.clientHeight
          draw()
        }
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)

        const point = (event: MouseEvent) => {
          const rect = target.getBoundingClientRect()
          return event.detail === 0 && event.type === 'click'
            ? new THREE.Vector2(0.5, 0.5)
            : new THREE.Vector2((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height)
        }
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse' || motion.matches || pausedRef.current) return
          uniforms.uPointer.value.copy(point(event))
        }
        const ripple = (event: MouseEvent) => {
          uniforms.uRipple.value.copy(point(event))
          uniforms.uRippleTime.value = uniforms.uTime.value - 0.4
          draw()
        }
        const leave = () => uniforms.uPointer.value.set(0.4, 0.8)
        const contextLost = (event: Event) => {
          event.preventDefault()
          lost = true
          sync()
          renderer.domElement.style.opacity = '0'
          setReady(false)
        }
        const contextRestored = () => {
          lost = false
          resize()
          renderer.domElement.style.opacity = '1'
          setReady(true)
          sync()
        }

        target.addEventListener('pointermove', move)
        target.addEventListener('pointerleave', leave)
        target.addEventListener('click', ripple)
        document.addEventListener('visibilitychange', sync)
        motion.addEventListener('change', sync)
        renderer.domElement.addEventListener('webglcontextlost', contextLost)
        renderer.domElement.addEventListener('webglcontextrestored', contextRestored)

        cleanup = () => {
          cancelAnimationFrame(frame)
          resizeObserver.disconnect()
          target.removeEventListener('pointermove', move)
          target.removeEventListener('pointerleave', leave)
          target.removeEventListener('click', ripple)
          document.removeEventListener('visibilitychange', sync)
          motion.removeEventListener('change', sync)
          renderer.domElement.removeEventListener('webglcontextlost', contextLost)
          renderer.domElement.removeEventListener('webglcontextrestored', contextRestored)
          geometry.dispose()
          material.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        }
        resize()
        setReady(true)
        sync()
      } catch {
        // The composed gradient remains visible if WebGL cannot start.
        cleanup?.()
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) void initialize()
      syncVisibility?.()
    }, { threshold: 0.01 })
    observer.observe(host)

    return () => {
      disposed = true
      observer.disconnect()
      cleanup?.()
      controlsRef.current = null
    }
  }, [])

  return (
    <div className="relative isolate aspect-square overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] bg-[#083a63] text-white sm:aspect-[6/5] lg:aspect-square">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_25%,#358ea3_0%,#0c536d_35%,#04182f_85%)]">
        <div className="absolute left-[15%] top-[18%] h-[65%] w-[85%] -rotate-35 rounded-[50%] border border-white/10" />
        <div className="absolute left-[25%] top-[28%] h-[45%] w-[65%] -rotate-35 rounded-[50%] border border-white/15" />
      </div>
      <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <button ref={surfaceRef} type="button" disabled={!ready} aria-label="Make a ripple in the water" className="absolute inset-0 z-10 cursor-crosshair touch-pan-y rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-white disabled:cursor-default" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04182f]/30 via-transparent to-[#04182f]/70" />
      <div className="pointer-events-none absolute left-8 top-9 z-20 sm:left-10 sm:top-10">
        <Waves aria-hidden="true" className="mb-4 h-6 w-6 text-[#90CAF9]" strokeWidth={1.25} />
        <p className="text-3xl font-light leading-tight sm:text-4xl">A moment<br />of clarity.</p>
      </div>
      <div className="pointer-events-none absolute inset-x-8 bottom-8 z-20 flex items-center justify-between gap-3 sm:inset-x-10 sm:bottom-9">
        <p className="text-xs tracking-wide text-white/80 sm:text-sm">{ready ? 'Move gently. Tap to make a ripple.' : 'A little stillness. A little perspective.'}</p>
        {ready && (
          <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Resume water motion' : 'Pause water motion'} aria-pressed={paused} className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-[#04182f]/20 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:hidden">
            {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}
