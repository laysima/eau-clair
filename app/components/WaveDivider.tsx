/**
 * Layered SVG waves used to pour one section into the next.
 *
 * Drop it inside a `relative` section. `fill` should be the colour of the
 * section it is flowing *into*, so the wave reads as that section's edge.
 */
export default function WaveDivider({
  position = 'bottom',
  fill = '#ffffff',
  height = 'h-16 md:h-28',
  className = '',
}: {
  position?: 'top' | 'bottom'
  fill?: string
  height?: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 leading-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`block w-full ${height} ${position === 'top' ? 'rotate-180' : ''}`}
      >
        <path
          d="M0,52 C220,104 420,14 720,46 C1020,78 1240,110 1440,64 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.35"
        />
        <path
          d="M0,72 C260,116 460,36 760,62 C1040,86 1250,116 1440,84 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.6"
        />
        <path
          d="M0,94 C240,124 480,66 780,86 C1060,104 1260,124 1440,102 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
