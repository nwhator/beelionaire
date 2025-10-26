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
  experimental: {
    // Use SWC-based CSS transformer to avoid Turbopack requiring LightningCSS
    // native binaries during the build. This works around platforms where
    // lightningcss native modules or wasm packages are not resolvable by the
    // bundler.
    css: {
      transformer: 'swc',
    },
  },
}

module.exports = nextConfig
