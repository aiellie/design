import type * as React from "react"

/**
 * Brand marks for the packages listed in `app/design/data.json`.
 *
 * Marks that ship as a small, self-contained SVG are inlined below. The rest
 * live in `public/packages` and are referenced through `packageIconImages`.
 * Monochrome marks are drawn with `currentColor` so they follow the theme;
 * marks that are a colored tile keep their own palette.
 */
type PackageIconProps = React.ComponentProps<"svg">

// base-ui.com/static/favicon.svg
export function BaseUiIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.6251 7.00119C18.2806 6.97886 18 7.27506 18 7.63782V28C23.5228 28 28 23.2948 28 17.4905C28 11.9069 23.8568 7.3403 18.6251 7.00119Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 11.2V14V28C10.4771 28 6 22.9856 6 16.8V14V0C11.5228 0 16 5.0144 16 11.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

// github.com/joe-bell/cva — docs/src/assets/logo.svg (gradient flattened to currentColor)
export function CvaIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 1160 780"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M389.95 485.246C467.692 440.298 520 356.258 520 260L710 260L560 520H710L560 780L389.95 485.246ZM389.95 485.246C351.718 507.35 307.336 520 260 520C116.406 520 0 403.594 0 260C0 116.406 116.406 0 260 0C403.594 0 520 116.406 520 260L260 260L389.95 485.246ZM710 520H1160L860 0L710 260L860 260L710 520Z"
        fill="currentColor"
      />
    </svg>
  )
}

// github.com/pacocoursey/cmdk — website/public/favicon.svg
export function CmdkIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="100" height="100" rx="16" fill="black" />
      <path
        d="M35.7346 74.8571C33.9551 74.8571 32.3252 74.4158 30.8449 73.533C29.3645 72.635 28.1832 71.4326 27.3009 69.9258C26.4336 68.419 26 66.7599 26 64.9487C26 63.1223 26.4336 61.4557 27.3009 59.9489C28.1832 58.4421 29.3645 57.2397 30.8449 56.3417C32.3252 55.4437 33.9551 54.9947 35.7346 54.9947H40.9383V45.8168H35.7346C33.9551 45.8168 32.3252 45.3754 30.8449 44.4927C29.3645 43.5947 28.1832 42.3999 27.3009 40.9083C26.4336 39.4015 26 37.7348 26 35.9084C26 34.082 26.4336 32.423 27.3009 30.9314C28.1832 29.4246 29.3645 28.2298 30.8449 27.347C32.3252 26.449 33.9551 26 35.7346 26C37.529 26 39.1664 26.449 40.6467 27.347C42.1271 28.2298 43.3084 29.4246 44.1907 30.9314C45.0729 32.423 45.514 34.082 45.514 35.9084V41.1594H54.5308V35.9084C54.5308 34.082 54.9645 32.423 55.8318 30.9314C56.714 29.4246 57.8879 28.2298 59.3533 27.347C60.8336 26.449 62.471 26 64.2654 26C66.0598 26 67.6897 26.449 69.1551 27.347C70.6355 28.2298 71.8093 29.4246 72.6766 30.9314C73.5589 32.423 74 34.082 74 35.9084C74 37.7348 73.5589 39.4015 72.6766 40.9083C71.8093 42.3999 70.6355 43.5947 69.1551 44.4927C67.6897 45.3754 66.0598 45.8168 64.2654 45.8168H59.1065V54.9947H64.2654C66.0598 54.9947 67.6897 55.4437 69.1551 56.3417C70.6355 57.2397 71.8093 58.4421 72.6766 59.9489C73.5589 61.4557 74 63.1223 74 64.9487C74 66.7599 73.5589 68.419 72.6766 69.9258C71.8093 71.4326 70.6355 72.635 69.1551 73.533C67.6897 74.4158 66.0598 74.8571 64.2654 74.8571C62.471 74.8571 60.8336 74.4158 59.3533 73.533C57.8879 72.635 56.714 71.4326 55.8318 69.9258C54.9645 68.419 54.5308 66.7599 54.5308 64.9487V59.6521H45.514V64.9487C45.514 66.7599 45.0729 68.419 44.1907 69.9258C43.3084 71.4326 42.1271 72.635 40.6467 73.533C39.1664 74.4158 37.529 74.8571 35.7346 74.8571ZM35.7346 70.1997C36.6916 70.1997 37.5589 69.9638 38.3364 69.492C39.129 69.0202 39.757 68.3885 40.2206 67.5971C40.6991 66.7904 40.9383 65.9076 40.9383 64.9487V59.6521H35.7346C34.7925 59.6521 33.9252 59.8956 33.1327 60.3826C32.3551 60.8545 31.7346 61.4937 31.271 62.3004C30.8075 63.0919 30.5757 63.9746 30.5757 64.9487C30.5757 65.9076 30.8075 66.7904 31.271 67.5971C31.7346 68.3885 32.3551 69.0202 33.1327 69.492C33.9252 69.9638 34.7925 70.1997 35.7346 70.1997ZM35.7346 41.1594H40.9383V35.9084C40.9383 34.9343 40.6991 34.0515 40.2206 33.2601C39.757 32.4686 39.129 31.837 38.3364 31.3652C37.5589 30.8933 36.6916 30.6574 35.7346 30.6574C34.7925 30.6574 33.9252 30.8933 33.1327 31.3652C32.3551 31.837 31.7346 32.4686 31.271 33.2601C30.8075 34.0515 30.5757 34.9343 30.5757 35.9084C30.5757 36.8825 30.8075 37.7729 31.271 38.5796C31.7346 39.371 32.3551 40.0027 33.1327 40.4745C33.9252 40.9311 34.7925 41.1594 35.7346 41.1594ZM59.1065 41.1594H64.2654C65.2224 41.1594 66.0897 40.9311 66.8673 40.4745C67.6449 40.0027 68.2654 39.371 68.729 38.5796C69.1925 37.7729 69.4243 36.8825 69.4243 35.9084C69.4243 34.9343 69.1925 34.0515 68.729 33.2601C68.2654 32.4686 67.6449 31.837 66.8673 31.3652C66.0897 30.8933 65.2224 30.6574 64.2654 30.6574C63.3084 30.6574 62.4336 30.8933 61.6411 31.3652C60.8636 31.837 60.243 32.4686 59.7794 33.2601C59.3308 34.0515 59.1065 34.9343 59.1065 35.9084V41.1594ZM64.2654 70.1997C65.2224 70.1997 66.0897 69.9638 66.8673 69.492C67.6449 69.0202 68.2654 68.3885 68.729 67.5971C69.1925 66.7904 69.4243 65.9076 69.4243 64.9487C69.4243 63.9746 69.1925 63.0919 68.729 62.3004C68.2654 61.4937 67.6449 60.8545 66.8673 60.3826C66.0897 59.8956 65.2224 59.6521 64.2654 59.6521H59.1065V64.9487C59.1065 65.9076 59.3308 66.7904 59.7794 67.5971C60.243 68.3885 60.8636 69.0202 61.6411 69.492C62.4336 69.9638 63.3084 70.1997 64.2654 70.1997ZM45.514 54.9947H54.5308V45.8168H45.514V54.9947Z"
        fill="white"
      />
    </svg>
  )
}

