(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const areaById = Object.fromEntries(AREAS.map((a) => [a.id, a]));

  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const initials = (nome) =>
    nome.split(" ").filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const photoHTML = (p) =>
    p.foto
      ? `<img src="${escapeHTML(p.foto)}" alt="Foto de ${escapeHTML(p.nome)}" loading="lazy">`
      : `<span class="initials" aria-hidden="true">${initials(p.nome)}</span>`;

  /* ---------- Header: sombra ao rolar + menu mobile ---------- */
  const header = $(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$(".nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Link ativo no menu ---------- */
  const navLinks = $$(".nav__list a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Abas acessíveis (genérico) ---------- */
  function setupTabs(tablist, onSelect) {
    const tabs = $$('[role="tab"]', tablist);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      if (focus) tab.focus();
      onSelect(tab);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!dir) return;
        e.preventDefault();
        select(tabs[(i + dir + tabs.length) % tabs.length], true);
      });
    });
    return { select: (tab) => select(tab), tabs };
  }

  // Missão / Visão / Valores
  setupTabs($(".about__pillars .tabs"), (tab) => {
    $$(".about__pillars .pillar").forEach((panel) => {
      const show = panel.id === tab.getAttribute("aria-controls");
      panel.hidden = !show;
      if (show) panel.classList.add("is-visible");
    });
  });

  /* ---------- Áreas de atuação ---------- */
  $("#areas-grid").innerHTML = AREAS.map(
    (a, i) => `
      <article class="area reveal" style="--d:${(i % 4) * 60}ms">
        <span class="area__num">${String(i + 1).padStart(2, "0")}</span>
        <h3>${escapeHTML(a.titulo)}</h3>
        <p>${escapeHTML(a.resumo)}</p>
        <button class="area__link" data-area="${a.id}">Ver equipe <span aria-hidden="true">→</span></button>
      </article>`
  ).join("");

  // Select do formulário
  $("#form-area").insertAdjacentHTML(
    "beforeend",
    AREAS.map((a) => `<option value="${a.id}">${escapeHTML(a.titulo)}</option>`).join("") +
      `<option value="outro">Outro assunto</option>`
  );

  /* ---------- Equipe: filtros + cards ---------- */
  const usedAreas = AREAS.filter((a) => EQUIPE.some((p) => p.areas.includes(a.id)));
  $("#team-filters").innerHTML =
    `<button class="chip is-active" data-filter="todos" aria-pressed="true">Todos</button>` +
    usedAreas.map((a) => `<button class="chip" data-filter="${a.id}" aria-pressed="false">${escapeHTML(a.titulo)}</button>`).join("");

  $("#team-grid").innerHTML = EQUIPE.map(
    (p, i) => `
      <article class="card reveal" style="--d:${(i % 4) * 80}ms" data-areas="${p.areas.join(" ")}">
        <button class="card__btn" data-index="${i}" aria-haspopup="dialog" aria-label="Ver trajetória de ${escapeHTML(p.nome)}">
          <div class="card__photo">${photoHTML(p)}</div>
          <div class="card__overlay">
            <ul class="card__areas">${p.areas.map((id) => `<li>${escapeHTML(areaById[id]?.titulo || id)}</li>`).join("")}</ul>
            <span class="card__cta">Ver trajetória <span aria-hidden="true">→</span></span>
          </div>
          <div class="card__info">
            <h3>${escapeHTML(p.nome)}</h3>
            <p>${escapeHTML(p.cargo)}</p>
          </div>
        </button>
      </article>`
  ).join("");

  const applyFilter = (id) => {
    $$("#team-filters .chip").forEach((c) => {
      const on = c.dataset.filter === id;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    $$("#team-grid .card").forEach((card) => {
      const match = id === "todos" || card.dataset.areas.split(" ").includes(id);
      card.classList.toggle("is-hidden", !match);
    });
  };
  $("#team-filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) applyFilter(chip.dataset.filter);
  });

  // "Ver especialistas" nas áreas → filtra a equipe
  $("#areas-grid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-area]");
    if (!btn) return;
    const id = btn.dataset.area;
    const hasChip = $(`#team-filters [data-filter="${id}"]`);
    applyFilter(hasChip ? id : "todos");
    $("#equipe").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Modal do advogado ---------- */
  const modal = $("#lawyer-modal");
  const modalContent = $("#modal-content");
  let current = null;
  let lastFocus = null;

  const renderTab = (tab) => {
    const p = current;
    const empty = `<p class="muted">Informações em breve.</p>`;
    let html = "";

    if (tab === "trajetoria") {
      html = `
        <p class="modal__lead">${escapeHTML(p.resumo)}</p>
        <ol class="timeline">
          ${p.trajetoria.map((t) => `
            <li>
              <span class="timeline__year">${escapeHTML(t.ano)}</span>
              <div>
                <strong>${escapeHTML(t.titulo)}</strong>
                <span>${escapeHTML(t.local)}</span>
              </div>
            </li>`).join("")}
        </ol>`;
    } else if (tab === "formacao") {
      html = p.formacao.length
        ? `<ul class="edu">${p.formacao.map((f) => `
            <li>
              <span class="edu__year">${escapeHTML(f.ano)}</span>
              <strong>${escapeHTML(f.grau)}</strong>
              <span>${escapeHTML(f.instituicao)}</span>
            </li>`).join("")}</ul>`
        : empty;
    } else if (tab === "atuacao") {
      html = p.atuacao.length
        ? `<ul class="bullets">${p.atuacao.map((x) => `<li>${escapeHTML(x)}</li>`).join("")}</ul>`
        : empty;
    } else {
      html = `
        <h3 class="modal__h">Publicações</h3>
        ${p.publicacoes.length ? `<ul class="bullets">${p.publicacoes.map((x) => `<li>${escapeHTML(x)}</li>`).join("")}</ul>` : empty}
        <h3 class="modal__h">Idiomas</h3>
        <div class="modal__tags">${p.idiomas.map((x) => `<span>${escapeHTML(x)}</span>`).join("")}</div>`;
    }
    modalContent.innerHTML = `<div class="fade-in">${html}</div>`;
    modalContent.scrollTop = 0;
  };

  const modalTabs = setupTabs($(".tabs--modal", modal), (tab) => renderTab(tab.dataset.tab));

  const openModal = (index, trigger) => {
    current = EQUIPE[index];
    lastFocus = trigger;
    $("#modal-photo").innerHTML = photoHTML(current);
    $("#modal-name").textContent = current.nome;
    $("#modal-role").textContent = current.cargo;
    $("#modal-oab").textContent = current.oab;
    $("#modal-tags").innerHTML = current.areas
      .map((id) => `<span>${escapeHTML(areaById[id]?.titulo || id)}</span>`).join("");
    $("#modal-contacts").innerHTML = [
      current.email && `<a href="mailto:${escapeHTML(current.email)}">E-mail</a>`,
      current.linkedin && `<a href="${escapeHTML(current.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
    ].filter(Boolean).join("");

    modalTabs.select(modalTabs.tabs[0]);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    $(".modal__close", modal).focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; }, 300);
    lastFocus?.focus();
  };

  $("#team-grid").addEventListener("click", (e) => {
    const btn = e.target.closest(".card__btn");
    if (btn) openModal(+btn.dataset.index, btn);
  });
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      // mantém o foco dentro do modal
      const f = $$('button, a[href], [tabindex="0"]', modal).filter((el) => el.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Artigos ---------- */
  const fmtDate = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  $("#posts-grid").innerHTML = ARTIGOS.map(
    (a, i) => `
      <article class="post reveal" style="--d:${i * 80}ms">
        <a href="${escapeHTML(a.link)}">
          <div class="post__meta"><span>${escapeHTML(a.categoria)}</span><time datetime="${a.data}">${fmtDate(a.data)}</time></div>
          <h3>${escapeHTML(a.titulo)}</h3>
          <p>${escapeHTML(a.resumo)}</p>
          <span class="link-arrow">Continuar lendo <span aria-hidden="true">→</span></span>
        </a>
      </article>`
  ).join("");

  /* ---------- Animações de entrada ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Contadores ---------- */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const end = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      counterObserver.unobserve(el);
      if (reduceMotion) { el.textContent = end + suffix; return; }
      const t0 = performance.now();
      const dur = 1600;
      const step = (t) => {
        const k = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- Formulários (sem backend ainda) ---------- */
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const status = $("#form-status");
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      status.textContent = "Preencha os campos obrigatórios e aceite a política de privacidade.";
      status.dataset.state = "error";
      return;
    }
    // TODO: integrar com backend / serviço de e-mail (ex.: Formspree, EmailJS, API própria)
    status.textContent = "Mensagem enviada. Em breve entraremos em contato.";
    status.dataset.state = "ok";
    form.reset();
    form.classList.remove("was-validated");
  });

  $("#newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: integrar com serviço de newsletter
    $("#nl-status").textContent = "Inscrição realizada. Obrigado!";
    e.target.reset();
  });

  $("#ano").textContent = new Date().getFullYear();
})();
