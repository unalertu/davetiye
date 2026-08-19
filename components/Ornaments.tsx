type SvgProps = { className?: string };

/** Symmetric scrolled fleuron used above the hero titles. */
export function Flourish({ className }: SvgProps) {
  const half = (
    <>
      <path d="M130 43 C111 43 97 35 83 27 C71 20 57 16 46 22" />
      <path d="M46 22 C37 27 41 37 50 35 C57 33 57 25 48 23" />
      <path
        d="M105 31 C97 22 85 21 78 27 C86 34 99 35 105 31"
        fill="currentColor"
        stroke="none"
        opacity="0.3"
      />
      <path
        d="M119 39 C113 32 103 30 97 34 C104 41 114 43 119 39"
        fill="currentColor"
        stroke="none"
        opacity="0.22"
      />
      <circle cx="70" cy="20" r="1.5" fill="currentColor" stroke="none" opacity="0.55" />
    </>
  );

  return (
    <svg
      viewBox="0 0 260 56"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M130 7 L136.5 20 L130 33 L123.5 20 Z" fill="currentColor" stroke="none" />
      <path d="M130 33 V43" />
      <g>{half}</g>
      <g transform="translate(260,0) scale(-1,1)">{half}</g>
    </svg>
  );
}

/** Thin rule with diamond finials, flanking the hero fleuron. */
export function Rule({ className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 200 16"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <line x1="16" y1="8" x2="184" y2="8" strokeWidth="1.3" />
      <path d="M8 8 L12 3.5 L16 8 L12 12.5 Z" fill="currentColor" stroke="none" />
      <path d="M192 8 L188 3.5 L184 8 L188 12.5 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Double-ruled border with scrolled corners, framing the month calendar. */
export function CalendarFrame({ className }: SvgProps) {
  const corner = (
    <>
      <path d="M5 46 C5 21 21 5 46 5" strokeWidth="1.3" />
      <path d="M46 5 C58 5 62 15 55 21 C49 26 40 21 44 14" strokeWidth="1.1" />
      <circle cx="44.6" cy="13.6" r="1.9" fill="currentColor" stroke="none" />
      <path d="M5 46 C5 58 15 62 21 55 C26 49 21 40 14 44" strokeWidth="1.1" />
      <circle cx="13.6" cy="44.6" r="1.9" fill="currentColor" stroke="none" />
      <path d="M13 13 L21 21" strokeWidth="0.9" opacity="0.5" />
    </>
  );

  return (
    <svg
      viewBox="0 0 388 307"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="378" height="297" strokeWidth="1.4" />
      <rect x="12" y="12" width="364" height="283" strokeWidth="0.9" opacity="0.45" />
      <g>{corner}</g>
      <g transform="translate(388,0) scale(-1,1)">{corner}</g>
      <g transform="translate(0,307) scale(1,-1)">{corner}</g>
      <g transform="translate(388,307) scale(-1,-1)">{corner}</g>
    </svg>
  );
}
