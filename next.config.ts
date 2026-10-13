import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static site in out/ (every route is static),
// used to deploy from Windows where Vercel's local build cannot create symlinks.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true } } : {}),
  // Partial prerendering cannot be used with a static export.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
