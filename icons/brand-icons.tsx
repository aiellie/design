import * as React from "react"
type IconProps = React.HTMLAttributes<SVGElement>

export const BrandIcons = {
  // Brands
  googleDrive: (props: IconProps) => (
    <svg viewBox="0 0 800 741.3696" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <mask id="a" width="168" height="154" x="12" y="18" maskUnits="userSpaceOnUse">
    <path fill="#fff" d="M63.09 37c14.626-25.333 51.193-25.334 65.819 0l45.033 78c14.626 25.334-3.657 57.001-32.91 57.001H50.967c-29.253 0-47.536-31.667-32.91-57.001Z"/>
  </mask>
  <g mask="url(#a)" transform="matrix(4.8140532,0,0,4.8140532,-62.146701,-86.652356)">
    <path fill="url(#b)" d="M206.905 172.02h-91.888l-19.015-32.934 45.944-79.578Z"/>
    <path fill="url(#c)" d="M-14.919 172.006 50.04 59.494v.002L31.032 92.422h38.02L115 172.004l-129.918.001Z"/>
    <path fill="url(#d)" d="M96.007-20.085 141.954 59.5l-19.011 32.928H31.048Z"/>
  </g>
  <defs>
    <linearGradient id="b" x1="193.6" x2="103.09" y1="165.6" y2="111.21" gradientUnits="userSpaceOnUse">
      <stop offset=".09" stopColor="#ffe921"/>
      <stop offset="1" stopColor="#fec700"/>
    </linearGradient>
    <linearGradient id="c" x1="114.4" x2="15.53" y1="181.61" y2="121.8" gradientUnits="userSpaceOnUse">
      <stop offset=".15" stopColor="#a9a8ff"/>
      <stop offset=".33" stopColor="#6d97ff"/>
      <stop offset=".48" stopColor="#3186ff"/>
    </linearGradient>
    <linearGradient id="d" x1="128.88" x2="28.7" y1="37.88" y2="84.64" gradientUnits="userSpaceOnUse">
      <stop offset=".55" stopColor="#0ebc5f"/>
      <stop offset=".85" stopColor="#78c9ff"/>
    </linearGradient>
  </defs>
</svg>
  ),
  slack: (props: IconProps) => (
    <svg viewBox="0 0 127 127" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
  <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
  <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
  <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
</svg>
  ),
}