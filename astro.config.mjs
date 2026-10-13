import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://coder-xander.github.io",
  base: "/personal-resume",
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: "github-dark" } },
});
