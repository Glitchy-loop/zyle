/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zqmilmjbemebqyfmodpx.supabase.co",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
