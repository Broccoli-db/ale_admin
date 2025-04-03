import viteImagemin from "vite-plugin-imagemin";
export default function createViteImagemin() {
  return viteImagemin({
    // 压缩 PNG
    optipng: {
      optimizationLevel: 5, // 1-7，值越高压缩越大但速度较慢
    },
    // 压缩 JPG
    mozjpeg: {
      quality: 80, // 质量，0-100，建议 75-85，平衡质量和体积
    },
    // 压缩 GIF
    gifsicle: {
      optimizationLevel: 3, // 1-3，值越高压缩越多
    },
    // 压缩 SVG
    svgo: {
      plugins: [
        { name: "removeViewBox", active: false }, // 保留 viewBox 以避免缩放问题
        { name: "removeEmptyAttrs", active: false },
      ],
    },
    // 压缩 WebP
    webp: {
      quality: 75, // 质量 0-100
    },
  });
}
