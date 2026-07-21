// Coffee Molly — кофейня и школа бариста (Нижний Новгород).
// Реальные позиции/цены и фото — с карточки заведения на Яндекс.Картах.
const CATEGORIES = ["Все", "Кофе", "Не кофе", "Десерты"];

const PH = {
  cappuccino: "images/677db856cf85.jpg",
  americano:  "images/b2c5d079119d.jpg",
  bumble:     "images/3b9fc17fa397.jpg",
  latte:      "images/c3b395ca69fa.jpg",
  shake:      "images/809a487b19b4.jpg",
  snickers:   "images/eb3f7f4a1331.jpg",
  espresso:   "images/menu-espresso.jpg",
  raf:        "images/menu-raf.jpg",
  cocoa:      "images/menu-cocoa.jpg",
  hotchoc:    "images/menu-hotchoc.jpg",
  matcha:     "images/menu-matcha.jpg",
  baklava:    "images/menu-baklava.jpg",
  cheesecake: "images/menu-cheesecake.jpg",
};

const MENU = [
  // — Кофе —
  { id: 1, name: "Эспрессо",        cat: "Кофе", price: 120, desc: "Классический крепкий эспрессо из свежеобжаренного зерна", img: PH.espresso },
  { id: 2, name: "Американо",       cat: "Кофе", price: 180, desc: "Эспрессо с горячей водой — мягкий вкус и аромат", img: PH.americano },
  { id: 3, name: "Капучино",        cat: "Кофе", price: 210, desc: "Эспрессо, молоко и нежная бархатная пенка с латте-артом", img: PH.cappuccino },
  { id: 4, name: "Латте",           cat: "Кофе", price: 220, desc: "Много молока, мягкий кофейный вкус и красивые слои", img: PH.latte },
  { id: 5, name: "Флэт-уайт",       cat: "Кофе", price: 230, desc: "Двойной эспрессо и тонкий слой молочной микропенки", img: PH.latte },
  { id: 6, name: "Раф ванильный",   cat: "Кофе", price: 250, desc: "Эспрессо, сливки и ваниль, взбитые в нежный напиток", img: PH.raf },
  { id: 7, name: "Бамбл-кофе",      cat: "Кофе", price: 220, desc: "Эспрессо с апельсиновым соком и льдом — летняя классика", img: PH.bumble },

  // — Не кофе —
  { id: 8,  name: "Какао",                    cat: "Не кофе", price: 190, desc: "Горячее какао на молоке — как в детстве", img: PH.cocoa },
  { id: 9,  name: "Горячий шоколад с маршмеллоу", cat: "Не кофе", price: 220, desc: "Густой шоколад с воздушными маршмеллоу", img: PH.hotchoc },
  { id: 10, name: "Матча-латте",              cat: "Не кофе", price: 260, desc: "Японский чай матча на молоке, мягкий и бодрящий", img: PH.matcha },
  { id: 11, name: "Молочный коктейль",        cat: "Не кофе", price: 180, desc: "Классический молочный коктейль с мороженым", img: PH.shake },

  // — Десерты —
  { id: 12, name: "Кофе-десерт «Сникерс»", cat: "Десерты", price: 350, desc: "Авторский кофейный десерт со вкусом Сникерса", img: PH.snickers },
  { id: 13, name: "Восточная пахлава",     cat: "Десерты", price: 150, desc: "Медовая пахлава с орехами — идеально к кофе", img: PH.baklava },
  { id: 14, name: "Чизкейк",               cat: "Десерты", price: 280, desc: "Нежный чизкейк на песочной основе", img: PH.cheesecake },
];
