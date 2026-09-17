// data.js — меню «Ковчег». Снято с dostavka-shashlyk-shaurma.ru 17.09.2026.
// Цены и наличие — как на сайте заведения на дату съёмки.
const CATEGORIES = ["Все", "Шашлык", "Шаурма", "Люля-кебаб", "Бургеры", "Гарниры", "Сеты", "Выпечка", "Соусы", "Напитки"];
const MENU = [
 {
  "id": 1,
  "cat": "Шашлык",
  "name": "Шашлык из свиной шейки",
  "price": 180,
  "weight": "100 г",
  "img": "assets/food/c139a88031.jpg",
  "sold": false
 },
 {
  "id": 2,
  "cat": "Шашлык",
  "name": "Шашлык куриное филе",
  "price": 160,
  "weight": "100 г",
  "img": "assets/food/3cfbaca9ea.jpg",
  "sold": false
 },
 {
  "id": 3,
  "cat": "Шашлык",
  "name": "Шашлык из баранины",
  "price": 280,
  "weight": "100 г",
  "img": "assets/food/f606d31e60.jpg",
  "sold": true
 },
 {
  "id": 4,
  "cat": "Шашлык",
  "name": "Шашлык свиной карбонат",
  "price": 160,
  "weight": "100 г",
  "img": "assets/food/c14120c782.jpg",
  "sold": false
 },
 {
  "id": 5,
  "cat": "Шашлык",
  "name": "Форель на мангале",
  "price": 2600,
  "weight": "1000 г",
  "img": "assets/food/79a21b64dc.jpg",
  "sold": false
 },
 {
  "id": 6,
  "cat": "Шашлык",
  "name": "Куриные крылья",
  "price": 170,
  "weight": "100 г",
  "img": "assets/food/c44b8b4c8b.jpg",
  "sold": false
 },
 {
  "id": 7,
  "cat": "Шашлык",
  "name": "Голень куриная",
  "price": 129,
  "weight": "100 г",
  "img": "assets/food/b50214ab52.jpg",
  "sold": false
 },
 {
  "id": 8,
  "cat": "Шашлык",
  "name": "Свинина на кости",
  "price": 639,
  "weight": "300 г",
  "img": "assets/food/0004126648.jpg",
  "sold": true
 },
 {
  "id": 9,
  "cat": "Шаурма",
  "name": "Шаурма свинина STANDART",
  "price": 330,
  "weight": "",
  "img": "assets/food/bdb9d0b7ef.jpg",
  "sold": false
 },
 {
  "id": 10,
  "cat": "Шаурма",
  "name": "Шаурма курица STANDART",
  "price": 330,
  "weight": "",
  "img": "assets/food/724be06390.jpg",
  "sold": false
 },
 {
  "id": 11,
  "cat": "Шаурма",
  "name": "Шаурма свинина Mini",
  "price": 260,
  "weight": "",
  "img": "assets/food/bdb9d0b7ef.jpg",
  "sold": false
 },
 {
  "id": 12,
  "cat": "Шаурма",
  "name": "Шаурма курица Mini",
  "price": 260,
  "weight": "",
  "img": "assets/food/724be06390.jpg",
  "sold": false
 },
 {
  "id": 13,
  "cat": "Шаурма",
  "name": "Шаурма свинина MAX",
  "price": 420,
  "weight": "",
  "img": "assets/food/bdb9d0b7ef.jpg",
  "sold": false
 },
 {
  "id": 14,
  "cat": "Шаурма",
  "name": "Шаурма курица MAX",
  "price": 420,
  "weight": "",
  "img": "assets/food/724be06390.jpg",
  "sold": false
 },
 {
  "id": 15,
  "cat": "Шаурма",
  "name": "Шаурма вегетарианская",
  "price": 280,
  "weight": "",
  "img": "assets/food/80864cec3a.jpg",
  "sold": false
 },
 {
  "id": 16,
  "cat": "Шаурма",
  "name": "Донар со свининой",
  "price": 350,
  "weight": "",
  "img": "assets/food/807f0dbe81.jpg",
  "sold": false
 },
 {
  "id": 17,
  "cat": "Шаурма",
  "name": "Донар с курицей",
  "price": 350,
  "weight": "",
  "img": "assets/food/4aed812d53.jpg",
  "sold": false
 },
 {
  "id": 18,
  "cat": "Шаурма",
  "name": "Бртуч со свининой",
  "price": 360,
  "weight": "",
  "img": "assets/food/fe4fdd45da.jpg",
  "sold": false
 },
 {
  "id": 19,
  "cat": "Шаурма",
  "name": "Бртуч с курицей",
  "price": 360,
  "weight": "",
  "img": "assets/food/fe4fdd45da.jpg",
  "sold": false
 },
 {
  "id": 20,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб из курицы",
  "price": 300,
  "weight": "160 г",
  "img": "assets/food/c32a689ff9.jpg",
  "sold": false
 },
 {
  "id": 21,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб из телятины",
  "price": 350,
  "weight": "160 г",
  "img": "assets/food/2fef7050ce.jpg",
  "sold": false
 },
 {
  "id": 22,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб из баранины",
  "price": 420,
  "weight": "160 г",
  "img": "assets/food/eadefa0a4b.jpg",
  "sold": true
 },
 {
  "id": 23,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб в лаваше, курица",
  "price": 450,
  "weight": "",
  "img": "assets/food/edc570be11.jpg",
  "sold": false
 },
 {
  "id": 24,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб в лаваше, баранина",
  "price": 550,
  "weight": "",
  "img": "assets/food/c82071e518.jpg",
  "sold": false
 },
 {
  "id": 25,
  "cat": "Люля-кебаб",
  "name": "Люля-кебаб в лаваше, телятина",
  "price": 500,
  "weight": "",
  "img": "assets/food/9e1c1bd08b.jpg",
  "sold": false
 },
 {
  "id": 26,
  "cat": "Бургеры",
  "name": "Бургер «Ной»",
  "price": 480,
  "weight": "550 г",
  "img": "assets/food/3c6cf18563.jpg",
  "sold": false
 },
 {
  "id": 27,
  "cat": "Бургеры",
  "name": "Бургер с курицей и сыром",
  "price": 320,
  "weight": "320 г",
  "img": "assets/food/d3d02eea09.jpg",
  "sold": false
 },
 {
  "id": 28,
  "cat": "Бургеры",
  "name": "Бургер с курицей",
  "price": 280,
  "weight": "300 г",
  "img": "assets/food/df8d05f97c.jpg",
  "sold": false
 },
 {
  "id": 29,
  "cat": "Бургеры",
  "name": "Бургер с говядиной",
  "price": 330,
  "weight": "300 г",
  "img": "assets/food/64829564fb.jpg",
  "sold": false
 },
 {
  "id": 30,
  "cat": "Бургеры",
  "name": "Бургер с говядиной и сыром",
  "price": 370,
  "weight": "320 г",
  "img": "assets/food/7c49bb852f.jpg",
  "sold": false
 },
 {
  "id": 31,
  "cat": "Гарниры",
  "name": "Картофель фри",
  "price": 100,
  "weight": "100 г",
  "img": "assets/food/1cfa89633b.jpg",
  "sold": false
 },
 {
  "id": 32,
  "cat": "Гарниры",
  "name": "Картофель на мангале",
  "price": 100,
  "weight": "100 г",
  "img": "assets/food/9c16e12c58.jpg",
  "sold": false
 },
 {
  "id": 33,
  "cat": "Гарниры",
  "name": "Шампиньоны на мангале",
  "price": 150,
  "weight": "100 г",
  "img": "assets/food/a5b810fc5f.jpg",
  "sold": false
 },
 {
  "id": 34,
  "cat": "Гарниры",
  "name": "Сезонные овощи на мангале",
  "price": 480,
  "weight": "300 г",
  "img": "assets/food/86a07436ad.jpg",
  "sold": false
 },
 {
  "id": 35,
  "cat": "Гарниры",
  "name": "Куриные наггетсы",
  "price": 150,
  "weight": "6 шт",
  "img": "assets/food/e80a772b14.jpg",
  "sold": false
 },
 {
  "id": 36,
  "cat": "Сеты",
  "name": "Сет на 10 человек",
  "price": 7930,
  "weight": "5500 г",
  "img": "assets/food/155a24d7d2.jpg",
  "sold": false
 },
 {
  "id": 37,
  "cat": "Сеты",
  "name": "Сет на 5 человек",
  "price": 2890,
  "weight": "2200 г",
  "img": "assets/food/04e9b70b75.jpg",
  "sold": false
 },
 {
  "id": 38,
  "cat": "Сеты",
  "name": "Сет на троих",
  "price": 1790,
  "weight": "1250 г",
  "img": "assets/food/b5e27dfbac.jpg",
  "sold": false
 },
 {
  "id": 39,
  "cat": "Сеты",
  "name": "Сет люля",
  "price": 2340,
  "weight": "1350 г",
  "img": "assets/food/bb73b8bf9b.jpg",
  "sold": false
 },
 {
  "id": 40,
  "cat": "Сеты",
  "name": "Сет вегетарианский",
  "price": 1880,
  "weight": "1400 г",
  "img": "assets/food/84f84c298c.jpg",
  "sold": false
 },
 {
  "id": 41,
  "cat": "Выпечка",
  "name": "Лепёшка тандыр",
  "price": 100,
  "weight": "",
  "img": "assets/food/0b1b2a5bea.jpg",
  "sold": false
 },
 {
  "id": 42,
  "cat": "Выпечка",
  "name": "Самса с курицей",
  "price": 200,
  "weight": "",
  "img": "assets/food/ca2ab87762.jpg",
  "sold": false
 },
 {
  "id": 43,
  "cat": "Выпечка",
  "name": "Беляш",
  "price": 200,
  "weight": "",
  "img": "assets/food/0c52de601c.jpg",
  "sold": false
 },
 {
  "id": 44,
  "cat": "Выпечка",
  "name": "Чебурек",
  "price": 250,
  "weight": "",
  "img": "assets/food/dee5e1d972.jpg",
  "sold": false
 },
 {
  "id": 45,
  "cat": "Выпечка",
  "name": "Лаваш",
  "price": 50,
  "weight": "",
  "img": "assets/food/b3c34a3190.jpg",
  "sold": false
 },
 {
  "id": 46,
  "cat": "Соусы",
  "name": "Шашлычный соус красный",
  "price": 100,
  "weight": "",
  "img": "assets/food/79829fce67.jpg",
  "sold": false
 },
 {
  "id": 47,
  "cat": "Соусы",
  "name": "Чесночный соус белый",
  "price": 100,
  "weight": "",
  "img": "assets/food/79829fce67.jpg",
  "sold": false
 },
 {
  "id": 48,
  "cat": "Соусы",
  "name": "Кисло-сладкий соус",
  "price": 100,
  "weight": "",
  "img": "assets/food/79829fce67.jpg",
  "sold": false
 },
 {
  "id": 49,
  "cat": "Соусы",
  "name": "Сырный соус",
  "price": 100,
  "weight": "",
  "img": "assets/food/79829fce67.jpg",
  "sold": false
 },
 {
  "id": 50,
  "cat": "Соусы",
  "name": "Аджика острая",
  "price": 100,
  "weight": "",
  "img": "assets/food/79829fce67.jpg",
  "sold": false
 },
 {
  "id": 51,
  "cat": "Напитки",
  "name": "Evervess 0,3",
  "price": 100,
  "weight": "",
  "img": "assets/food/3f2a97b34e.jpg",
  "sold": false
 },
 {
  "id": 52,
  "cat": "Напитки",
  "name": "Evervess 0,5",
  "price": 130,
  "weight": "",
  "img": "assets/food/ff921b7fd5.jpg",
  "sold": false
 },
 {
  "id": 53,
  "cat": "Напитки",
  "name": "Evervess 1 л",
  "price": 160,
  "weight": "",
  "img": "assets/food/ff921b7fd5.jpg",
  "sold": false
 },
 {
  "id": 54,
  "cat": "Напитки",
  "name": "Фрустайл 0,3",
  "price": 100,
  "weight": "",
  "img": "assets/food/0d2281d613.jpg",
  "sold": false
 },
 {
  "id": 55,
  "cat": "Напитки",
  "name": "Фрустайл 0,5",
  "price": 130,
  "weight": "",
  "img": "assets/food/3590daee52.jpg",
  "sold": false
 },
 {
  "id": 56,
  "cat": "Напитки",
  "name": "Фрустайл 1 л, апельсин",
  "price": 160,
  "weight": "",
  "img": "assets/food/4a0c933874.jpg",
  "sold": false
 },
 {
  "id": 57,
  "cat": "Напитки",
  "name": "Фрустайл в ассортименте",
  "price": 100,
  "weight": "385 мл",
  "img": "assets/food/8de262c7b0.jpg",
  "sold": false
 },
 {
  "id": 58,
  "cat": "Напитки",
  "name": "Бардзими",
  "price": 120,
  "weight": "",
  "img": "assets/food/2eb48a5213.jpg",
  "sold": false
 },
 {
  "id": 59,
  "cat": "Напитки",
  "name": "Липтон 0,5 чёрный",
  "price": 120,
  "weight": "",
  "img": "assets/food/9e6f7ead6a.jpg",
  "sold": false
 },
 {
  "id": 60,
  "cat": "Напитки",
  "name": "Липтон 0,5 зелёный",
  "price": 120,
  "weight": "",
  "img": "assets/food/e3cfb9bb64.jpg",
  "sold": false
 },
 {
  "id": 61,
  "cat": "Напитки",
  "name": "Сок «Любимый» 0,3",
  "price": 80,
  "weight": "",
  "img": "assets/food/38fdd56b84.jpg",
  "sold": false
 },
 {
  "id": 62,
  "cat": "Напитки",
  "name": "Вода «Аква Минерале» 0,5",
  "price": 100,
  "weight": "",
  "img": "assets/food/0e77a0c05d.jpg",
  "sold": false
 }
];
