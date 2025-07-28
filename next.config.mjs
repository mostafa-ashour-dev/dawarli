/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    experimental: {
        reactRefresh: true, // Enable better fast refresh
    },

    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,            // Check for file changes every second
            aggregateTimeout: 300, // Delay rebuild slightly to batch changes
        };
        return config;
    },
};

export default nextConfig;
