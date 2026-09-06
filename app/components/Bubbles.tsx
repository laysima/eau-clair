/**
 * A decorative field of bubbles drifting up through a section.
 *
 * The layout is generated from a fixed seed at module scope so the server and
 * the client render byte-identical markup — a Math.random() here would trip a
 * hydration mismatch.
 */

function seeded(seed: number) {
  let s = seed >>> 0
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

type Bubble = {
  left: number
  size: number
  rise: number
  drift: number
  dur: number
  delay: number
  opacity: number
}

const BUBBLES: Bubble[] = (() => {
  const rnd = seeded(20260905)
  return Array.from({ length: 26 }, () => {
    const size = 5 + rnd() * 22
    return {
      left: rnd() * 100,
      size,
      rise: 260 + rnd() * 420,
      drift: (rnd() - 0.5) * 90,
      dur: 13 + rnd() * 16,
      delay: -rnd() * 22,
      // Bigger bubbles read as closer, so let them sit a touch stronger.
      opacity: 0.16 + (size / 27) * 0.24,
    }
  })
})()

export default function Bubbles({
  className = '',
  color = '#42A5F5',
}: {
  className?: string
  color?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble absolute bottom-[-60px] rounded-full"
          style={
            {
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
              border: `1px solid ${color}`,
              background: `radial-gradient(circle at 32% 28%, ${color}55, transparent 62%)`,
              '--rise': `${b.rise}px`,
              '--drift': `${b.drift}px`,
              '--dur': `${b.dur}s`,
              '--delay': `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
