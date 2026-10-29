const projects = [

{
    title: "Aqua-hydration",
    date: "Oct 2026",
    desc: "Find nearby water shops and order your filtered drinking water with ease.",
    tags: ["Nodejs","Type", "Next.js","CSS","HTML","JavaScript"],
    live: "https://Aqua-hydration.vercel.app/index",
    code: "/aqua.html",
    img:"/images/thumbnail.png",
    c1: "#489add",
    c2: "#3567be",
  }, 
    {
    title: "AutoGO-pak",
    date: "Sep 2026",
    desc: "Pakistan-based auto marketplace to buy, sell and rent vehicles.",
    tags: ["JavaScript", "Nodejs","Nextjs", "RESTAPI","MongoDB", "CSS"],
    live: "https://autogo-pak.vercel.app/",
    code: "/detail.html",
    img:"/images/file_000000008c6c82118ce122f7d86dbcb7.png",
    c1: "#1f6f5c",
    c2: "#0b3b4a",
  },

  {
    title: "Discount Emporium",
    date: "May 2026",
    desc: "Discounts, verified deals and offers — all in one place.",
    tags: ["Nodejs","Expressjs","Handlebars","CSS","HTML","JavaScript"],
    live: "https://discountemporium.vercel.app/index",
    code: "/discount.html",
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwQT4eWJTHFPhKdU3tD6Ot_Lb2bvF-0s3oBoq9QheLiw&s=10",
    c1: "#b4532a",
    c2: "#5a1f3a",
  }, 
];
const skills = {
  "Front end": [
      ["JavaScript", 85],
      ["Nextjs", 70],
      ["Reactjs", 70],
      ["HTML", 95],
    ["CSS", 90],
],
  Tools: [
    ["Git & GitHub", 85],
    ["Docker & VS Code", 90],
    ["Chrome DevTools", 80],
    ["ChatGpt", 70],
    ["Claude Code", 70],
  
  ],
  "Backend": [
    ["Node.js", 80],
    ["Expressjs", 75],
    ["MongoDB", 60],
    ["RESTApi", 70],
  ],
};
// Thumbnails are generated automatically. Optional: add img:"shot.png" to a project to use your own image.
// --------------------------------
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const root = document.documentElement;
const ARROW =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

$("#yr").textContent = new Date().getFullYear();

// projects
$("#projectGrid").innerHTML = projects
  .map(
    (p, n) => `
<article class="card reveal" style="--d:${n * 0.08}s">
  <div class="thumb" style="background:linear-gradient(135deg,${p.c1},${p.c2})"><span class="num">${String(n + 1).padStart(2, "0")}</span>${
    p.img
      ? `<img src="${p.img}" alt="${p.title} screenshot" loading="lazy">`
      : `<div class="bar2"><i></i><i></i><i></i></div><div class="art"><div class="blob"></div><div class="mono">${p.title
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}</div><div class="lines"><b></b><b></b><b></b></div></div>`
  }</div>
  <div class="body">
    <div class="meta"><h3>${p.title}</h3><span class="date">${p.date}</span></div>
    <p>${p.desc}</p>
    <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    <div class="links"><a href="${p.live}" target="_blank" rel="noopener">Live site ${ARROW}</a><a href="${p.code}">Case study ${ARROW}</a></div>
  </div>
</article>`,
  )
  .join("");

// skills
$("#skillGrid").innerHTML = Object.entries(skills)
  .map(
    ([g, l], n) => `
<div class="group reveal" style="--d:${n * 0.08}s"><h3>${g}<small>${String(l.length).padStart(2, "0")}</small></h3>${l
      .map(
        ([s, v]) =>
          `<div class="skill"><div class="row"><span>${s}</span><span>${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></div>`,
      )
      .join("")}</div>`,
  )
  .join("");

// marquee (content doubled so the loop is seamless)
const tech = [...new Set(Object.values(skills).flat().map(([s]) => s))];
const run = (hide) =>
  tech.map((t) => `<span${hide ? ' aria-hidden="true"' : ""}>${t}</span>`).join("");
$("#marquee").innerHTML = run(false) + run(true);

// reveal on scroll + fill skill bars once visible
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target
        .querySelectorAll(".bar i")
        .forEach((i) => (i.style.width = i.dataset.w + "%"));
      io.unobserve(e.target);
    }),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);
$$(".reveal").forEach((el) => io.observe(el));

// header state, active nav link
const hdr = $("#hdr"),
  navLinks = [...$$("nav a.l")];
function onScroll() {
  const y = scrollY;
  hdr.classList.toggle("scrolled", y > 12);
  let current = "";
  navLinks.forEach((a) => {
    const s = $(a.getAttribute("href"));
    if (s && s.offsetTop - 140 <= y) current = a.getAttribute("href");
  });
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === current),
  );
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// copy email
const toast = $("#toast");
let toastTimer;
function say(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
$("#copyEmail").onclick = async (e) => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    say("Email copied to clipboard");
  } catch (err) {
    location.href = "mailto:" + email;
  }
};

// theme toggle (sun / moon)
const btn = $("#theme");
const SUN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const isDark = () =>
  root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;
function paint() {
  const d = isDark();
  btn.innerHTML = d ? SUN : MOON;
  btn.setAttribute(
    "aria-label",
    d ? "Switch to light mode" : "Switch to dark mode",
  );
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", d ? "#0a0e0d" : "#f5f6f2");
}
btn.onclick = () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch (e) {}
  paint();
};
paint();
