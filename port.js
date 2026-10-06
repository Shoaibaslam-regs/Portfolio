const projects = [
  {
    title: "Automarket-pak",
    date: "sep 2026",
    desc: "Pakistan Based AutoMarket BUY-SALE & RENT VAHICLES.",
    tags: ["JavaScript", "Nodejs","Nextjs", "RESTAPI","MongoDB", "CSS"],
    live: "https://automarket-pak.vercel.app/",
    code: "/detail.html",
    img:"/images/Gemini_Generated_Image_3knof43knof43kno.jpeg",
    c1: "#1f6f5c",
    c2: "#0b3b4a",
  },
  {
    title: "Discoount Emporium",
    date: "May 2026",
    desc: "discounts, verified deals, and offers at one place.",
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
$("#yr").textContent = new Date().getFullYear();
$("#projectGrid").innerHTML = projects
  .map(
    (p) => `
<article class="card">
  <div class="thumb" style="background:linear-gradient(135deg,${p.c1},${p.c2})">${
    p.img
      ? `<img src="${p.img}" alt="${p.title} screenshot">`
      : `<div class="bar2"><i></i><i></i><i></i></div><div class="art"><div class="blob"></div><div class="mono">${p.title
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(
            0,
            2,
          )}</div><div class="lines"><b></b><b></b><b></b></div></div>`
  }</div>
  <div class="body"><h3>${p.title}</h3><div class="date">${p.date}</div><p>${p.desc}</p>
  <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  <div class="links"><a href="${p.live}" target="_blank" rel="noopener">Live</a><a href="${p.code}" target="_blank" rel="noopener">Project Detail</a></div></div>
</article>`,
  )
  .join("");
$("#skillGrid").innerHTML = Object.entries(skills)
  .map(
    ([g, l]) => `
<div class="group"><h3>${g}</h3>${l.map(([n, v]) => `<div class="skill"><div class="row"><span>${n}</span><span>${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></div>`).join("")}</div>`,
  )
  .join("");
// fill skill bars once when visible
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target
          .querySelectorAll("i")
          .forEach((i) => (i.style.width = i.dataset.w + "%"));
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.25 },
);
document.querySelectorAll(".group").forEach((g) => io.observe(g));
// theme toggle (sun / moon)
const root = document.documentElement,
  btn = $("#theme");
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
}
try {
  const t = localStorage.getItem("theme");
  if (t) root.dataset.theme = t;
} catch (e) {}
btn.onclick = () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch (e) {}
  paint();
};
paint();
