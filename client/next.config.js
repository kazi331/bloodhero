/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'res.cloudinary.com',
            'images.unsplash.com',
            'cdn.pixabay.com',
            'cdn.dribbble.com',
            'avatars.githubusercontent.com'
        ],
    }
}

module.exports = nextConfig
