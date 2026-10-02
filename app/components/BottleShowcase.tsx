'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { buildBottle, HEIGHT } from './bottleMesh'
import WaveDivider from './WaveDivider'

/**
 * The bottle on a dark stage, circled by the things we say about the water.
 *
 * The type is drawn to a canvas at runtime rather than downloaded, so the whole
 * section costs one label texture and nothing else over the network. It is also
 * why the phrases can pick up the site's own typeface — the family is read back
 * off the page rather than hard-coded.
 *
 * Nothing is built until the section first scrolls into view, and the frame loop
 * stops again whenever it leaves.
 */

/** Lines from the bottle's own artwork and the product itself. */
const PHRASES = [
  'Clarity in every sip',
  'Hydration you feel',
  'Vapour distilled',
  'Electrolytes for taste',
  'Nothing but water',
  '100% recyclable',
]

const ORBIT_RADIUS = 6.4

/** World height of a phrase's full text block, including its padding. */
const TEXT_BLOCK = 0.78

/** Soft round sprite for the rising bubbles. */
function bubbleTexture() {
  const s = 64
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.9)')
  g.addColorStop(0.45, 'rgba(180,225,255,0.35)')
  g.addColorStop(1, 'rgba(180,225,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Renders one phrase to a canvas texture, supersampled so it stays sharp. */
function textTexture(text: string, family: string) {
  const SS = 2
  const size = 64
  const font = `500 ${size}px ${family}`

  const probe = document.createElement('canvas').getContext('2d')!
  probe.font = font
  const w = Math.ceil(probe.measureText(text).width)

  const padX = Math.ceil(size * 0.35)
  const cw = w + padX * 2
  const ch = Math.ceil(size * 1.7)

  const c = document.createElement('canvas')
  c.width = cw * SS
  c.height = ch * SS
  const ctx = c.getContext('2d')!
  ctx.scale(SS, SS)
  ctx.font = font
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  // A faint glow keeps the type legible where it crosses the lit bottle.
  ctx.shadowColor = 'rgba(4,24,47,0.85)'
  ctx.shadowBlur = size * 0.35
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, padX, ch / 2)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return { tex, aspect: cw / ch }
}

