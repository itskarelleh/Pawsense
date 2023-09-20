/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    serverRuntimeConfig: {
        maxRequestBodySize: '4mb',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
