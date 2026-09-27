// =========================================================
// pkg.guide — небольшой ванильный JS без библиотек
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  highlightActiveNavLink();
  closeMenuOnLinkClick();
  setupCopyButtons();
  setupGlossarySearch();
  setupBackToTop();
});

/**
 * Подсвечивает в меню ссылку, соответствующую текущей странице.
 */
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".site-header .nav-link");

  links.forEach(function (link) {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/**
 * На мобильных после клика по ссылке в раскрытом бургер-меню
 * меню должно закрываться само.
 */
function closeMenuOnLinkClick() {
  const collapseEl = document.getElementById("navMenu");
  if (!collapseEl) return;

  const links = collapseEl.querySelectorAll(".nav-link");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (collapseEl.classList.contains("show") && window.bootstrap) {
        const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });
}

/**
 * Кнопки "Скопировать" у терминальных блоков с командами.
 * Каждый .term имеет кнопку .term__copy и текст команды в pre[data-command].
 */
function setupCopyButtons() {
  const buttons = document.querySelectorAll(".term__copy");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const term = button.closest(".term");
      const pre = term.querySelector("pre");
      const text = pre.textContent.trim();

      navigator.clipboard.writeText(text).then(function () {
        const original = button.textContent;
        button.textContent = "Скопировано";
        button.classList.add("is-copied");
        setTimeout(function () {
          button.textContent = original;
          button.classList.remove("is-copied");
        }, 1500);
      }).catch(function () {
        button.textContent = "Не удалось скопировать";
      });
    });
  });
}

/**
 * Поиск-фильтр по глоссарию (страница glossary.html).
 * Поле ввода #glossarySearch фильтрует .glossary__term по тексту термина.
 */
function setupGlossarySearch() {
  const input = document.getElementById("glossarySearch");
  const terms = document.querySelectorAll(".glossary__term");
  if (!input || !terms.length) return;

  input.addEventListener("input", function () {
    const query = input.value.trim().toLowerCase();

    terms.forEach(function (term) {
      const word = term.querySelector(".glossary__word").textContent.toLowerCase();
      const def = term.querySelector(".glossary__def").textContent.toLowerCase();
      const match = word.includes(query) || def.includes(query);
      term.style.display = match ? "" : "none";
    });
  });
}

/**
 * Кнопка "наверх": появляется после прокрутки.
 */
function setupBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  });

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
