/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "http", hostname: "localhost" },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "graph.facebook.com" },
            { protocol: "https", hostname: "cdn.pixabay.com" },
            { protocol: "https", hostname: "cdn.dribbble.com" },
            { protocol: "https", hostname: "avatars.githubusercontent.com" },
            { protocol: "https", hostname: "lh3.googleusercontent.com" }
        ]
    }
}

module.exports = nextConfig
