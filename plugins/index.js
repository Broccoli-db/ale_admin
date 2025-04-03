import react from "@vitejs/plugin-react-swc";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createVisualizer from "./visualizer";
import createViteImagemin from "./viteImagemin";

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [react()];
  vitePlugins.push(createVisualizer());
  vitePlugins.push(createViteImagemin());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
