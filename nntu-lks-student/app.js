/* ============ НГТУ · ЛКС — интерактив редизайна ============ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------- тема */
  var themeBtn = $('#themeBtn');
  var saved = null;
  try { saved = localStorage.getItem('nntu-theme'); } catch (e) {}
  if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) saved = 'dark';
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('nntu-theme', next); } catch (e) {}
  });

  /* ---------------------------------------------------- бургер */
  var burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('nav--open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------------------------------------------------- тост */
  var toast = $('#toast'), toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2400);
  }
  function copyText(text, okMsg) {
    var done = function () { showToast(okMsg || 'Скопировано'); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { showToast('Не удалось скопировать'); }
      document.body.removeChild(ta);
    }
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (btn) copyText(btn.getAttribute('data-copy'), 'Адрес скопирован');
  });

  /* ---------------------------------------------------- статус поддержки (МСК) */
  function supportStatus() {
    // Приводим текущее время к московскому (UTC+3) независимо от часового пояса устройства.
    var now = new Date();
    var msk = new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000);
    var day = msk.getDay();               // 0 — воскресенье
    var mins = msk.getHours() * 60 + msk.getMinutes();
    var from = 8 * 60 + 30, to = 17 * 60;
    var workday = day >= 1 && day <= 5;
    var open = workday && mins >= from && mins < to;
    var text;
    if (open) {
      var left = to - mins;
      text = 'Сейчас работает · до 17:00 (' + (left >= 60 ? Math.floor(left / 60) + ' ч ' : '') + (left % 60) + ' мин)';
    } else if (workday && mins < from) {
      text = 'Закрыто · откроется сегодня в 8:30';
    } else {
      var names = ['в понедельник', 'завтра', 'завтра', 'завтра', 'завтра', 'в понедельник', 'в понедельник'];
      text = 'Закрыто · откроется ' + (workday && mins >= to && day < 5 ? 'завтра' : names[day]) + ' в 8:30';
    }
    [['#statusDot', '#statusText'], ['#statusDot2', '#statusText2']].forEach(function (pair) {
      var dot = $(pair[0]), txt = $(pair[1]);
      if (!dot) return;
      dot.className = 'dot ' + (open ? 'dot--on' : 'dot--off');
      txt.textContent = text;
    });
  }
  supportStatus();
  setInterval(supportStatus, 30000);

  /* ---------------------------------------------------- scroll-spy + TOC */
  var sections = $$('main .section');
  var tocLinks = $$('#tocList a');
  var navLinks = $$('#nav a');
  function spy() {
    var pos = window.scrollY + 140, current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
    var id = '#' + current.id;
    tocLinks.concat(navLinks).forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === id);
    });
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { spy(); ticking = false; });
  }, { passive: true });
  spy();

  /* ---------------------------------------------------- лайтбокс */
  var lb = $('#lightbox'), lbImg = $('#lightboxImg');
  $$('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.getAttribute('data-img');
      lbImg.alt = btn.getAttribute('data-cap') || '';
      lb.classList.add('is-open');
      $('#lightboxClose').focus();
    });
  });
  function closeLb() { lb.classList.remove('is-open'); }
  $('#lightboxClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ---------------------------------------------------- проверка пароля */
  var pw = $('#pw'), meter = $('#pwMeter'), label = $('#pwLabel');
  var BANNED = ['user', 'эвм', 'лвс', 'password', 'пароль', 'qwerty', 'йцукен', 'admin', 'nntu', 'нгту',
                'student', 'студент', '12345', 'ivanov', 'иванов', 'petrov', 'петров', 'sidorov'];

  function checkPassword(v) {
    var lower = v.toLowerCase();
    var digitsOnly = v.replace(/\D/g, '');
    return {
      len: v.length >= 8,
      upper: /[A-ZА-ЯЁ]/.test(v),
      lower: /[a-zа-яё]/.test(v),
      digsym: /[0-9]/.test(v) || /[^0-9A-Za-zА-Яа-яЁё]/.test(v),
      common: v.length > 0 && !BANNED.some(function (b) { return lower.indexOf(b) !== -1; }) && !/^(.)\1+$/.test(v)
              && !/(012|123|234|345|456|567|678|789)/.test(v) && !/(abc|abv|абв)/.test(lower),
      date: v.length > 0
            && !/(19|20)\d{2}/.test(v)                       // год рождения
            && !/\b\d{2}[.\-/]?\d{2}[.\-/]?\d{2,4}\b/.test(v) // дата
            && digitsOnly.length < 7                          // номер телефона
    };
  }

  function renderPassword() {
    var v = pw.value;
    var res = checkPassword(v);
    var passed = 0, total = 0;

    $$('#pwRules li').forEach(function (li) {
      var key = li.getAttribute('data-rule');
      total++;
      li.classList.remove('ok', 'bad');
      var mark = li.querySelector('.rmark');
      if (!v) { mark.textContent = '•'; return; }
      if (res[key]) { li.classList.add('ok'); mark.textContent = '✓'; passed++; }
      else { li.classList.add('bad'); mark.textContent = '✕'; }
    });

    if (!v) {
      meter.style.width = '0'; label.textContent = 'Надёжность: —';
      label.style.color = 'var(--text-muted)'; return;
    }

    // шкала: пока хоть одно требование не выполнено — не выше половины
    var score, color, text;
    if (passed < total) {
      score = 0.12 + 0.38 * (passed / total);
      color = 'var(--red-600)';
      text = 'Не соответствует требованиям (' + passed + ' из ' + total + ')';
    } else {
      score = 0.72;
      if (v.length >= 12) score += 0.14;
      if (v.length >= 16) score += 0.14;
      if (score < 0.85) { color = 'var(--amber-600)'; text = 'Подходит, но можно надёжнее — добавьте длины'; }
      else { color = 'var(--green-600)'; text = 'Отличный пароль — соответствует требованиям'; }
    }

    meter.style.width = Math.round(score * 100) + '%';
    meter.style.background = color;
    label.style.color = color;
    label.textContent = 'Надёжность: ' + text;
  }
  pw.addEventListener('input', renderPassword);
  renderPassword();

  $('#pwToggle').addEventListener('click', function () {
    var shown = pw.type === 'text';
    pw.type = shown ? 'password' : 'text';
    this.setAttribute('aria-label', shown ? 'Показать пароль' : 'Скрыть пароль');
    this.textContent = shown ? '👁' : '🙈';
  });

  /* ---------------------------------------------------- мастер решения проблем */
  var wizBody = $('#wizBody'), wizProgress = $('#wizProgress');

  var LETTERS = {
    nomail: {
      to: 'lks.auth@nntu.ru',
      subject: 'Нет логина и пароля для доступа в ЛК студента',
      build: function (d) {
        return 'Здравствуйте!\n\n' +
          'После зачисления на указанный при поступлении e-mail не пришло письмо с логином и временным паролем для доступа в личный кабинет студента.\n\n' +
          'ФИО: ' + (d.fio || '—') + '\n' +
          'Учебная группа: ' + (d.group || '—') + '\n' +
          'E-mail, на который должно было прийти письмо: ' + (d.email || '—') + '\n' +
          (d.note ? '\nДополнительно: ' + d.note + '\n' : '') +
          '\nПрошу выслать данные для входа.\n\nС уважением,\n' + (d.fio || '');
      }
    },
    noauth: {
      to: 'lks.auth@nntu.ru',
      subject: 'Не удается авторизоваться в ЛК студента',
      build: function (d) {
        return 'Здравствуйте!\n\n' +
          'Не удаётся выполнить вход в личный кабинет студента. Логин и пароль проверены, восстановление пароля не помогло.\n\n' +
          'ФИО: ' + (d.fio || '—') + '\n' +
          'Учебная группа: ' + (d.group || '—') + '\n' +
          'E-mail: ' + (d.email || '—') + '\n' +
          'Описание проблемы: ' + (d.note || '—') + '\n\n' +
          'При необходимости приложу снимки экрана.\n\nС уважением,\n' + (d.fio || '');
      }
    },
    reset24: {
      to: 'lks.auth@nntu.ru',
      subject: 'Сброс пароля ЛК студента (e-mail изменён через дирекцию)',
      build: function (d) {
        return 'Здравствуйте!\n\n' +
          'E-mail в профиле студента был изменён сотрудником дирекции института. Самостоятельный сброс пароля пока недоступен, требуется получить логин, пароль и инструкцию.\n\n' +
          'ФИО: ' + (d.fio || '—') + '\n' +
          'Учебная группа: ' + (d.group || '—') + '\n' +
          'Новый e-mail: ' + (d.email || '—') + '\n' +
          (d.note ? 'Дополнительно: ' + d.note + '\n' : '') +
          '\nС уважением,\n' + (d.fio || '');
      }
    },
    support: {
      to: 'lks.support@nntu.ru',
      subject: 'Вопрос по работе личного кабинета студента',
      build: function (d) {
        return 'Здравствуйте!\n\n' +
          'Вопрос по работе личного кабинета студента.\n\n' +
          'ФИО: ' + (d.fio || '—') + '\n' +
          'Учебная группа: ' + (d.group || '—') + '\n' +
          'E-mail: ' + (d.email || '—') + '\n' +
          'Описание: ' + (d.note || '—') + '\n\n' +
          'С уважением,\n' + (d.fio || '');
      }
    }
  };

  var ANSWERS = {
    nomail: {
      title: 'Письмо с логином и паролем не пришло',
      steps: [
        'Проверьте папку «Спам» и вкладку «Промоакции» в почте, указанной при поступлении.',
        'Если вы первокурсник — доступ в ЛКС открывается <b>после 1 сентября</b>, письмо может ещё не быть активным.',
        'Напишите на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a> с темой «Нет логина и пароля для доступа в ЛК студента», указав ФИО, учебную группу и e-mail, на который должно было прийти письмо.',
        'Действуйте по инструкциям из ответного письма службы технической поддержки.'
      ],
      note: 'Писать нужно с актуального e-mail — того, что указан при поступлении или изменён через дирекцию института.',
      letter: 'nomail'
    },
    badpass: {
      title: 'Письмо пришло, но вход с временным паролем не работает',
      steps: [
        'Проверьте корректность логина и пароля: раскладку клавиатуры, Caps Lock, лишние пробелы при копировании.',
        'Нажмите «Восстановить пароль» на <a href="https://lks.nntu.ru" target="_blank" rel="noopener">lks.nntu.ru</a> — на почту, указанную при поступлении, придёт код подтверждения.',
        'Введите код и задайте новый пароль (проверить его можно <a href="#password">в разделе 3</a>).',
        'Если ошибка сохраняется — напишите на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a> с темой «Не удается авторизоваться в ЛК студента»: ФИО, группа, e-mail, описание проблемы и по возможности снимки экрана.'
      ],
      letter: 'noauth'
    },
    reset24: {
      title: 'E-mail меняли через дирекцию — сброс пароля не проходит',
      steps: [
        'После смены e-mail сотрудником дирекции самостоятельный сброс пароля становится доступен <b>через 24 часа</b>.',
        'Если ждать нельзя — напишите на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a>, вам вышлют логин, пароль и инструкцию.',
        'Письмо отправляйте с нового актуального адреса, указанного в дирекции.'
      ],
      letter: 'reset24'
    },
    academ: {
      title: 'Академический отпуск',
      steps: [
        'На время академического отпуска доступ к ЛКС блокируется — это штатное поведение.',
        'Доступ восстанавливается после выхода приказа о допуске к занятиям по окончании отпуска.',
        'Если приказ уже вышел, а вход не работает — напишите на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a>.'
      ],
      letter: 'noauth'
    },
    twogroups: {
      title: 'Несколько групп, смена направления или уровня подготовки',
      steps: [
        'Используйте логин, полученный при <b>первом</b> поступлении в НГТУ — новый при переводе или поступлении в магистратуру не выдаётся.',
        'Нужную учебную группу выбирают внутри личного кабинета.',
        'Если под старым логином вход не выполняется — напишите на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a>.'
      ],
      letter: 'noauth'
    },
    noemail: {
      title: 'Нет доступа к почте, указанной при поступлении',
      steps: [
        'Обратитесь в дирекцию своего института лично — со студенческим билетом, зачётной книжкой или паспортом для идентификации личности.',
        'Сотрудник дирекции изменит e-mail в вашем профиле.',
        'Самостоятельный сброс пароля с нового адреса заработает через 24 часа. Раньше — только письмом на <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a>.'
      ],
      note: 'Это единственный способ сменить e-mail: удалённо адрес не меняется.',
      letter: 'reset24'
    },
    inside: {
      title: 'Вход выполняется, но кабинет работает неправильно',
      steps: [
        'Такие вопросы решает поддержка самого кабинета: <a href="mailto:lks.support@nntu.ru">lks.support@nntu.ru</a>.',
        'В письме опишите, что именно не работает, укажите ФИО и учебную группу, приложите снимки экрана.',
        'Пишите с актуального e-mail — того, что указан в профиле студента.'
      ],
      letter: 'support'
    }
  };

  var STEP1 = [
    { key: 'a', ico: '📭', title: 'Не пришло письмо с логином и паролем', sub: 'После зачисления письма нет' },
    { key: 'b', ico: '🔐', title: 'Не получается войти', sub: 'Логин есть, но вход не проходит' },
    { key: 'c', ico: '✉️', title: 'Проблема с e-mail', sub: 'Нет доступа к почте или её меняли' },
    { key: 'd', ico: '⚙️', title: 'Вошёл, но кабинет работает не так', sub: 'Расписание, оценки, документы' }
  ];

  var STEP2 = {
    a: [
      { key: 'nomail', ico: '📮', title: 'Почта своя, доступ к ней есть', sub: 'Письмо просто не пришло' },
      { key: 'noemail', ico: '🚫', title: 'К указанной почте нет доступа', sub: 'Ящик утерян или неверный адрес' }
    ],
    b: [
      { key: 'badpass', ico: '⌨️', title: 'Ошибка при вводе логина/пароля', sub: 'Временный пароль не подходит' },
      { key: 'academ', ico: '🏖', title: 'Я в академическом отпуске', sub: 'Или недавно из него вышел' },
      { key: 'twogroups', ico: '🎓', title: 'Учусь в двух группах / сменил уровень', sub: 'Бакалавриат → магистратура, перевод' }
    ],
    c: [
      { key: 'noemail', ico: '🚫', title: 'Нужно сменить e-mail', sub: 'Нет доступа к старому адресу' },
      { key: 'reset24', ico: '⏳', title: 'E-mail уже сменили в дирекции', sub: 'Сброс пароля не проходит' }
    ],
    d: [
      { key: 'inside', ico: '🛠', title: 'Ошибки внутри кабинета', sub: 'Данные, разделы, функции' }
    ]
  };

  var wizState = { step: 1, branch: null, answer: null };

  function optionsHTML(list) {
    return '<div class="wizard-options">' + list.map(function (o) {
      return '<button class="wizard-option" data-key="' + o.key + '">' +
        '<span class="o-ico" aria-hidden="true">' + o.ico + '</span>' +
        '<span class="o-txt"><b>' + o.title + '</b><span>' + o.sub + '</span></span>' +
        '<span aria-hidden="true">→</span></button>';
    }).join('') + '</div>';
  }

  function renderWizard() {
    if (wizState.step === 1) {
      wizProgress.textContent = 'Шаг 1 из 2';
      wizBody.innerHTML = '<p class="wizard-q">С чем именно возникла проблема?</p>' + optionsHTML(STEP1);
    } else if (wizState.step === 2) {
      wizProgress.textContent = 'Шаг 2 из 2';
      wizBody.innerHTML = '<p class="wizard-q">Уточните ситуацию</p>' + optionsHTML(STEP2[wizState.branch]) +
        '<div class="wizard-nav"><button class="btn btn-outline btn-sm" data-wiz="back">← Назад</button></div>';
    } else {
      var a = ANSWERS[wizState.answer];
      var tpl = LETTERS[a.letter];
      wizProgress.textContent = 'Решение';
      wizBody.innerHTML =
        '<div class="wizard-answer">' +
          '<h3>' + a.title + '</h3>' +
          '<ol>' + a.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' +
          (a.note ? '<div class="callout callout--info"><span aria-hidden="true">ℹ️</span><div><p>' + a.note + '</p></div></div>' : '') +
          '<div class="letter">' +
            '<div class="letter-head"><span>Готовое письмо → ' + tpl.to + '</span><span>Тема: «' + tpl.subject + '»</span></div>' +
            '<div class="letter-body">' +
              '<div class="fields-2">' +
                '<div class="field"><label for="lFio">ФИО полностью</label><input id="lFio" placeholder="Иванов Иван Иванович"></div>' +
                '<div class="field"><label for="lGroup">Учебная группа</label><input id="lGroup" placeholder="16-В-1"></div>' +
              '</div>' +
              '<div class="field"><label for="lEmail">Ваш e-mail (указанный при поступлении)</label><input id="lEmail" type="email" placeholder="student@example.ru"></div>' +
              '<div class="field"><label for="lNote">Что произошло (необязательно)</label><textarea id="lNote" placeholder="Кратко опишите проблему"></textarea></div>' +
              '<div class="field"><label>Текст письма</label><div class="letter-preview" id="lPreview"></div></div>' +
              '<div class="letter-actions">' +
                '<a class="btn btn-primary btn-sm" id="lMail" href="#">Открыть в почте</a>' +
                '<button class="btn btn-outline btn-sm" id="lCopy">Скопировать текст</button>' +
                '<button class="btn btn-ghost btn-sm" data-copy="' + tpl.subject + '">Скопировать тему</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="wizard-nav">' +
            '<button class="btn btn-outline btn-sm" data-wiz="back">← Назад</button>' +
            '<button class="btn btn-ghost btn-sm" data-wiz="restart">Начать заново</button>' +
          '</div>' +
        '</div>';
      bindLetter(tpl);
    }
  }

  function bindLetter(tpl) {
    var fio = $('#lFio'), group = $('#lGroup'), email = $('#lEmail'), note = $('#lNote');
    var preview = $('#lPreview'), mail = $('#lMail');
    function update() {
      var body = tpl.build({ fio: fio.value.trim(), group: group.value.trim(), email: email.value.trim(), note: note.value.trim() });
      preview.textContent = body;
      mail.href = 'mailto:' + tpl.to + '?subject=' + encodeURIComponent(tpl.subject) + '&body=' + encodeURIComponent(body);
    }
    [fio, group, email, note].forEach(function (el) { el.addEventListener('input', update); });
    $('#lCopy').addEventListener('click', function () { copyText(preview.textContent, 'Текст письма скопирован'); });
    update();
  }

  wizBody.addEventListener('click', function (e) {
    var opt = e.target.closest('.wizard-option');
    if (opt) {
      var key = opt.getAttribute('data-key');
      if (wizState.step === 1) {
        wizState.branch = key;
        // ветка с единственным исходом — сразу к ответу
        if (STEP2[key].length === 1) { wizState.answer = STEP2[key][0].key; wizState.step = 3; }
        else wizState.step = 2;
      } else {
        wizState.answer = key; wizState.step = 3;
      }
      renderWizard();
      return;
    }
    var nav = e.target.closest('[data-wiz]');
    if (!nav) return;
    if (nav.getAttribute('data-wiz') === 'restart') { wizState = { step: 1, branch: null, answer: null }; }
    else if (wizState.step === 3) { wizState.step = STEP2[wizState.branch].length === 1 ? 1 : 2; }
    else { wizState.step = 1; wizState.branch = null; }
    renderWizard();
  });

  renderWizard();

  /* ---------------------------------------------------- поиск по странице */
  var searchInput = $('#search'), searchResults = $('#searchResults'), searchClear = $('#searchClear');

  var INDEX = (function () {
    var items = [];
    sections.forEach(function (sec) {
      var h2 = sec.querySelector('h2');
      var title = h2 ? h2.textContent.replace(/^\d+\s*/, '').trim() : sec.id;
      items.push({ id: sec.id, title: title, text: sec.textContent.replace(/\s+/g, ' ').trim(), sub: 'Раздел' });
      $$('h3, summary', sec).forEach(function (el) {
        var host = el.closest('details') || el.closest('.step') || el.parentElement;
        var anchor = el.closest('details');
        if (anchor && !anchor.id) anchor.id = 'q-' + Math.random().toString(36).slice(2, 8);
        items.push({
          id: anchor ? anchor.id : sec.id,
          title: el.textContent.trim(),
          text: (host ? host.textContent : el.textContent).replace(/\s+/g, ' ').trim(),
          sub: title
        });
      });
    });
    return items;
  })();

  function search(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) { searchResults.classList.remove('is-open'); searchClear.style.display = 'none'; return; }
    searchClear.style.display = 'block';
    var hits = INDEX.filter(function (it) {
      return it.title.toLowerCase().indexOf(q) !== -1 || it.text.toLowerCase().indexOf(q) !== -1;
    }).slice(0, 8);

    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-empty">Ничего не нашлось. Напишите в поддержку: <a href="mailto:lks.auth@nntu.ru">lks.auth@nntu.ru</a></div>';
    } else {
      searchResults.innerHTML = hits.map(function (h) {
        var i = h.text.toLowerCase().indexOf(q);
        var snippet = i === -1 ? h.text.slice(0, 90) : h.text.slice(Math.max(0, i - 35), i + 60);
        return '<a href="#' + h.id + '" data-q="' + q + '"><b>' + h.title + '</b><span>…' +
          snippet.replace(/[<>]/g, '') + '…</span></a>';
      }).join('');
    }
    searchResults.classList.add('is-open');
  }

  searchInput.addEventListener('input', function () { search(this.value); });
  searchInput.addEventListener('focus', function () { if (this.value.trim().length > 1) search(this.value); });
  searchClear.addEventListener('click', function () {
    searchInput.value = ''; searchResults.classList.remove('is-open');
    this.style.display = 'none'; searchInput.focus();
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.searchbar')) searchResults.classList.remove('is-open');
  });
  searchResults.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (target && target.tagName === 'DETAILS') target.open = true;
    searchResults.classList.remove('is-open');
  });
})();
