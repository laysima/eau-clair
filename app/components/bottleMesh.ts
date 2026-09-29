import * as THREE from 'three'
import { ASPECT, T_CAP, T_FILL, BODY, CAP } from './bottleProfile'

/**
 * The Eau Clair bottle as real geometry, measured from public/bottleNB.png.
 *
 * The silhouette in BODY/CAP was taken off the photograph, so the lathe matches
 * the actual bottle rather than approximating it. The label is the artwork
 * lifted from the same photo and unwrapped onto a cylinder
 * (public/eauclair-label.png), so the print lands where it does in real life.
 *
 * Kept separate from any one component so the scene that shows it can change
 * without the tuned geometry and materials being duplicated or drifting.
 */

/** Radius is normalised to 1, so the bottle is 2 units wide. */
export const HEIGHT = ASPECT * 2

/** Label band, matching the t range the label texture was generated for. */
const LABEL_T0 = 0.075
const LABEL_T1 = 0.775

/** Wall offsets, as a fraction of the outer radius. */
const LABEL_R = 1.012
const WATER_R = 0.965

const yOf = (t: number) => (t - 0.5) * HEIGHT

/** Linear interpolation of the measured profile. */
function radiusAt(t: number): number {
  if (t <= BODY[0][0]) return BODY[0][1]
  const last = BODY[BODY.length - 1]
  if (t >= last[0]) return last[1]
  let lo = 0
  let hi = BODY.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (BODY[mid][0] <= t) lo = mid
    else hi = mid
  }
  const [t0, r0] = BODY[lo]
  const [t1, r1] = BODY[hi]
  return r0 + ((r1 - r0) * (t - t0)) / (t1 - t0)
}

function lathe(points: [number, number][], segments: number) {
  return new THREE.LatheGeometry(
    points.map(([t, r]) => new THREE.Vector2(Math.max(r, 0), yOf(t))),
    segments
  )
}

/**
 * Height field -> tangent-space normal map, tiling seamlessly in both axes.
 * `flutes` cosine ridges run vertically; `drops` spherical caps stand in for
 * condensation.
 */
function normalMap(size: number, flutes: number, fluteDepth: number, drops: number, strength: number) {
  const h = new Float32Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h[y * size + x] = fluteDepth * Math.cos((x / size) * flutes * Math.PI * 2)
    }
  }

  let seed = 20260205
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
  for (let i = 0; i < drops; i++) {
    const cx = rnd() * size
    const cy = rnd() * size
    const r = 2 + rnd() * rnd() * 14
    const span = Math.ceil(r)
    for (let dy = -span; dy <= span; dy++) {
      for (let dx = -span; dx <= span; dx++) {
        const d = Math.hypot(dx, dy)
        if (d > r) continue
        const x = (((cx + dx) | 0) % size + size) % size
        const y = (((cy + dy) | 0) % size + size) % size
        h[y * size + x] += 1.4 * Math.sqrt(1 - (d / r) * (d / r))
      }
    }
  }

  const at = (x: number, y: number) => h[((y % size) + size) % size * size + (((x % size) + size) % size)]
  const data = new Uint8Array(size * size * 4)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength
      const len = Math.hypot(dx, dy, 1)
      const k = (y * size + x) * 4
      data[k] = Math.round(((-dx / len) * 0.5 + 0.5) * 255)
      data[k + 1] = Math.round(((-dy / len) * 0.5 + 0.5) * 255)
      data[k + 2] = Math.round((1 / len * 0.5 + 0.5) * 255)
      data[k + 3] = 255
    }
  }

  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.needsUpdate = true
  return tex
}

export type Bottle = {
  /** Spin this, not its children — the parts rely on their own render order. */
  group: THREE.Group
  dispose: () => void
}

/**
 * Builds the bottle. The renderer is only needed to read the maximum
 * anisotropy supported for the label texture. Pass a LoadingManager if the
 * caller wants to know when the label artwork has actually arrived — an
 * unloaded texture samples as zeros, which the label's alpha cut discards.
 */
