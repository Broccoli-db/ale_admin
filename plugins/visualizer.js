import { visualizer } from "rollup-plugin-visualizer";
export default function createVisualizer() {
  return visualizer({
    open: false, // 打包完成后自动在浏览器中打开图表
    gzipSize: true, // 显示文件的压缩后大小
    brotliSize: true, // 显示 Brotli 压缩后的文件大小
  });
}
