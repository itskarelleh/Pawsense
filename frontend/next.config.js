/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    serverRuntimeConfig: {
        maxRequestBodySize: '4mb',
    }
}

module.exports = nextConfig