export function buildBottle(renderer: THREE.WebGLRenderer, manager?: THREE.LoadingManager): Bottle {
  const group = new THREE.Group()
  const disposables: { dispose(): void }[] = []

  // ---- PET shell ---------------------------------------------------------
  // A dished base (push-up) closes the bottom the way a real blow-moulded base
  // does, then the measured silhouette carries it to the support ring.
  const baseDome: [number, number][] = [
    [0.03, 0.0],
    [0.027, 0.105],
    [0.022, 0.19],
    [0.016, 0.252],
    [0.009, 0.29],
    [0.004, 0.307],
  ]
  const shellGeo = lathe([...baseDome, ...BODY], 256)
  const surface = normalMap(1024, 26, 0.55, 60, 1.6)
  disposables.push(surface, shellGeo)

  const shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 1,
    thickness: 0.32,
    ior: 1.46,
    roughness: 0.035,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.5,
    attenuationColor: new THREE.Color(0xd8f1ff),
    attenuationDistance: 9,
    normalMap: surface,
    normalScale: new THREE.Vector2(0.08, 0.08),
    side: THREE.DoubleSide,
    transparent: true,
    // Keep the clear shell from occluding the label's reverse face when the
    // print is drawn after refraction.
    depthWrite: false,
  })
  disposables.push(shellMat)
  const shell = new THREE.Mesh(shellGeo, shellMat)
  shell.renderOrder = 2
  group.add(shell)

  // ---- water -------------------------------------------------------------
  const waterPts: [number, number][] = [[0.006, 0]]
  for (const [t, r] of BODY) {
    if (t > 0.006 && t < T_FILL) waterPts.push([t, r * WATER_R])
  }
  waterPts.push([T_FILL, radiusAt(T_FILL) * WATER_R], [T_FILL, 0])
  const waterGeo = lathe(waterPts, 192)
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0xa9dcf2,
    roughness: 0.04,
    metalness: 0,
    ior: 1.333,
    envMapIntensity: 0.6,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  disposables.push(waterGeo, waterMat)
  const water = new THREE.Mesh(waterGeo, waterMat)
  water.renderOrder = 1
  group.add(water)

  // ---- label -------------------------------------------------------------
  // Uniform steps in t so the lathe's v maps linearly onto the texture.
  const labelPts: [number, number][] = []
  const LABEL_STEPS = 72
  for (let i = 0; i <= LABEL_STEPS; i++) {
    const t = LABEL_T0 + ((LABEL_T1 - LABEL_T0) * i) / LABEL_STEPS
    labelPts.push([t, radiusAt(t) * LABEL_R])
  }
  const labelGeo = lathe(labelPts, 256)
  const labelTex = new THREE.TextureLoader(manager).load('/eauclair-label.png')
  labelTex.colorSpace = THREE.SRGBColorSpace
  labelTex.anisotropy = renderer.capabilities.getMaxAnisotropy()
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.5,
    metalness: 0,
    envMapIntensity: 0.45,
    // Draw the ink after the shell. Opaque artwork is included in Three's
    // transmission buffer and refracted back onto the bottle as a shifted,
    // blurred duplicate, especially around the small navy text.
    transparent: true,
    // At a grazing angle the texture is compressed hard across u, and
    // anisotropic samples average in neighbouring artwork. Too low a cut lets
    // those smeared texels through as ghost marks beside the print.
    alphaTest: 0.5,
    // DoubleSide so the reverse of the wrap still reads through the clear
    // bottle when the printed face turns away.
    side: THREE.DoubleSide,
  })
  disposables.push(labelGeo, labelTex, labelMat)
  const label = new THREE.Mesh(labelGeo, labelMat)
  label.renderOrder = 3
  group.add(label)

  // ---- closure -----------------------------------------------------------
  const capPts: [number, number][] = [
    [T_CAP, 0],
    ...CAP,
    [1.0002, 0.185],
    [1.0006, 0.095],
    [1.0008, 0],
  ]
  const capGeo = lathe(capPts, 256)
  const knurl = normalMap(512, 96, 0.5, 0, 2.2)
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xdadde0,
    roughness: 0.52,
    metalness: 0.06,
    envMapIntensity: 1.1,
    normalMap: knurl,
    normalScale: new THREE.Vector2(0.5, 0.5),
  })
  disposables.push(capGeo, knurl, capMat)
  group.add(new THREE.Mesh(capGeo, capMat))

  return {
    group,
    dispose: () => {
      for (const d of disposables) d.dispose()
    },
  }
}
