

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
      config.resolve.fallback = { fs: false }
    }
    return config
  },
}
