/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

// Setup Cloudflare D1/R2 bindings for local dev
if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = await import(
    "@cloudflare/next-on-pages/next-dev"
  );
  await setupDevPlatform();
}

export default nextConfig;
