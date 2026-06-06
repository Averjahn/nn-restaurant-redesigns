// CuPPcake — полезные торты и десерты без сахара (Нижний Новгород). Данные/фото с сайта cuppcake.ru.
const CATEGORIES = ["Все", "Торты", "Чизкейки", "Бенто-торты", "Порционные десерты", "Веган"];

const MENU = [
  // — Торты —
  { id:1, name:"Сникерс", cat:"Торты", price:300, desc:"2300₽ кг. / 300₽ шт.", img:"images/af7cc68aa408.webp" },
  { id:2, name:"Прага", cat:"Торты", price:300, desc:"2300₽ кг. / 300₽ шт.", img:"images/a58633096265.webp" },
  { id:3, name:"Ферерро Роше", cat:"Торты", price:330, desc:"2300₽ кг. / 330₽ шт.", img:"images/2b44ab4a17cd.webp" },
  { id:4, name:"Молочный ломтик", cat:"Торты", price:300, desc:"2300₽ кг. / 300₽ шт.", img:"images/12ca8cf12049.webp" },
  { id:5, name:"Банан-шоколад", cat:"Торты", price:320, desc:"2300₽ кг. / 320₽ шт.", img:"images/3e7544e8253b.webp" },
  { id:6, name:"Шоколадный медовик с вишней", cat:"Торты", price:330, desc:"2300₽ кг. / 330₽ шт.", img:"images/6ff728fef973.webp" },
  { id:7, name:"Груша Бри Фундук", cat:"Торты", price:330, desc:"2300₽ кг. / 330₽ шт.", img:"images/4bac6ad3da53.webp" },
  { id:8, name:"Торт Манго-апельсин", cat:"Торты", price:350, desc:"2500₽ кг. / 350₽ шт.", img:"images/434b0a8f27ed.webp" },
  { id:9, name:"Торт Шоколад-ананас", cat:"Торты", price:350, desc:"2500₽ кг. / 350₽ шт.", img:"images/bc1d740c4349.webp" },
  { id:10, name:"ТОРТ - КОНСТРУКТОР", cat:"Торты", price:2500, desc:"2500₽ кг.", img:"images/621c37acce66.webp" },
  { id:11, name:"Торт Птичье молоко", cat:"Торты", price:350, desc:"2500₽ кг. / 350₽ шт.", img:"images/34f10f7f4d0d.webp" },
  { id:12, name:"Raw cake малина - кешью - лайм", cat:"Торты", price:350, desc:"2500₽ кг. / 350₽ шт.", img:"images/9166b01001b6.webp" },
  { id:13, name:"Свадебные торты", cat:"Торты", price:2500, desc:"2500₽ кг.", img:"images/4ca3f90965cd.webp" },
  { id:14, name:"Клубника-банан", cat:"Торты", price:300, desc:"2300₽ кг. / 300₽ шт.", img:"images/e251a27bff7a.webp" },
  { id:15, name:"Детские декоры", cat:"Торты", price:2200, desc:"2200₽ кг.", img:"images/61ed7ac08c2b.webp" },
  { id:16, name:"Торт Мамуле", cat:"Торты", price:3500, desc:"3500₽ шт.", img:"images/37b3511cbbeb.webp" },
  { id:17, name:"Торт Бабочка", cat:"Торты", price:3500, desc:"3500₽ шт.", img:"images/03f3e307aad6.webp" },
  { id:18, name:"Ягодный декор", cat:"Торты", price:2500, desc:"2500₽ кг.", img:"images/4dc0c5048a1d.webp" },
  { id:19, name:"Шоколадный велюр", cat:"Торты", price:2500, desc:"2500₽ кг.", img:"images/c2c3bf21a30a.webp" },
  { id:20, name:"Цветочный декор", cat:"Торты", price:500, desc:"500₽ шт.", img:"images/f7a68df3a492.webp" },
  { id:21, name:"Тортик с рисунком", cat:"Торты", price:300, desc:"300₽ шт.", img:"images/e3082eea90b4.webp" },
  { id:22, name:"Моти", cat:"Торты", price:190, desc:"190₽ шт.", img:"images/6c4008909f5e.webp" },
  { id:23, name:"Сырок творожный", cat:"Торты", price:280, desc:"280₽ шт.", img:"images/306aedde00cf.webp" },
  { id:24, name:"Эскимо картошка", cat:"Торты", price:280, desc:"280₽ шт.", img:"images/11eeb7ecd270.webp" },
  { id:25, name:"Сникерс", cat:"Торты", price:4000, desc:"4000₽", img:"images/af7cc68aa408.webp" },
  { id:26, name:"Кофейное зерно", cat:"Торты", price:500, desc:"500₽", img:"images/8b282d421856.webp" },
  // — Чизкейки —
  { id:27, name:"Классический чизкейк", cat:"Чизкейки", price:280, desc:"2000₽ кг. / 280₽ шт.", img:"images/2e3f58c6191b.webp" },
  { id:28, name:"Фисташковый чизкейк", cat:"Чизкейки", price:300, desc:"2200₽ кг. / 300₽ шт.", img:"images/b5f221407000.webp" },
  { id:29, name:"Кокосовый чизкейк", cat:"Чизкейки", price:280, desc:"2000₽ кг. / 280₽ шт.", img:"images/9402e83e7edf.webp" },
  { id:30, name:"Чизкейк Сникерс", cat:"Чизкейки", price:320, desc:"2300₽ кг. / 320₽ шт.", img:"images/b65de6bb2c7e.webp" },
  { id:31, name:"Ягодный чизкейк", cat:"Чизкейки", price:290, desc:"2200₽ кг. / 290₽ шт.", img:"images/25ff436415a9.webp" },
  { id:32, name:"Чизкейк Груша-Дорблю", cat:"Чизкейки", price:300, desc:"2200₽ кг. / 300₽ шт.", img:"images/a5eb3859a8d5.webp" },
  { id:33, name:"Чизкейки в баночках", cat:"Чизкейки", price:300, desc:"300₽ шт.", img:"images/b622639b8aa0.webp" },
  { id:34, name:"Эсимо тропический чизкейк", cat:"Чизкейки", price:280, desc:"280₽ шт.", img:"images/ce3e26b8629b.webp" },
  // — Бенто-торты —
  { id:35, name:"Бенто тортик", cat:"Бенто-торты", price:1700, desc:"1700₽ шт.", img:"images/d9ea8ab65389.webp" },
  { id:36, name:"Веган бенто тортик", cat:"Бенто-торты", price:1800, desc:"1800₽ шт.", img:"images/52a1561f15af.webp" },
  // — Порционные десерты —
  { id:37, name:"Трайфлы", cat:"Порционные десерты", price:280, desc:"280₽ шт.", img:"images/31bb48dde876.webp" },
  { id:38, name:"Меренговый рулет", cat:"Порционные десерты", price:350, desc:"2800₽ кг. / 350₽ шт.", img:"images/00d83360f9a8.webp" },
  { id:39, name:"Эклеры", cat:"Порционные десерты", price:220, desc:"220₽ шт.", img:"images/ff723122ddde.webp" },
  // — Веган —
  { id:40, name:"Веган тарт Банофи", cat:"Веган", price:350, desc:"350₽ шт.", img:"images/d747899475e6.webp" },
  { id:41, name:"Веган сырки", cat:"Веган", price:270, desc:"270₽ шт.", img:"images/1d9f1424626d.webp" },
  { id:42, name:"Веган вишня-шоколад", cat:"Веган", price:320, desc:"320₽ шт.", img:"images/397aa432aaab.webp" },
  { id:43, name:"Веган кекс &quot;груша-миндаль&quot;", cat:"Веган", price:350, desc:"350₽ шт.", img:"images/443bb7e60e1e.webp" },
  { id:44, name:"Веган брауни", cat:"Веган", price:320, desc:"320₽ шт.", img:"images/cd93e075ba6d.webp" },
];
