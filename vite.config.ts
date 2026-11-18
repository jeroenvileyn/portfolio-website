import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  // Relative paths, so the site works on GitHub Pages, Netlify or any sub-folder.
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        blog: resolve(__dirname, "blog.html"),
        post: resolve(__dirname, "post.html"),
      },
    },
  },
});