export default function BottleShowcase() {
  const hostRef = useRef<HTMLDivElement>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let teardown: (() => void) | null = null
    let running = false
    let built = false

    const init = () => {
      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
      } catch {
        return // no WebGL: the poster underneath simply stays put
      }

      const width = el.clientWidth || 1200
      const height = el.clientHeight || 680

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.setClearAlpha(0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.NeutralToneMapping
      el.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 200)
      const camHome = new THREE.Vector3(0, 0.6, 22)
      camera.position.copy(camHome)
      camera.lookAt(0, 0, 0)

      const pmrem = new THREE.PMREMGenerator(renderer)
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
      scene.environment = envRT.texture

      const key = new THREE.DirectionalLight(0xffffff, 1.2)
      key.position.set(4, 6, 6)
      const fill = new THREE.DirectionalLight(0x9fd8ff, 0.6)
      fill.position.set(-6, 1, 4)
      const rim = new THREE.DirectionalLight(0xbfe6ff, 1.6)
      rim.position.set(-2, 3, -7)
      scene.add(key, fill, rim)

      // ---- bottle ---------------------------------------------------------
      // The label is the one texture that has to travel. Hold the poster until
      // it lands: an unloaded texture samples as zeros, which the label's alpha
      // cut discards, so the print would otherwise appear a beat late.
      let labelReady = false
      const manager = new THREE.LoadingManager(() => {
        labelReady = true
      })

      const bottle = buildBottle(renderer, manager)
      bottle.group.rotation.y = Math.PI
      scene.add(bottle.group)

      // ---- orbiting phrases -----------------------------------------------
      const ring = new THREE.Group()
      // A little off level, so the phrases swirl past rather than file by.
      ring.rotation.x = THREE.MathUtils.degToRad(-12)
      scene.add(ring)

      type Phrase = {
        mesh: THREE.Mesh
        mat: THREE.MeshBasicMaterial
        geo: THREE.PlaneGeometry
        tex: THREE.Texture
        /** Unscaled plane width, used to size the type to the viewport. */
        width: number
      }
      const phrases: Phrase[] = []

      // A portrait canvas is far narrower than it is tall. Rather than shrink
      // the type until it is unreadable, squash the orbit into an ellipse so
      // the phrases mostly travel toward and away from the camera, then size
      // the type so even the longest line clears the edges.
      let orbitX = ORBIT_RADIUS
      let orbitZ = ORBIT_RADIUS
      const applyLayout = () => {
        const compact = camera.aspect < 1
        camHome.z = compact ? 21 : 22

        // Narrow screens get a squashed ellipse, so the phrases mostly travel
        // toward and away from the camera rather than off the left and right.
        orbitX = compact ? 1.4 : ORBIT_RADIUS
        orbitZ = compact ? 5.2 : ORBIT_RADIUS

        const widest = phrases.reduce((m, p) => Math.max(m, p.width), 0)
        if (widest === 0) return

        // Walk the orbit and take the tightest fit. A phrase is widest on
        // screen where it swings out sideways, but the frustum is narrowest
        // where it swings toward the camera, so neither extreme alone is it.
        const tan = Math.tan(THREE.MathUtils.degToRad(15))
        let room = Infinity
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 24) {
          const x = Math.abs(Math.cos(a)) * orbitX
          const d = Math.max(camHome.z - Math.sin(a) * orbitZ, 4)
          const halfW = d * tan * camera.aspect
          room = Math.min(room, (halfW * 0.94 - x) / (widest / 2))
        }

        const scale = THREE.MathUtils.clamp(room, 0.4, compact ? 0.95 : 1)
        for (const p of phrases) p.mesh.scale.setScalar(scale)
      }
      applyLayout()

      // Wait for webfonts before measuring, so the type is drawn in the site's
      // own face rather than a fallback whose metrics would differ.
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        const family = getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif'

        PHRASES.forEach((line, i) => {
          const { tex, aspect } = textTexture(line, family)
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
          const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            // Soft glyph edges want blending; an alpha cut would chew them up.
            // Skipping the depth write leaves layering to the frame loop.
            depthWrite: false,
            toneMapped: false,
            side: THREE.DoubleSide,
          })
          const planeWidth = TEXT_BLOCK * aspect
          const geo = new THREE.PlaneGeometry(planeWidth, TEXT_BLOCK)
          const mesh = new THREE.Mesh(geo, mat)
          mesh.userData = {
            angle: (i / PHRASES.length) * Math.PI * 2,
            bob: (i * 1.7) % (Math.PI * 2),
            lift: (i / (PHRASES.length - 1) - 0.5) * 2.8,
          }
          ring.add(mesh)
          phrases.push({ mesh, mat, geo, tex, width: planeWidth })
        })
        applyLayout()
      })

      // ---- bubbles --------------------------------------------------------
      const COUNT = 150
      const pos = new Float32Array(COUNT * 3)
      const speed = new Float32Array(COUNT)
      let seed = 7
      const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] = (rnd() - 0.5) * 22
        pos[i * 3 + 1] = (rnd() - 0.5) * HEIGHT * 2.2
        pos[i * 3 + 2] = (rnd() - 0.5) * 14
        speed[i] = 0.35 + rnd() * 0.9
      }
      const bubbleGeo = new THREE.BufferGeometry()
      bubbleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const sprite = bubbleTexture()
      const bubbleMat = new THREE.PointsMaterial({
        size: 0.22,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.75,
        sizeAttenuation: true,
      })
      const bubbles = new THREE.Points(bubbleGeo, bubbleMat)
      bubbles.renderOrder = 20
      scene.add(bubbles)

      // ---- pointer parallax ----------------------------------------------
      const pointer = { x: 0, y: 0 }
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2
        pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      }
      el.addEventListener('pointermove', onMove)

      // ---- frame loop ------------------------------------------------------
      const camPos = new THREE.Vector3()
      const tmp = new THREE.Vector3()
      const start = performance.now()
      let raf = 0

      const frame = () => {
        const t = (performance.now() - start) / 1000

        if (!reduced) {
          bottle.group.rotation.y += 0.004
          bottle.group.position.y = Math.sin(t * 0.9) * 0.09
        }

        const bottleDist = camera.position.length()

        // Phrases travel along a fixed ellipse rather than riding a spinning
        // group, so the horizontal semi-axis stays horizontal and the fit
        // solved in applyLayout actually holds.
        const spin = reduced ? 0 : t * 0.14

        for (const { mesh, mat } of phrases) {
          const { angle: base, bob, lift } = mesh.userData
          const angle = base + spin
          mesh.position.set(
            Math.cos(angle) * orbitX,
            lift + (reduced ? 0 : Math.sin(t * 0.6 + bob) * 0.3),
            Math.sin(angle) * orbitZ
          )
          mesh.lookAt(camera.position)

          const d = mesh.getWorldPosition(tmp).distanceTo(camera.position)
          // Fade with depth so the ring reads as a ring, and so the line behind
          // the glass never competes with the one in front of it.
          mat.opacity = THREE.MathUtils.clamp(1 - (d - 15) / 15, 0.18, 1)
          // The bottle's parts sit at render order 1-3; drop a phrase either
          // side of them depending on which face of the orbit it is on.
          mesh.renderOrder = d < bottleDist ? 10 : 0
        }

        if (!reduced) {
          const p = bubbleGeo.attributes.position as THREE.BufferAttribute
          const top = HEIGHT * 1.1
          for (let i = 0; i < COUNT; i++) {
            let y = p.getY(i) + speed[i] * 0.016
            if (y > top) y = -top
            p.setY(i, y)
          }
          p.needsUpdate = true
        }

        camera.position.lerp(
          camPos.set(camHome.x + pointer.x * 1.1, camHome.y - pointer.y * 0.7, camHome.z),
          0.05
        )
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)

        if (posterRef.current && labelReady) {
          posterRef.current.style.opacity = '0'
          posterRef.current = null
        }
        if (running) raf = requestAnimationFrame(frame)
      }

      const ro = new ResizeObserver(() => {
        const w = el.clientWidth
        const h = el.clientHeight
        if (!w || !h) return
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        applyLayout()
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(w, h)
        if (!running) renderer.render(scene, camera)
      })
      ro.observe(el)

      teardown = () => {
        cancelled = true
        running = false
        cancelAnimationFrame(raf)
        ro.disconnect()
        el.removeEventListener('pointermove', onMove)
        pmrem.dispose()
        envRT.dispose()
        bottle.dispose()
        for (const p of phrases) {
          p.geo.dispose()
          p.mat.dispose()
          p.tex.dispose()
        }
        bubbleGeo.dispose()
        bubbleMat.dispose()
        sprite.dispose()
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
        renderer.dispose()
      }

      return () => {
        running = true
        frame()
      }
    }

    let startLoop: (() => void) | null = null
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!built) {
            built = true
            startLoop = init() ?? null
          }
          if (!running && startLoop) startLoop()
        } else {
          running = false
        }
      },
      { rootMargin: '200px' }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      teardown?.()
    }
  }, [])

  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-[#04182f] bg-gradient-to-b from-[#04182f] via-[#062744] to-[#04182f] pt-24 md:pt-32 pb-28 md:pb-36">
      {/* Light pooling behind the stage */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[#1565C0]/30 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#04b6ea]/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#04b6ea]">The Bottle</p>
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            Look a little <span className="font-medium text-[#90CAF9]">closer</span>
          </h2>
          <p className="text-lg font-light leading-relaxed text-white/70">
            Every rib, curve and line of print is measured from the real thing. Drag your
            cursor across it and take a look around.
          </p>
        </div>

        {/* Stage */}
        <div className="relative mt-10 h-[520px] md:mt-14 md:h-[640px] lg:h-[720px]">
          <div
            ref={posterRef}
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            aria-hidden="true"
          >
            <Image src="/bottleNB.png" alt="" fill sizes="100vw" className="object-contain" />
          </div>
          <div
            ref={hostRef}
            className="absolute inset-0"
            role="img"
            aria-label={`Rotating 3D render of the Eau Clair bottle, circled by the words: ${PHRASES.join(', ')}`}
          />
        </div>
      </div>

      <WaveDivider fill="#ffffff" height="h-12 md:h-20" />
    </section>
  )
}
