/**
 * Brand logo, rendered inline so it inherits the page's Fraunces font.
 * - variant="mark"    : square mark only (favicon-style on forest tile)
 * - variant="markFlat": F+sprout on transparent bg (for use on light surfaces)
 * - variant="lockup"  : mark + "Feed Your Head" wordmark + leaf accent
 *
 * `className` is forwarded so consumers can size with Tailwind (e.g. `h-8 w-auto`).
 */
export default function Logo({ variant = 'lockup', className = '' }) {
  if (variant === 'mark') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#1a3a2e" />
        <text
          x="46%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="38"
          fill="#f5f1ea"
        >
          F
        </text>
        <g transform="translate(44,10)" fill="#c47a28" stroke="#c47a28" strokeLinecap="round">
          <line x1="0" y1="12" x2="0" y2="3" strokeWidth="1.4" fill="none" />
          <path d="M 0 7 C -4 5 -5 1 -3 0 C -1 1 0 4 0 7 Z" />
          <path d="M 0 4 C 4 2 5 -2 3 -3 C 1 -1 0 1 0 4 Z" />
        </g>
      </svg>
    );
  }

  if (variant === 'markFlat') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <text
          x="46%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
          fontWeight="600"
          fontSize="44"
          fill="currentColor"
        >
          F
        </text>
        <g transform="translate(45,8)" fill="#c47a28" stroke="#c47a28" strokeLinecap="round">
          <line x1="0" y1="14" x2="0" y2="4" strokeWidth="1.6" fill="none" />
          <path d="M 0 8 C -4 6 -5 2 -3 1 C -1 2 0 5 0 8 Z" />
          <path d="M 0 5 C 4 3 5 -1 3 -2 C 1 0 0 2 0 5 Z" />
        </g>
      </svg>
    );
  }

  // lockup
  return (
    <svg viewBox="0 0 380 80" className={className} aria-hidden="true">
      {/* tile + mark */}
      <rect x="0" y="8" width="64" height="64" rx="12" fill="#1a3a2e" />
      <text
        x="29"
        y="56"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="38"
        fill="#f5f1ea"
      >
        F
      </text>
      <g transform="translate(44,18)" fill="#c47a28" stroke="#c47a28" strokeLinecap="round">
        <line x1="0" y1="12" x2="0" y2="3" strokeWidth="1.4" fill="none" />
        <path d="M 0 7 C -4 5 -5 1 -3 0 C -1 1 0 4 0 7 Z" />
        <path d="M 0 4 C 4 2 5 -2 3 -3 C 1 -1 0 1 0 4 Z" />
      </g>

      {/* wordmark */}
      <text
        x="84"
        y="56"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="500"
        fontSize="32"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Feed Your Head
      </text>

      {/* leaf accent replacing the trailing point */}
      <g transform="translate(348,52)" fill="#c47a28">
        <path d="M 0 0 C 4 -3 9 -3 12 -8 C 9 -2 4 0 0 0 Z" />
      </g>
    </svg>
  );
}
