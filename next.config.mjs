/** @type {import('next').NextConfig} */
const nextConfig = {
  // Overridable so a second dev server (e.g. another agent session) can run
  // in parallel without fighting over .next/dev/lock
  distDir: process.env.NEXT_DIST_DIR || ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
