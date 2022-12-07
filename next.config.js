/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;
const nextConfig = {
  reactStrictMode: true,

  // 입력된 url이 source와 같을 때 destination으로 보내줌
  // url이 변경되었다는걸 사용자가 볼 수 있음
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/new-sexy-blog/:path*',
        permanent: false,
      },
      {
        source: '/basic/:path',
        destination: '/premium/:path',
        permanent: false,
      },
    ];
  },

  // redirect와 비슷하지만 유저는 변경된 url을 볼 수 없음
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
