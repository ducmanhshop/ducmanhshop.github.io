/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Nếu deploy lên GitHub Pages dưới subdirectory, thêm basePath:
  // basePath: '/repo-name',
};

export default nextConfig;
