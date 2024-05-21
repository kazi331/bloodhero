/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'res.cloudinary.com',
            'images.unsplash.com',
            'graph.facebook.com',
            'cdn.pixabay.com',
            'cdn.dribbble.com',
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com'
        ],
    }
}

module.exports = nextConfig