// input-otp.rodz.dev/icon.svg
export function InputOtpIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="#0D0D0E" />
      <g stroke="#E4E4E7" strokeWidth="2.2" fill="none">
        <rect x="2.6" y="8.6" width="26.8" height="14.8" rx="3" />
        <path d="M11.53 8.6v14.8M20.47 8.6v14.8" />
      </g>
    </svg>
  )
}

// github.com/bvaughn/react-resizable-panels — public/favicon.svg (white recolored to currentColor)
export function ResizablePanelsIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <ellipse
          cx="10"
          cy="10"
          rx="11"
          ry="5"
          transform="rotate(45, 10, 10)"
        />
        <ellipse
          cx="10"
          cy="10"
          rx="11"
          ry="5"
          transform="rotate(-45, 10, 10)"
        />
      </g>
    </svg>
  )
}

// ui.shadcn.com brand mark
export function ShadcnIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="208"
        y1="128"
        x2="128"
        y2="208"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <line
        x1="192"
        y1="40"
        x2="40"
        y2="192"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}

// tanstack.com/favicon-light.svg
export function TanStackIcon(props: PackageIconProps) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="18"
        height="18"
        rx="4"
        fill="url(#tanstack-mark)"
        fillOpacity="0.99"
      />
      <path
        d="M11.223 13.665C10.5529 13.665 10.1862 13.8488 9.89289 13.9958C9.63954 14.1227 9.43953 14.2229 8.99949 14.2229C8.55946 14.2229 8.35944 14.1227 8.10609 13.9958C7.81274 13.8488 7.44604 13.665 6.77599 13.665C6.10594 13.665 5.73925 13.8488 5.44589 13.9958C5.19254 14.1227 4.99252 14.2229 4.55249 14.2229V15.1984C5.22254 15.1984 5.58924 15.0146 5.88259 14.8677C6.13594 14.7407 6.33596 14.6405 6.77599 14.6405C7.21602 14.6405 7.41604 14.7407 7.66939 14.8677C7.96275 15.0146 8.32944 15.1984 8.99949 15.1984C9.66954 15.1984 10.0362 15.0146 10.3296 14.8677C10.5829 14.7407 10.783 14.6405 11.223 14.6405C11.663 14.6405 11.863 14.7407 12.1164 14.8677C12.4097 15.0146 12.7764 15.1984 13.4465 15.1984V14.2229C13.0065 14.2229 12.8064 14.1227 12.5531 13.9958C12.2597 13.8488 11.893 13.665 11.223 13.665Z"
        fill="#171717"
      />
      <path
        d="M12.5534 12.1082C12.26 11.9612 11.8933 11.7775 11.2233 11.7775C10.5532 11.7775 10.1865 11.9612 9.89316 12.1082C9.81648 12.1449 9.74648 12.1817 9.67314 12.2117C9.61647 12.1616 9.58313 12.0982 9.5798 12.0313L9.42312 6.80995L11.5433 8.72747C12.05 9.18513 12.82 8.59718 12.5067 7.98919C12.3333 7.65513 12.1 7.34445 11.8066 7.08054C11.3533 6.66964 10.8132 6.4191 10.2398 6.30886H12.83C13.5168 6.30886 13.6934 5.33674 13.0434 5.11292C12.6567 4.98263 12.2433 4.90914 11.8133 4.90914C11.0266 4.90914 10.2965 5.153 9.68647 5.5639L11.5433 3.88357C12.05 3.4259 11.5433 2.59743 10.9099 2.84798C10.5599 2.98828 10.2298 3.18872 9.93649 3.45597C9.47646 3.87355 9.16643 4.39802 8.99975 4.96927C8.83308 4.39802 8.52305 3.87355 8.06302 3.45597C7.76966 3.19206 7.43964 2.98828 7.08961 2.84798C6.45623 2.59743 5.94952 3.4259 6.45623 3.88357L8.31304 5.5639C7.70632 5.153 6.97627 4.90914 6.18621 4.90914C5.75618 4.90914 5.34281 4.97929 4.95612 5.11292C4.30607 5.3334 4.48608 6.30886 5.16947 6.30886H7.75966C7.18962 6.4191 6.64624 6.67298 6.19288 7.08054C5.89952 7.34445 5.66617 7.65179 5.49282 7.98919C5.17947 8.59384 5.94952 9.18179 6.45623 8.72747L8.54639 6.84002L8.38971 12.0347C8.38971 12.0982 8.35304 12.1583 8.30637 12.2084C8.2397 12.1783 8.17636 12.1483 8.10635 12.1115C7.813 11.9645 7.4463 11.7808 6.77625 11.7808C6.1062 11.7808 5.73951 11.9645 5.44615 12.1115C5.1928 12.2385 4.99279 12.3387 4.55275 12.3387V13.3141C5.2228 13.3141 5.5895 13.1304 5.88285 12.9834C6.13621 12.8565 6.33622 12.7563 6.77625 12.7563C7.21629 12.7563 7.4163 12.8565 7.66965 12.9834C7.96301 13.1304 8.3297 13.3141 8.99975 13.3141C9.66981 13.3141 10.0365 13.1304 10.3299 12.9834C10.5832 12.8565 10.7832 12.7563 11.2233 12.7563C11.6633 12.7563 11.8633 12.8565 12.1167 12.9834C12.41 13.1304 12.7767 13.3141 13.4468 13.3141V12.3387C13.0067 12.3387 12.8067 12.2385 12.5534 12.1115V12.1082Z"
        fill="#171717"
      />
      <defs>
        <linearGradient
          id="tanstack-mark"
          x1="8"
          y1="0"
          x2="8"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5F5F" />
          <stop offset="0.344449" stopColor="#FFA05C" />
          <stop offset="0.733354" stopColor="#FFF27C" />
          <stop offset="1" stopColor="#74DCFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Inline marks, keyed by the package name used in `data.json`. */
export const packageIcons: Record<
  string,
  React.ComponentType<PackageIconProps>
> = {
  "@base-ui/react": BaseUiIcon,
  "class-variance-authority": CvaIcon,
  cmdk: CmdkIcon,
  "input-otp": InputOtpIcon,
  "react-resizable-panels": ResizablePanelsIcon,
  "@shadcn/react": ShadcnIcon,
  "@tanstack/react-table": TanStackIcon,
}

/** Marks that are only published as an image, or too large to inline. */
export const packageIconImages: Record<string, string> = {
  "@hugeicons/react": "/packages/hugeicons.png",
  "react-day-picker": "/packages/react-day-picker.png",
  "embla-carousel-react": "/packages/embla-carousel.svg",
  recharts: "/packages/recharts.png",
  sonner: "/packages/sonner.png",
}

/**
 * Marks that already carry their own background tile, so they fill the avatar
 * edge to edge. Everything else is a bare glyph and gets padding instead.
 */
export const packageIconTiles = new Set([
  "cmdk",
  "input-otp",
  "@tanstack/react-table",
  "@hugeicons/react",
  "react-day-picker",
  "recharts",
])