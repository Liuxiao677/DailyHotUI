import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    // PWA
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(woff2|woff|ttf)/,
            handler: "CacheFirst",
            options: {
              cacheName: "file-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(webp|png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      },
      manifest: {
        name: "每日新闻-即时新闻速递",
        short_name: "MeiRINews",
        description: "每日新闻（Www.Meiri.News）是您获取最新、最全面新闻资讯的首选平台。我们致力于提供实时、权威的全球新闻报道，涵盖政治、经济、科技、体育及娱乐等各个领域。无论您身处何地，每日新闻都能让您第一时间掌握世界动态，享受新闻阅读的乐趣。我们的团队由资深记者和编辑组成，确保每一条新闻都经过严格审核，为您提供最准确、最深入的新闻分析和评论。加入我们，让每日新闻成为您生活中不可或缺的一部分。",
        display: "standalone",
        start_url: "/",
        theme_color: "#fff",
        background_color: "#efefef",
        icons: [
          {
            src: "/ico/favicon.png",
            sizes: "200x200",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        pure_funcs: ["console.log"],
      },
    },
  },
});
