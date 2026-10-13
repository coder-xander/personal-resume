(() => {
  "use strict";
  const data = window.RESUME;
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
  const chips = (items) =>
    `<div class="chips">${items.map((item) => `<span class="chip">${esc(item)}</span>`).join("")}</div>`;
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };
  const arrow =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 17 10-10M7 7h10v10"/></svg>';
  const appVisual =
    '<div class="mock-window"><div class="mock-top"><i></i><i></i><i></i></div><div class="mock-body"><div class="mock-side"><i></i><i></i><i></i><i></i></div><div class="mock-content"><div class="mock-title"></div><div class="mock-cards"><i></i><i></i><i></i></div><svg class="mock-chart" viewBox="0 0 150 35"><path d="M0 29 17 24 31 26 49 15 63 20 83 12 95 17 114 5 132 11 150 3"/></svg></div></div></div>';
  const systemVisual =
    '<div class="terminal-window"><div class="terminal-top"><span>~/workspace</span><span>● ● ●</span></div><div class="terminal-body"><div><span class="prompt">$</span> build something useful</div><div class="indent">↳ idea</div><div class="indent">↳ implementation</div><div class="indent">↳ verification <span class="cursor"></span></div></div></div>';
  document.querySelectorAll("[data-field]").forEach((element) => {
    element.textContent = data[element.dataset.field] ?? "";
  });
  const titleLines = data.tagline.split("\n");
  $("#hero-heading").innerHTML = titleLines
    .map((line, index) =>
      index === titleLines.length - 1 ? `<em>${esc(line)}</em>` : esc(line),
    )
    .join("<br>");
  document.title = `${data.name} / ${data.englishName} · 个人简历`;
  $('meta[name="description"]').content =
    `${data.name}的个人简历。${data.intro}`;
  $("#focus-list").innerHTML = data.focus
    .map((item) => `<span>${esc(item)}</span>`)
    .join("");
  $("#experience-list").innerHTML = data.experience
    .map(
      (job) =>
        `<article class="timeline-item"><div class="timeline-date">${esc(job.date)}${job.current ? '<span class="current-label">' + (data.demo ? "最近经历 · 示例" : "目前") + "</span>" : ""}</div><div class="timeline-detail"><div class="job-heading"><h3>${esc(job.company)}</h3><span>${esc(job.role)}</span></div><p>${esc(job.summary)}</p><ul>${job.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>${chips(job.tags)}</div></article>`,
    )
    .join("");
  $("#project-list").innerHTML = data.projects
    .map(
      (project, index) =>
        `<article class="project-card"><div class="project-visual ${project.type === "system" ? "system" : ""}" aria-hidden="true"><span class="visual-tag">PROJECT ${String(index + 1).padStart(2, "0")} / ${data.demo ? "DEMO" : "SELECTED"}</span>${project.type === "system" ? systemVisual : appVisual}</div><div class="project-content"><div class="project-category">${esc(project.category)}${data.demo ? " · 示例" : ""}</div><div class="project-title-row"><h3>${esc(project.title)}</h3><button class="project-open" data-project="${index}" type="button" aria-label="查看${esc(project.title)}详情">${arrow}</button></div><p>${esc(project.description)}</p>${chips(project.tags)}</div></article>`,
    )
    .join("");
  $("#skills-list").innerHTML = data.skills
    .map(
      (skill) =>
        `<article class="skill-block"><h3>${esc(skill.title)}</h3><p>${esc(skill.note)}</p>${chips(skill.items)}</article>`,
    )
    .join("");
  $("#education-school").textContent = data.education.school;
  $("#education-major").textContent = data.education.major;
  $("#education-date").textContent = data.education.date;
  if (!data.demo) {
    $("#template-tag").hidden = true;
    document.querySelectorAll(".demo-note").forEach((note) => {
      note.hidden = true;
    });
  }
  const giteeUrl = safeUrl(data.gitee);
  ["#gitee-link", "#projects-gitee"].forEach((selector) => {
    const link = $(selector);
    if (giteeUrl) link.href = giteeUrl;
    else link.hidden = true;
  });
  const email = String(data.email ?? "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  $("#contact-email").textContent = validEmail ? email : "邮箱待填写";
  const dialog = $("#detail-dialog");
  function showDialog(title, description, url = "") {
    $("#dialog-title").textContent = title;
    $("#dialog-description").textContent = description;
    const target = safeUrl(url);
    $("#dialog-link").hidden = !target;
    if (target) $("#dialog-link").href = target;
    else $("#dialog-link").removeAttribute("href");
    $("#dialog-kicker").textContent =
      target || title !== "联系方式待填写" ? "PROJECT NOTES" : "CONTACT";
    dialog.showModal();
  }
  document.querySelectorAll("[data-project]").forEach((button) =>
    button.addEventListener("click", () => {
      const project = data.projects[Number(button.dataset.project)];
      showDialog(project.title, project.detail, project.url);
    }),
  );
  document.querySelectorAll(".contact-trigger").forEach((button) =>
    button.addEventListener("click", () => {
      if (validEmail)
        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("从你的个人主页联系")}`;
      else
        showDialog(
          "联系方式待填写",
          "这是初版模板，邮箱尚未填写。补充联系方式后，这个按钮会打开邮件应用。",
        );
    }),
  );
  $("#dialog-close").addEventListener("click", () => dialog.close());
  $("#dialog-ok").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
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
  let storedTheme;
  try {
    storedTheme = localStorage.getItem("resume-theme");
  } catch {}
  setTheme(
    storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light",
  );
  themeButton.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("resume-theme", next);
    } catch {}
  });
  $("#print-button").addEventListener("click", () => window.print());
  const sidebar = $(".sidebar");
  const menuButton = $(".menu-toggle");
  function closeMenu() {
    sidebar.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "打开导航");
  }
  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  });
  document
    .querySelectorAll(".nav a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  const desktopQuery = matchMedia("(min-width:681px)");
  desktopQuery.addEventListener("change", closeMenu);
  if ("IntersectionObserver" in window) {
    const sections = [...document.querySelectorAll("main section[id]")];
    const navLinks = [...document.querySelectorAll(".nav a")];
    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.38;
        let current = sections[0];
        for (const section of sections)
          if (section.getBoundingClientRect().top <= line) current = section;
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 6
        )
          current = sections[sections.length - 1];
        navLinks.forEach((link) => {
          const active = link.hash === `#${current.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-70px 0px 0px 0px",
      },
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
