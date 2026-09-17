/* Витрина и корзина «Ковчег».
   За основу взят общий движок редизайнов, добавлено то, чего не хватало
   на оригинальном сайте и что прямо стоило заведению заказов:
   1) корзина собирается КРУГЛОСУТОЧНО — вне часов работы оформляем предзаказ,
      а не показываем «сделать заказ нельзя» и не теряем клиента;
   2) минимальная сумма считается ПО РАЙОНУ (1000/1500 ₽) — на оригинале
      страница «Доставка» обещает 1000 ₽, а страница «Зоны» требует 1500 ₽;
   3) «нет в наличии» видно в каталоге, такое блюдо нельзя положить в корзину;
   4) у мяса показан вес порции и честная цена за порцию, а не только за 100 г. */

const STORAGE_KEY = (document.body.dataset.cartKey || "kovcheg") + "_cart";
const OPEN_HOUR = 10, CLOSE_HOUR = 22;

/* Зоны доставки: минимальная сумма заказа по районам (с сайта заведения). */
const ZONES = [
  { id: "center", name: "Нижегородский, Приокский, Советский", min: 1000 },
  { id: "west",   name: "Московский, Ленинский, Канавинский",  min: 1500 },
  { id: "far",    name: "Автозавод, Сормово",                  min: 1500 },
  { id: "kstovo", name: "Кстово",                              min: 1500 },
];

let cart = load();
let activeFilter = "Все";
let zone = localStorage.getItem("kovcheg_zone") || "center";

/* Правки владельца из панели Q+W+E накладываются поверх каталога:
   стоп-лист, цены, минимумы по зонам и часы работы. */
let OPEN_H = OPEN_HOUR, CLOSE_H = CLOSE_HOUR;
(function applyAdmin(){
  let a; try { a = JSON.parse(localStorage.getItem("kovcheg_admin")); } catch (e) { return; }
  if (!a) return;
  if (a.items) for (const p of MENU) {
    const o = a.items[p.id]; if (!o) continue;
    if (o.price !== undefined) p.price = o.price;
    if (o.sold  !== undefined) p.sold  = o.sold;
  }
  if (Array.isArray(a.zones)) for (const z of a.zones) {
    const t = ZONES.find((x) => x.id === z.id); if (t && z.min !== undefined) t.min = z.min;
  }
  const hh = (v) => parseInt(String(v || "").split(":")[0], 10);
  if (!isNaN(hh(a.open)))  OPEN_H  = hh(a.open);
  if (!isNaN(hh(a.close))) CLOSE_H = hh(a.close);
})();

function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
const $ = (s) => document.querySelector(s);
const money = (n) => n.toLocaleString("ru-RU") + " ₽";
const getItem = (id) => MENU.find((p) => p.id === id);
const zoneOf = () => ZONES.find((z) => z.id === zone) || ZONES[0];

/* Сейчас принимаем заказы или собираем предзаказ на утро. */
function isOpenNow() {
  const h = new Date().getHours();
  return h >= OPEN_H && h < CLOSE_H;
}

function categories() {
  const present = new Set(MENU.map((p) => p.cat));
  return CATEGORIES.filter((c) => c === "Все" || present.has(c));
}

