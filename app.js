(() => {
  "use strict";
  const data = window.PROFILE;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  document.querySelectorAll("[data-field]").forEach((element) => {
    element.textContent = data[element.dataset.field] ?? "";
  });
  $("#hero-heading").innerHTML = data.headline
    .map((line, index) =>
      index === data.headline.length - 1 ? `<em>${esc(line)}</em>` : esc(line),
    )
    .join("<br>");
  document.title = `${data.name} · 个人主页`;
  $('meta[name="description"]').content = data.intro;
  $("#stack-path").innerHTML = data.stack
    .map((item) => `<li>${esc(item)}</li>`)
    .join("");
  const labels = ["DEVICE", "CLOUD", "CLIENT", "INTELLIGENCE"];
  $("#focus-grid").innerHTML = data.focus
    .map(
      (item, index) =>
        `<article class="focus-card"><span class="focus-number mono">${String(index + 1).padStart(2, "0")} / ${labels[index] ?? "FOCUS"}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><div class="tags">${item.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}</div></article>`,
    )
    .join("");
  let githubUrl;
  try {
    const url = new URL(data.github);
    if (url.protocol === "https:" && url.hostname === "github.com")
      githubUrl = url.href;
  } catch {}
  document.querySelectorAll(".github-link").forEach((link) => {
    if (githubUrl) link.href = githubUrl;
    else link.hidden = true;
  });
  const themeButton = $("#theme-toggle");
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
    themeButton.setAttribute(
      "aria-label",
      theme === "dark" ? "切换到浅色模式" : "切换到深色模式",
    );
    $('meta[name="theme-color"]').content =
      theme === "dark" ? "#171e1b" : "#f7f8f5";
  }
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("resume-theme");
  } catch {}
  setTheme(savedTheme === "dark" ? "dark" : "light");
  themeButton.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("resume-theme", next);
    } catch {}
  });
})();
