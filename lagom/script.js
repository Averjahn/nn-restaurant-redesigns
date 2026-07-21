// Lägom Кофе — сезонная тема hero + анимация погоды (листья/снег/лепестки/пыльца).
// Сезон определяется по текущему месяцу (северное полушарие), с возможностью
// переключить вручную — выбор запоминается в localStorage.

const SEASONS = ["spring", "summer", "autumn", "winter"];
const STORAGE_KEY = "lagom_season_v1";

function detectSeason() {
  const m = new Date().getMonth(); // 0=янв
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "autumn";
  return "winter";
}

// Цвет хедера по сезону (дублирует --season-b из CSS). Ставим напрямую через
// JS, а не полагаемся на каскад var() до .header — в паре браузеров замечен
// баг, когда background sticky-элемента, завязанный на CSS-переменную,
// не перерисовывается при повторных сменах значения переменной.
const HEADER_COLOR = {
  spring: "#8fb8dd",
  summer: "#2f8fce",
  autumn: "#cc3355",
  winter: "#6ba8cf",
};

// Форма и цвет частиц под каждый сезон — палитра книги Lagom.
const WEATHER = {
  spring: { count: 16, colors: ["#f0c9c2", "#f6efe0", "#e8a89a"], shape: "petal", duration: [7, 12] },
  summer: { count: 14, colors: ["#f6efe0", "#d9a13c"], shape: "dot", duration: [9, 15] },
  autumn: { count: 18, colors: ["#c9673f", "#d9a13c", "#8b4a2f"], shape: "leaf", duration: [6, 10] },
  winter: { count: 20, colors: ["#ffffff", "#eef5f3"], shape: "dot", duration: [8, 14] },
};

function rand(min, max) { return min + Math.random() * (max - min); }

function shapeSVG(shape, color) {
  if (shape === "leaf") {
    return `<svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 13Q7 6 2 2Q9 3 12 8Q9 12 7 13Z" fill="${color}"/></svg>`;
  }
  if (shape === "petal") {
    return `<svg width="11" height="11" viewBox="0 0 11 11"><ellipse cx="5.5" cy="5.5" rx="5.5" ry="3.4" fill="${color}"/></svg>`;
  }
  return `<span style="display:block;width:7px;height:7px;border-radius:50%;background:${color}"></span>`;
}

function spawnWeather(season) {
  const box = document.getElementById("heroWeather");
  if (!box) return;
  box.innerHTML = "";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cfg = WEATHER[season] || WEATHER.summer;
  const fall = (box.clientHeight || 560) + 80;
  for (let i = 0; i < cfg.count; i++) {
    const el = document.createElement("div");
    el.className = "wp";
    const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    el.innerHTML = shapeSVG(cfg.shape, color);
    const left = rand(0, 100);
    const dur = rand(cfg.duration[0], cfg.duration[1]);
    const delay = rand(-dur, 0);
    const drift = rand(-60, 60);
    const spin = rand(120, 320);
    el.style.left = left + "%";
    el.style.animationDuration = dur.toFixed(2) + "s";
    el.style.animationDelay = delay.toFixed(2) + "s";
    el.style.setProperty("--drift", drift.toFixed(0) + "px");
    el.style.setProperty("--spin", spin.toFixed(0) + "deg");
    el.style.setProperty("--fall", fall + "px");
    el.style.opacity = String(rand(.5, 1));
    box.appendChild(el);
  }
}

function applySeason(season, persist) {
  document.body.dataset.season = season;
  document.querySelectorAll("#seasonSwitch button").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.season === season);
  });
  const header = document.querySelector(".header");
  if (header && HEADER_COLOR[season]) header.style.backgroundColor = HEADER_COLOR[season];
  spawnWeather(season);
  if (persist) { try { localStorage.setItem(STORAGE_KEY, season); } catch (e) {} }
}

document.addEventListener("DOMContentLoaded", () => {
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  const initial = SEASONS.includes(saved) ? saved : detectSeason();
  applySeason(initial, false);

  document.querySelectorAll("#seasonSwitch button").forEach((btn) => {
    btn.addEventListener("click", () => applySeason(btn.dataset.season, true));
  });

  window.addEventListener("resize", () => spawnWeather(document.body.dataset.season));

  initLoader();
});

// Заставка загрузки: две книги «с торца» разлетаются страницами и сходятся в одну.
function initLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    loader.remove();
    return;
  }

  document.body.classList.add("is-loading");
  let finished = false;

  function finish() {
    if (finished) return;
    finished = true;
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    setTimeout(() => loader.remove(), 900);
  }

  // книги подлетают и «шелестят» страницами ~1.3с, затем сходятся к центру ~0.9с,
  // затем выравниваются в одну обложку и проступает надпись, и всё гаснет
  const t1 = setTimeout(() => loader.classList.add("is-merging"), 1300);
  const t2 = setTimeout(() => loader.classList.add("is-merged"), 2150);
  const t3 = setTimeout(finish, 3050);

  // пропустить по клику или Esc — не запирать пользователя в анимации
  loader.addEventListener("click", () => {
    clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    finish();
  });
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      finish();
      document.removeEventListener("keydown", onKey);
    }
  });
}
