module.exports = {
    basePath: '/apps/nextjs-cpanel',
    trailingSlash: true,
    webpack: (config, { buildId, dev }) => {
      config.resolve.symlinks = false
      return config
    },
    experimental: { esmExternals: true }
}