function renderFilters() {
  const box = $("#filters"); box.innerHTML = "";
  categories().forEach((cat) => {
    const b = document.createElement("button");
    b.className = "tab" + (cat === activeFilter ? " on" : "");
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
    card.className = "it" + (p.sold ? " it--out" : "");
    // Вес отдельной строкой: на оригинале «180 ₽» у шашлыка означало цену
    // за 100 г, и это выяснялось только в корзине.
    const weight = p.weight ? `<div class="it__w">${p.weight}</div>` : "";
    const act = p.sold
      ? `<button class="it__add" disabled>Закончилось</button>`
      : (inCart > 0
        ? `<div class="it__qty">
             <button class="q" data-id="${p.id}" data-d="-1" aria-label="Убрать порцию">−</button>
             <span>${inCart}</span>
             <button class="q" data-id="${p.id}" data-d="1" aria-label="Добавить порцию">+</button>
           </div>`
        : `<button class="it__add" data-id="${p.id}">В корзину</button>`);
    card.innerHTML = `
      <div class="it__ph">
        <img src="${p.img}" alt="${p.name}" loading="lazy" width="600" height="600">
        ${p.sold ? '<span class="it__flag">нет в наличии</span>' : ""}
      </div>
      <div class="it__top"><span class="it__nm">${p.name}</span><span class="it__pr">${money(p.price)}</span></div>
      ${weight}
      <div class="it__act">${act}</div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll(".it__add:not([disabled])").forEach((b) =>
    b.onclick = () => { addToCart(+b.dataset.id); renderMenu(); });
  grid.querySelectorAll(".q").forEach((b) =>
    b.onclick = () => { changeQty(+b.dataset.id, +b.dataset.d); renderMenu(); });
}

function addToCart(id) { const p = getItem(id); if (!p || p.sold) return; cart[id] = (cart[id] || 0) + 1; save(); updateCart(); }
function changeQty(id, d) { cart[id] = (cart[id] || 0) + d; if (cart[id] <= 0) delete cart[id]; save(); updateCart(); }
function removeItem(id) { delete cart[id]; save(); updateCart(); }

function entries() { return Object.keys(cart).map((id) => ({ item: getItem(+id), qty: cart[id] })).filter((e) => e.item); }
function total() { return entries().reduce((s, e) => s + e.item.price * e.qty, 0); }
function count() { return Object.values(cart).reduce((a, b) => a + b, 0); }

function updateCart() {
  const c = count(), sum = total(), z = zoneOf(), left = z.min - sum;
  const badge = $("#cartCount");
  badge.textContent = c; badge.hidden = c === 0;
  $("#cartTotal").textContent = money(sum);

  const box = $("#cartItems"), list = entries();
  if (!list.length) {
    box.innerHTML = `<p class="cart__empty">Пока пусто.<br>Выберите что-нибудь с мангала.</p>`;
    $("#checkoutBtn").disabled = true;
  } else {
    $("#checkoutBtn").disabled = left > 0;
    box.innerHTML = "";
    list.forEach(({ item, qty }) => {
      const r = document.createElement("div"); r.className = "ln";
      r.innerHTML = `
        <img class="ln__ph" src="${item.img}" alt="" onerror="this.style.visibility='hidden'">
        <div class="ln__bd">
          <div class="ln__nm">${item.name}</div>
          ${item.weight ? `<div class="ln__w">${item.weight}</div>` : ""}
          <div class="ln__qty">
            <button class="q" data-id="${item.id}" data-d="-1" aria-label="Меньше">−</button>
            <span>${qty}</span>
            <button class="q" data-id="${item.id}" data-d="1" aria-label="Больше">+</button>
            <button class="ln__x" data-id="${item.id}" aria-label="Удалить">Убрать</button>
          </div>
        </div>
        <div class="ln__pr">${money(item.price * qty)}</div>`;
      box.appendChild(r);
    });
    box.querySelectorAll(".q").forEach((b) => b.onclick = () => { changeQty(+b.dataset.id, +b.dataset.d); updateCart(); });
    box.querySelectorAll(".ln__x").forEach((b) => b.onclick = () => { removeItem(+b.dataset.id); updateCart(); });
  }

  /* Сколько осталось добрать до минимума — считаем сразу, а не в момент отказа. */
  const hint = $("#minHint");
  if (!list.length) { hint.hidden = true; }
  else if (left > 0) {
    hint.hidden = false; hint.className = "hint hint--no";
    hint.innerHTML = `До минимального заказа в район «${z.name}» не хватает <b>${money(left)}</b>`;
  } else {
    hint.hidden = false; hint.className = "hint hint--ok";
    hint.innerHTML = `Минимум для района «${z.name}» набран`;
  }

  const notice = $("#hoursNotice");
  if (notice) notice.hidden = isOpenNow();
}

function renderZones() {
  const sel = $("#zoneSelect"); if (!sel) return;
  sel.innerHTML = ZONES.map((z) => `<option value="${z.id}">${z.name} — от ${z.min} ₽</option>`).join("");
  sel.value = zone;
  sel.onchange = () => { zone = sel.value; localStorage.setItem("kovcheg_zone", zone); updateCart(); };
}

const openCart = () => { $("#cart").classList.add("on"); $("#overlay").classList.add("on"); };
const closeCart = () => { $("#cart").classList.remove("on"); $("#overlay").classList.remove("on"); };
const openOrder = () => {
  $("#orderTotal").textContent = money(total());
  $("#orderWhen").textContent = isOpenNow()
    ? "Привезём в течение 90 минут"
    : `Кухня откроется в ${OPEN_H}:00 — заказ примем первым и привезём к открытию`;
  $("#orderForm").hidden = false; $("#orderSuccess").hidden = true;
  $("#orderModal").classList.add("on");
};
const closeOrder = () => $("#orderModal").classList.remove("on");

document.addEventListener("DOMContentLoaded", () => {
  renderFilters(); renderMenu(); renderZones(); updateCart();
  $("#cartBtn").onclick = openCart;
  $("#cartClose").onclick = closeCart;
  $("#overlay").onclick = closeCart;
  $("#checkoutBtn").onclick = () => { if (count() > 0) { closeCart(); openOrder(); } };
  $("#orderClose").onclick = closeOrder;
  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    $("#successText").textContent = isOpenNow()
      ? "Уже передали на мангал. Курьер позвонит перед выездом."
      : `Заказ принят как предзаказ — приготовим к ${OPEN_H}:00.`;
    cart = {}; save(); updateCart(); renderMenu();
    $("#orderForm").hidden = true; $("#orderSuccess").hidden = false; e.target.reset();
  };
  $("#successClose").onclick = closeOrder;
});
