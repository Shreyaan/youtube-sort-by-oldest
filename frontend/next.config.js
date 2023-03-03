/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/videos',
        destination: '/videos/[...channelId]',
      },
    ];
  },
}
