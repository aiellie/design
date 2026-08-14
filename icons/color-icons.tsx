import * as React from "react"

type IconProps = React.HTMLAttributes<SVGElement>

export const ColorIcons = {
  // A hexagon nodding to the # notation
  hex: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="colorIconHex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <polygon
        points="16,2.8 27.4,9.4 27.4,22.6 16,29.2 4.6,22.6 4.6,9.4"
        fill="url(#colorIconHex)"
      />
      <g
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.95"
      >
        <line x1="13.4" y1="10.8" x2="12.6" y2="21.2" />
        <line x1="19.4" y1="10.8" x2="18.6" y2="21.2" />
        <line x1="10.6" y1="13.4" x2="21.6" y2="13.4" />
        <line x1="10.4" y1="18.6" x2="21.4" y2="18.6" />
      </g>
    </svg>
  ),
  // Additive red / green / blue circles
  rgb: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="10.5" r="7" fill="#ef4444" fillOpacity="0.9" />
      <circle cx="10.5" cy="20.5" r="7" fill="#22c55e" fillOpacity="0.9" />
      <circle cx="21.5" cy="20.5" r="7" fill="#3b82f6" fillOpacity="0.9" />
    </svg>
  ),
  // Hue wheel wedges
  hsl: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path d="M16 16 L16 3 A13 13 0 0 1 27.26 9.5 Z" fill="#ef4444" />
      <path d="M16 16 L27.26 9.5 A13 13 0 0 1 27.26 22.5 Z" fill="#eab308" />
      <path d="M16 16 L27.26 22.5 A13 13 0 0 1 16 29 Z" fill="#22c55e" />
      <path d="M16 16 L16 29 A13 13 0 0 1 4.74 22.5 Z" fill="#06b6d4" />
      <path d="M16 16 L4.74 22.5 A13 13 0 0 1 4.74 9.5 Z" fill="#3b82f6" />
      <path d="M16 16 L4.74 9.5 A13 13 0 0 1 16 3 Z" fill="#d946ef" />
    </svg>
  ),
  // Perceptual lightness / chroma / hue ring
  oklch: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="colorIconOklch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <circle
        cx="16"
        cy="16"
        r="10.5"
        fill="none"
        stroke="url(#colorIconOklch)"
        strokeWidth="5.5"
      />
      <circle cx="16" cy="16" r="3" fill="#c084fc" />
    </svg>
  ),
  // The a/b axes as a diamond gradient
  oklab: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="colorIconOklab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="3.5"
        fill="url(#colorIconOklab)"
        transform="rotate(45 16 16)"
      />
    </svg>
  ),
  // Print process tiles
  cmyk: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect x="4.5" y="4.5" width="10.5" height="10.5" rx="3" fill="#06b6d4" />
      <rect x="17" y="4.5" width="10.5" height="10.5" rx="3" fill="#d946ef" />
      <rect x="4.5" y="17" width="10.5" height="10.5" rx="3" fill="#facc15" />
      <rect x="17" y="17" width="10.5" height="10.5" rx="3" fill="#1e293b" />
    </svg>
  ),
  // Wide-gamut chromaticity triangle
  p3: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="colorIconP3" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="55%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <path
        d="M16 4.5 L28 25.5 L4 25.5 Z"
        fill="url(#colorIconP3)"
        stroke="url(#colorIconP3)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  // Neutral fallback swatch
  swatch: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="12.5" fill="#94a3b8" />
      <path d="M16 3.5 A12.5 12.5 0 0 1 16 28.5 Z" fill="#cbd5e1" />
    </svg>
  ),
}

export function getIconForColorFormat(format: string) {
  switch (format.toLowerCase()) {
    case "hex":
      return <ColorIcons.hex />
    case "rgb":
    case "rgba":
      return <ColorIcons.rgb />
    case "hsl":
    case "hsla":
      return <ColorIcons.hsl />
    case "oklch":
    case "lch":
      return <ColorIcons.oklch />
    case "oklab":
    case "lab":
      return <ColorIcons.oklab />
    case "cmyk":
    case "device-cmyk":
      return <ColorIcons.cmyk />
    case "p3":
    case "display-p3":
      return <ColorIcons.p3 />
    default:
      return <ColorIcons.swatch />
  }
}
