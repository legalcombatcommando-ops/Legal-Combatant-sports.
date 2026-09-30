export function FounderEmblem() {
  return (
    <svg className="founder-emblem" viewBox="0 0 600 440" role="img" aria-labelledby="emblem-title emblem-desc">
      <title id="emblem-title">The sword and the scale</title>
      <desc id="emblem-desc">A sword standing upright as the centre of a scale of justice. Security hangs on the left pan and combat sports on the right pan.</desc>

      {/* Beam and pivot */}
      <line x1="110" y1="104" x2="490" y2="104" stroke="#f4f4ee" strokeWidth="6" strokeLinecap="round" />
      <circle cx="110" cy="104" r="7" fill="#ff5a52" />
      <circle cx="490" cy="104" r="7" fill="#ff5a52" />

      {/* Left pan: security */}
      <g stroke="#f4f4ee" strokeWidth="2" opacity=".8">
        <line x1="110" y1="104" x2="44" y2="232" />
        <line x1="110" y1="104" x2="176" y2="232" />
      </g>
      <path d="M34 232H186C180 282 148 306 110 306C72 306 40 282 34 232Z" fill="#ff5a52" />
      <path d="M110 250L84 260V278C84 290 96 298 110 304C124 298 136 290 136 278V260L110 250Z" fill="none" stroke="#121212" strokeWidth="4" strokeLinejoin="round" />
      <path d="M99 278L107 286L123 268" fill="none" stroke="#121212" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right pan: combat sports */}
      <g stroke="#f4f4ee" strokeWidth="2" opacity=".8">
        <line x1="490" y1="104" x2="424" y2="232" />
        <line x1="490" y1="104" x2="556" y2="232" />
      </g>
      <path d="M414 232H566C560 282 528 306 490 306C452 306 420 282 414 232Z" fill="#ff5a52" />
      <path d="M466 282V262C466 254 472 248 480 248H500C510 248 516 256 516 266V276C516 286 508 294 498 294H478C471 294 466 289 466 282Z" fill="none" stroke="#121212" strokeWidth="4" strokeLinejoin="round" />
      <path d="M480 294V302H504V292" fill="none" stroke="#121212" strokeWidth="4" strokeLinejoin="round" />

      {/* Sword */}
      <path d="M300 18L314 68V318H286V68L300 18Z" fill="#f4f4ee" />
      <line x1="300" y1="56" x2="300" y2="310" stroke="#121212" strokeWidth="3" opacity=".35" />
      <circle cx="300" cy="104" r="13" fill="#ff5a52" stroke="#121212" strokeWidth="4" />
      <rect x="224" y="318" width="152" height="14" rx="7" fill="#ff5a52" />
      <rect x="292" y="332" width="16" height="54" rx="3" fill="#f4f4ee" />
      <line x1="292" y1="346" x2="308" y2="342" stroke="#121212" strokeWidth="2" />
      <line x1="292" y1="358" x2="308" y2="354" stroke="#121212" strokeWidth="2" />
      <line x1="292" y1="370" x2="308" y2="366" stroke="#121212" strokeWidth="2" />
      <circle cx="300" cy="396" r="12" fill="#ff5a52" />

      <text x="110" y="340" textAnchor="middle" className="emblem-label">SECURITY</text>
      <text x="490" y="340" textAnchor="middle" className="emblem-label">COMBAT SPORTS</text>
      <text x="300" y="430" textAnchor="middle" className="emblem-label emblem-label-law">LAW / THE BASELINE</text>
    </svg>
  );
}
