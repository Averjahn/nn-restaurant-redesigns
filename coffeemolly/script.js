// Общая логика витрины и корзины (одинакова для всех демо-сайтов).
const STORAGE_KEY = (document.body.dataset.cartKey || "demo") + "_cart";
let cart = load();
let activeFilter = "Все";

function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
const $ = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString("ru-RU") + " ₽";
const getItem = (id) => MENU.find((p) => p.id === id);

function categories() {
  const present = new Set(MENU.map((p) => p.cat));
  return CATEGORIES.filter((c) => c === "Все" || present.has(c));
}

function renderFilters() {
  const box = $("#filters"); box.innerHTML = "";
  categories().forEach((cat) => {
    const b = document.createElement("button");
    b.className = "filter" + (cat === activeFilter ? " active" : "");
    b.textContent = cat;
    b.onclick = () => { activeFilter = cat; renderFilters(); renderMenu(); };
    box.appendChild(b);
  });
}

function renderMenu() {
  const grid = $("#grid"); grid.innerHTML = "";
  const list = activeFilter === "Все" ? MENU : MENU.filter((p) => p.cat === activeFilter);
  list.forEach((p) => {
    const inCart = cart[p.id] || 0;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card__media">
        <img class="card__img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.closest('.card__media').classList.add('noimg')">
        <span class="card__price">${money(p.price)}</span>
      </div>
      <div class="card__body">
        <span class="tag">${p.cat}</span>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__desc">${p.desc || ""}</p>
        ${inCart > 0
          ? `<div class="card__counter">
               <button class="qty-btn" data-id="${p.id}" data-d="-1">−</button>
               <span class="qty-val">${inCart}</span>
               <button class="qty-btn" data-id="${p.id}" data-d="1">+</button>
             </div>`
          : `<button class="card__add" data-id="${p.id}">В корзину</button>`}
      </div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll(".card__add").forEach((b) => b.onclick = () => { addToCart(+b.dataset.id); renderMenu(); });
  grid.querySelectorAll(".qty-btn").forEach((b) => b.onclick = () => { changeQty(+b.dataset.id, +b.dataset.d); renderMenu(); });
}

function addToCart(id) { cart[id] = (cart[id] || 0) + 1; save(); updateCart(); }
function changeQty(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; save(); updateCart(); }
function removeItem(id) { delete cart[id]; save(); updateCart(); }

function entries() { return Object.keys(cart).map((id) => ({ item: getItem(+id), qty: cart[id] })).filter((e) => e.item); }
function total() { return entries().reduce((s, e) => s + e.item.price * e.qty, 0); }
function count() { return Object.values(cart).reduce((a, b) => a + b, 0); }

function updateCart() {
  const c = count();
  const badge = $("#cartCount");
  badge.textContent = c; badge.hidden = c === 0;
  $("#cartTotal").textContent = money(total());
  const box = $("#cartItems"), list = entries();
  if (!list.length) {
    box.innerHTML = `<p class="cart-empty">Корзина пуста<br>Добавьте что-нибудь из меню</p>`;
    $("#checkoutBtn").disabled = true; return;
  }
  $("#checkoutBtn").disabled = false; box.innerHTML = "";
  list.forEach(({ item, qty }) => {
    const r = document.createElement("div"); r.className = "ci";
    r.innerHTML = `
      <img class="ci__img" src="${item.img}" alt="${item.name}" onerror="this.style.visibility='hidden'">
      <div class="ci__info">
        <div class="ci__name">${item.name}</div>
        <div class="ci__price">${money(item.price)}</div>
        <div class="ci__controls">
          <button class="qty-btn" data-id="${item.id}" data-d="-1">−</button>
          <span class="ci__qty">${qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-d="1">+</button>
          <button class="ci__remove" data-id="${item.id}">✕</button>
        </div>
      </div>`;
    box.appendChild(r);
  });
  box.querySelectorAll(".qty-btn").forEach((b) => b.onclick = () => { changeQty(+b.dataset.id, +b.dataset.d); updateCart(); });
  box.querySelectorAll(".ci__remove").forEach((b) => b.onclick = () => { removeItem(+b.dataset.id); updateCart(); });
}

const openCart = () => { $("#cart").classList.add("open"); $("#overlay").classList.add("open"); };
const closeCart = () => { $("#cart").classList.remove("open"); $("#overlay").classList.remove("open"); };
const openOrder = () => { $("#orderTotal").textContent = money(total()); $("#orderForm").hidden = false; $("#orderSuccess").hidden = true; $("#orderModal").classList.add("open"); };
const closeOrder = () => $("#orderModal").classList.remove("open");

document.addEventListener("DOMContentLoaded", () => {
  renderFilters(); renderMenu(); updateCart();
  $("#cartBtn").onclick = openCart;
  $("#cartClose").onclick = closeCart;
  $("#overlay").onclick = closeCart;
  $("#checkoutBtn").onclick = () => { if (count() > 0) { closeCart(); openOrder(); } };
  $("#orderClose").onclick = closeOrder;
  $("#orderForm").onsubmit = (e) => {
    e.preventDefault(); cart = {}; save(); updateCart(); renderMenu();
    $("#orderForm").hidden = true; $("#orderSuccess").hidden = false; e.target.reset();
  };
  $("#successClose").onclick = closeOrder;
  if (activeFilter) renderMenu();

  // видео в hero — грузим iframe только по клику, чтобы не нагружать страницу автоплеем
  const videoBtn = $("#heroVideoBtn"), videoModal = $("#videoModal"), videoFrame = $("#videoModalFrame");
  if (videoBtn && videoModal && videoFrame) {
    videoBtn.onclick = () => {
      videoFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/fCgk92u0728?autoplay=1&rel=0" title="Coffee Molly" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
      videoModal.classList.add("open");
    };
    const closeVideo = () => { videoModal.classList.remove("open"); videoFrame.innerHTML = ""; };
    $("#videoModalClose").onclick = closeVideo;
    videoModal.onclick = (e) => { if (e.target === videoModal) closeVideo(); };
  }

  // фоновый винтажный джаз — стартует по первому взаимодействию (браузеры блокируют автоплей со звуком)
  const music = $("#bgMusic"), musicBtn = $("#musicBtn");
  if (music && musicBtn) {
    let playing = false;
    const startEvents = ["click", "scroll", "touchstart", "keydown"];
    const removeAutoStart = () => startEvents.forEach((ev) => document.removeEventListener(ev, startMusicOnce));
    function startMusicOnce(e) {
      if (musicBtn.contains(e.target)) return; // кнопка управляет сама
      removeAutoStart();
      music.play().catch(() => {});
      musicBtn.classList.add("is-playing");
      playing = true;
    }
    startEvents.forEach((ev) => document.addEventListener(ev, startMusicOnce, { passive: true }));
    musicBtn.onclick = () => {
      removeAutoStart();
      if (playing) { music.pause(); musicBtn.classList.remove("is-playing"); }
      else { music.play().catch(() => {}); musicBtn.classList.add("is-playing"); }
      playing = !playing;
    };
  }
});
