/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  // Ensure Turbopack resolves the project root correctly. Next.js may
  // infer a parent directory as the workspace root if multiple lockfiles
  // exist on the system. Explicitly set `turbopack.root` to avoid loading
  // PostCSS/Root-level configs from the wrong folder (which can cause
  // Tailwind/PostCSS plugin resolution errors).
  turbopack: {
    root: path.resolve(__dirname),
  },
}

module.exports = nextConfig
