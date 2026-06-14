// A polished, friendly octopus drawn in SVG. The eight arms are drawn in their
// fully extended (reaching) pose; how far they reach is controlled purely in
// CSS via the `--arm` custom property (0 = curled, 1 = reaching), so the scroll
// engine can animate them by writing one CSS var — no React re-renders. Pass
// `useVar` to opt into that scroll-driven curl; otherwise the arms simply rest
// fully extended (used in the hero).
export default function Octopus({ useVar = false, className = '' }) {
  // Shared path data for the eight arms so the suckers trace the same curves.
  const arms = [
    'M120 198 q-58 58 -82 78',
    'M134 214 q-44 70 -58 110',
    'M150 224 q-15 80 -26 122',
    'M164 228 q-5 82 -8 126',
    'M171 228 q5 82 8 126',
    'M181 224 q15 80 26 122',
    'M196 214 q44 70 58 110',
    'M210 198 q58 58 82 78',
  ]

  return (
    <svg
      className={`octo ${useVar ? 'octo--var' : ''} ${className}`}
      viewBox="0 0 330 360"
      role="img"
      aria-label="Octopus mascot with eight arms"
    >
      <defs>
        <radialGradient id="oc-head" cx="44%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
        <linearGradient id="oc-arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <radialGradient id="oc-belly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="oc-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Arms — the whole group scales vertically via CSS to "reach". */}
      <g className="octo__arms">
        {/* thick base of each arm */}
        <g stroke="url(#oc-arm)" strokeWidth="16" strokeLinecap="round" fill="none">
          {arms.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* suckers: a dotted line traced along each arm */}
        <g
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="0.5 15"
          fill="none"
        >
          {arms.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>

      {/* Head / mantle */}
      <ellipse cx="165" cy="142" rx="95" ry="104" fill="url(#oc-head)" filter="url(#oc-glow)" />
      {/* soft belly highlight + glossy top sheen */}
      <ellipse cx="165" cy="170" rx="70" ry="64" fill="url(#oc-belly)" />
      <ellipse cx="138" cy="86" rx="34" ry="20" fill="rgba(255,255,255,0.35)" />

      {/* bioluminescent spots */}
      <circle cx="110" cy="170" r="5" fill="#67e8f9" opacity="0.8" />
      <circle cx="225" cy="158" r="6" fill="#67e8f9" opacity="0.7" />
      <circle cx="205" cy="196" r="4" fill="#f0abfc" opacity="0.8" />
      <circle cx="125" cy="120" r="3.5" fill="#f0abfc" opacity="0.7" />

      {/* Eyes */}
      <ellipse cx="136" cy="124" rx="22" ry="26" fill="#fff" />
      <ellipse cx="196" cy="124" rx="22" ry="26" fill="#fff" />
      <circle cx="141" cy="131" r="10" fill="#312e81" />
      <circle cx="191" cy="131" r="10" fill="#312e81" />
      <circle cx="145" cy="126" r="3.5" fill="#fff" />
      <circle cx="195" cy="126" r="3.5" fill="#fff" />

      {/* rosy cheeks + smile */}
      <ellipse cx="112" cy="156" rx="12" ry="8" fill="rgba(244,114,182,0.45)" />
      <ellipse cx="220" cy="156" rx="12" ry="8" fill="rgba(244,114,182,0.45)" />
      <path
        d="M150 168 q16 18 32 0"
        stroke="#4c1d95"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
