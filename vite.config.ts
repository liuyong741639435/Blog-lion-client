import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      supportTs: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src",
      },
      { find: "views", replacement: "/src/views" },
      { find: "components", replacement: "/src/components" },
      { find: "api", replacement: "/src/api" },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/styles/variables.less";
          @import "@/styles/mixins.less";
        `
      }
    }
  },
  base: "./", // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    // open: true, // 设置服务启动时是否自动打开浏览器
    // cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
      }
    }
  },
});
