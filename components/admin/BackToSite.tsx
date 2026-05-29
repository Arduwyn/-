/**
 * Renders a "Back to site" link at the top of the Payload admin sidebar so
 * editors can return to the public site (/) from anywhere in the admin.
 *
 * Wired in payload.config.ts via `admin.components.beforeNavLinks`.
 */
export default function BackToSite() {
  return (
    <a
      href="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 20px',
        margin: '0 0 8px',
        color: '#97C7FD',
        textDecoration: 'none',
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.02em',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 12l9-9 9 9" />
        <path d="M5 10v10h14V10" />
      </svg>
      Back to site
    </a>
  )
}
