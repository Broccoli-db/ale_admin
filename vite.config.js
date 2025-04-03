import { defineConfig, loadEnv } from "vite";
import path from "path";
import createVitePlugins from "./plugins";
const port = 8880;
// 缓存目录配置
const cacheDir = ".vite_cache";
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  console.log(VITE_APP_ENV);

  return {
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    build: {
      outDir: "admin_dist",
      assetsDir: "static",
      sourcemap: VITE_APP_ENV === "development", // 只在开发环境生成 sourcemap
      minify: VITE_APP_ENV === "production" ? "terser" : "esbuild", // 使用 terser 来获得更好的压缩效果
      terserOptions: {
        compress: {
          drop_console: VITE_APP_ENV === "production", // 生产环境下移除 console
          pure_funcs: VITE_APP_ENV === "production" ? ["console.log"] : [],
          passes: 2, // 优化压缩次数
        },
        format: {
          comments: false, // 删除注释
        },
        // parallel: true, // 启用多线程
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // vendor: ["vue", "vue-router", "pinia"], // 第三方库分包
            // 将大型依赖单独打包
            // lodash: ["lodash"],
            // UI库单独打包
            // element: ["element-plus"],
          },
          // 自定义 chunk 文件名
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
      // 启用 gzip 压缩
      brotliSize: false,
      chunkSizeWarningLimit: 1000,
      cssTarget: ["chrome61", "safari13"],
      // 构建缓存
      cache: {
        dir: cacheDir,
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./"),
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/global.scss" as *;`,
        },
      },
    },
    server: {
      port: port,
      host: "0.0.0.0", // 支持通过 IP 访问
      open: true,
      cors: true, // 启用 CORS
      hmr: {
        overlay: false, // 禁用热更新错误遮罩
      },
      watch: {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/zk-learning-network-ui/**",
          "**/coverage/**",
          "**/.vscode/**",
        ],
      },
      middlewareMode: false,
      force: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:7000",
          changeOrigin: true,
          headers: {
            "Accept-Encoding": "gzip, deflate, br",
          },
          rewrite: (path) => path.replace(/^\/api/, ""),
          // 添加响应头配置
          configure: (proxy, options) => {
            proxy.on("proxyRes", (proxyRes, req, res) => {
              // 禁止被iframe嵌入
              proxyRes.headers["X-Frame-Options"] = "SAMEORIGIN";
              // 防止XSS攻击
              proxyRes.headers["X-XSS-Protection"] = "1; mode=block";
              // 禁止嗅探MIME类型
              proxyRes.headers["X-Content-Type-Options"] = "nosniff";
              // 设置CSP策略
              proxyRes.headers["Content-Security-Policy"] =
                "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';";
              // 设置引用策略
              proxyRes.headers["Referrer-Policy"] = "same-origin";
              // 禁止缓存敏感页面
              // proxyRes.headers["Cache-Control"] = "no-store";
              // 强制HTTPS
              // proxyRes.headers["Strict-Transport-Security"] =
              //   "max-age=31536000; includeSubDomains";
              // 限制浏览器功能（摄像头、麦克风、地理位置等）的使用
              // proxyRes.headers["Permissions-Policy"] =
              //   "camera=(), microphone=(), geolocation=()";
              // 禁止爬虫索引
              // proxyRes.headers["X-Robots-Tag"] = "noindex, nofollow";
            });
          },
        },
      },
    },
    optimizeDeps: {
      // include: ["vue", "vue-router", "pinia"], // 预构建常用依赖
      // exclude: ["moment"], // 排除不需要预构建的依赖
      // 缓存目录
      cacheDir: cacheDir,
    },
    esbuild: {
      pure:
        VITE_APP_ENV === "production"
          ? ["console.log", "console.info", "console.warn", "console.debug"]
          : [], // 生产环境下移除 console
      legalComments: "none", // 去除注释
      drop: VITE_APP_ENV === "production" ? ["console"] : [],
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    // 性能优化配置
    performance: {
      hints: false, // 关闭性能提示
    },
  };
});
