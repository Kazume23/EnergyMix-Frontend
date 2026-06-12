import { ExternalLink, Leaf } from 'lucide-react'

export function MoonIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 15.2A8.4 8.4 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </svg>
  )
}

export function LanguageIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" />
    </svg>
  )
}

export function LeafIcon() {
  return (
    <Leaf
      className="source-leaf-icon"
      size={15}
      strokeWidth={2.1}
      aria-hidden="true"
    />
  )
}

export function GitHubIcon() {
  return (
    <ExternalLink
      className="footer-link-icon"
      size={16}
      strokeWidth={2}
      aria-hidden="true"
    />
  )
}
