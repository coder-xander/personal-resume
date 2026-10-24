import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://coder-xander.github.io",
  base: "/personal-resume",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: "github-dark" } },
  vite: {
    server: {
      watch: {
        // Editors that save atomically create transient sibling directories
        // (".file.ext.<pid>.<hash>.tmpdir"). Watching them makes Astro rebuild
        // its route manifest against a path that no longer exists.
        ignored: ["**/*.tmpdir", "**/*.tmpdir/**", "**/*.tmp"],
      },
    },
  },
});
