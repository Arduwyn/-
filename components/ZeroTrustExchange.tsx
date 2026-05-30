/**
 * The Zero Trust Exchange hero diagram — ported verbatim from the Figma export.
 * Static by design (not CMS-editable); uses the extracted shield wireframe at
 * /assets/image1_0_1.png.
 */
export function ZeroTrustExchange() {
  return (
    <div className="zte" aria-label="Zero Trust Exchange diagram">
      <svg viewBox="0 0 1080 470" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img">
        <defs>
          <radialGradient id="xglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F39889" stopOpacity=".95" />
            <stop offset="45%" stopColor="#F39889" stopOpacity=".35" />
            <stop offset="100%" stopColor="#F39889" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* horizontal lines from sides to center */}
        <g stroke="rgba(151,199,253,.55)" strokeWidth="1">
          <line x1="240" y1="190" x2="540" y2="190" />
          <line x1="240" y1="248" x2="540" y2="248" />
          <line x1="240" y1="306" x2="540" y2="306" />
          <line x1="540" y1="190" x2="840" y2="190" />
          <line x1="540" y1="248" x2="840" y2="248" />
          <line x1="540" y1="306" x2="840" y2="306" />
        </g>

        {/* LEFT SIDE LABELS + ICONS */}
        <g fontFamily="Sora, sans-serif" fontSize="17" fill="#97C7FD" fontWeight="400">
          <g transform="translate(50,178)">
            <path
              d="M9 19c-3 0-5-2-5-5 0-2.5 2-4.5 4.5-4.7C9 6.5 11.5 4.5 14.5 4.5c3.5 0 6.3 2.5 6.8 5.8.2 0 .4-.1.7-.1 2.2 0 4 1.8 4 4s-1.8 4-4 4H9z"
              stroke="#97C7FD" strokeWidth="1.2" fill="none" strokeLinejoin="round"
            />
            <text x="40" y="18">Public Cloud</text>
          </g>
          <g transform="translate(50,236)">
            <path
              d="M9 19c-3 0-5-2-5-5 0-2.5 2-4.5 4.5-4.7C9 6.5 11.5 4.5 14.5 4.5c3.5 0 6.3 2.5 6.8 5.8.2 0 .4-.1.7-.1 2.2 0 4 1.8 4 4s-1.8 4-4 4H9z"
              stroke="#97C7FD" strokeWidth="1.2" fill="none" strokeLinejoin="round"
            />
            <text x="40" y="18">SaaS</text>
          </g>
          <g transform="translate(50,294)">
            <path
              d="M9 19c-3 0-5-2-5-5 0-2.5 2-4.5 4.5-4.7C9 6.5 11.5 4.5 14.5 4.5c3.5 0 6.3 2.5 6.8 5.8.2 0 .4-.1.7-.1 2.2 0 4 1.8 4 4s-1.8 4-4 4H9z"
              stroke="#97C7FD" strokeWidth="1.2" fill="none" strokeLinejoin="round"
            />
            <text x="40" y="18">Internet</text>
          </g>
        </g>

        {/* RIGHT SIDE LABELS + ICONS */}
        <g fontFamily="Sora, sans-serif" fontSize="17" fill="#97C7FD" fontWeight="400">
          <g transform="translate(880,178)">
            <text x="0" y="18" textAnchor="end">IoT / OT</text>
            <g transform="translate(20,2)" stroke="#97C7FD" strokeWidth="1.2" fill="none">
              <circle cx="6" cy="6" r="2.5" />
              <circle cx="22" cy="6" r="2.5" />
              <circle cx="6" cy="22" r="2.5" />
              <circle cx="22" cy="22" r="2.5" />
              <circle cx="14" cy="14" r="2.5" />
              <path d="M8 6h12M8 22h12M6 8v12M22 8v12M8 8l4 4M20 8l-4 4M8 20l4-4M20 20l-4-4" />
            </g>
          </g>
          <g transform="translate(880,236)">
            <text x="0" y="18" textAnchor="end">Users</text>
            <g transform="translate(20,0)" stroke="#97C7FD" strokeWidth="1.2" fill="none">
              <circle cx="14" cy="14" r="11" />
              <circle cx="14" cy="11" r="3.5" />
              <path d="M7 22c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" />
            </g>
          </g>
          <g transform="translate(880,294)">
            <text x="0" y="18" textAnchor="end">Workloads</text>
            <g transform="translate(20,3)" stroke="#97C7FD" strokeWidth="1.2" fill="none">
              <rect x="3" y="3" width="22" height="6" rx="1" />
              <rect x="3" y="11" width="22" height="6" rx="1" />
              <rect x="3" y="19" width="22" height="6" rx="1" />
              <circle cx="7" cy="6" r=".8" fill="#97C7FD" />
              <circle cx="7" cy="14" r=".8" fill="#97C7FD" />
              <circle cx="7" cy="22" r=".8" fill="#97C7FD" />
            </g>
          </g>
        </g>

        {/* CORAL X markers on the blocked left-side lines */}
        <g fontFamily="Sora, sans-serif">
          <circle cx="380" cy="190" r="22" fill="url(#xglow)" />
          <text x="380" y="197" textAnchor="middle" fontSize="20" fill="#F39889" fontWeight="700">✕</text>
          <circle cx="380" cy="248" r="22" fill="url(#xglow)" />
          <text x="380" y="255" textAnchor="middle" fontSize="20" fill="#F39889" fontWeight="700">✕</text>
          <circle cx="380" cy="306" r="22" fill="url(#xglow)" />
          <text x="380" y="313" textAnchor="middle" fontSize="20" fill="#F39889" fontWeight="700">✕</text>
        </g>

        {/* Extracted Figma shield wireframe */}
        <image href="/assets/image1_0_1.png" x="420" y="105" width="240" height="285" preserveAspectRatio="xMidYMid meet" />

        {/* Zero Trust Exchange label plate over the shield center */}
        <rect x="476" y="232" width="128" height="44" rx="7" fill="#06070E" stroke="rgba(151,199,253,.5)" strokeWidth="1" />
        <text x="540" y="251" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="13" fill="#97C7FD" fontWeight="400">Zero Trust</text>
        <text x="540" y="268" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="13" fill="#97C7FD" fontWeight="400">Exchange</text>
      </svg>
    </div>
  )
}
