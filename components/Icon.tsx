import type { ReactNode } from 'react'

// Inline SVG icons ported from the designs, keyed by name. Add new icons here and
// reference the key from a block's `icon` field.
const icons: Record<string, (className?: string) => ReactNode> = {
  finance: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v9M10 10v9M14 10v9M19 10v9" />
      <path d="M3 21h18" />
    </svg>
  ),
  healthcare: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="9.5" y="3" width="5" height="18" rx="1" />
      <rect x="3" y="9.5" width="18" height="5" rx="1" />
    </svg>
  ),
  policy: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <line x1="3.5" y1="8" x2="13" y2="8" />
      <line x1="18.5" y1="8" x2="20.5" y2="8" />
      <circle cx="15.5" cy="8" r="2.6" />
      <line x1="3.5" y1="16" x2="8.5" y2="16" />
      <line x1="14" y1="16" x2="20.5" y2="16" />
      <circle cx="11" cy="16" r="2.6" />
    </svg>
  ),
  config: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  health: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M3 12h4l3-7 4 14 3-7h4" />
    </svg>
  ),
  identity: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20c0-3.6 2.9-5.9 6.5-5.9s6.5 2.3 6.5 5.9" />
    </svg>
  ),
  incident: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
      <line x1="12" y1="3" x2="12" y2="8.6" />
      <line x1="12" y1="15.4" x2="12" y2="21" />
      <line x1="3" y1="12" x2="8.6" y2="12" />
      <line x1="15.4" y1="12" x2="21" y2="12" />
    </svg>
  ),
  roadmap: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13-6m3-1v5h-5" />
      <path d="M20 12a8 8 0 0 1-13 6m-3 1v-5h5" />
    </svg>
  ),
  user: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" />
    </svg>
  ),
  layers: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  ),
  window: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9.5h18M9.5 9.5V21" />
    </svg>
  ),
  target: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  clipboard: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3.5h6v1" />
      <path d="M8.5 11l2 2 3.5-3.5" />
    </svg>
  ),
  monitor: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M12 16v4M8 20h8" />
      <path d="M7 12l3-3 2 2 4-4" />
    </svg>
  ),
}

export function Icon({ name, className }: { name?: string | null; className?: string }) {
  const render = name ? icons[name] : undefined
  return render ? render(className) : null
}
