"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const events = {
    web: {
      title: "Do zero à sua primeira página web",
      category: "Tecnologia",
      date: "12 de novembro de 2026 • 14h às 17h",
      location: "Laboratório 01",
      description:
        "Construa uma página responsiva com HTML, CSS e Bootstrap. Uma oficina prática para transformar sua primeira ideia em uma experiência na web, com Marina Costa.",
    },
    design: {
      title: "Design que coloca pessoas no centro",
      category: "Design",
      date: "13 de novembro de 2026 • 14h às 16h",
      location: "Sala Criativa",
      description:
        "Explore os fundamentos da experiência do usuário, organize ideias e desenhe soluções para necessidades reais. Atividade prática conduzida por Rafael Lima.",
    },
    carreira: {
      title: "Seu próximo passo na carreira",
      category: "Carreira",
      date: "14 de novembro de 2026 • 10h às 12h",
      location: "Auditório",
      description:
        "Converse sobre portfólio, currículo e preparação para entrevistas. Descubra como apresentar seus projetos e planejar seus próximos passos, com Camila Rocha.",
    },
    git: {
      title: "Git e GitHub na prática",
      category: "Tecnologia",
      date: "12 de novembro de 2026 • 18h às 20h",
      location: "Laboratório 02",
      description:
        "Aprenda a acompanhar alterações no código, criar commits e colaborar em projetos usando Git e GitHub. Traga suas dúvidas e pratique durante a oficina.",
    },
    dados: {
      title: "Primeiros passos com dados",
      category: "Tecnologia",
      date: "13 de novembro de 2026 • 18h às 20h",
      location: "Laboratório 01",
      description:
        "Transforme uma tabela em perguntas e descobertas. Conheça etapas de organização, análise e apresentação de dados em uma atividade para iniciantes.",
    },
    pitch: {
      title: "Tire sua ideia do papel",
      category: "Carreira",
      date: "14 de novembro de 2026 • 14h às 16h",
      location: "Sala Criativa",
      description:
        "Defina um problema, organize uma proposta e prepare uma apresentação curta da sua ideia. Uma oficina para praticar comunicação e receber feedback.",
    },
  };

  const storageKey = "conecta-campus.registrations.v1";
  const form = document.getElementById("registrationForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const course = document.getElementById("course");
  const eventSelect = document.getElementById("eventId");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");
  const formFeedback = document.getElementById("formFeedback");
  const storageNotice = document.getElementById("storageNotice");
  const registrationList = document.getElementById("registrationsList");
  const registrationsEmpty = document.getElementById("registrationsEmpty");
  const registrationCount = document.getElementById("registrationCount");
  let registrations = [];
  let storageAvailable = true;
  let selectedEventId = "";

  const setText = (id, text) => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  };

  function showStorageNotice(text) {
    storageAvailable = false;
    if (!storageNotice) return;
    storageNotice.textContent = text;
    storageNotice.hidden = false;
    storageNotice.classList.remove("d-none");
  }

  // Um arquivo salvo inválido é preservado, sem sobrescrita automática.
  function loadRegistrations() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) return;
      const parsed = JSON.parse(saved);
      const ids = new Set();
      const valid =
        Array.isArray(parsed) &&
        parsed.every((entry) => {
          const validEntry =
            entry &&
            typeof entry === "object" &&
            typeof entry.id === "string" &&
            entry.id.length > 0 &&
            typeof entry.fullName === "string" &&
            entry.fullName.trim().length > 0 &&
            typeof entry.email === "string" &&
            entry.email.trim().length > 0 &&
            typeof entry.course === "string" &&
            typeof entry.message === "string" &&
            typeof entry.code === "string" &&
            typeof entry.eventId === "string" &&
            Object.hasOwn(events, entry.eventId) &&
            !ids.has(entry.id);
          if (validEntry) ids.add(entry.id);
          return validEntry;
        });
      if (!valid) throw new Error("Formato de inscrições inválido");
      registrations = parsed;
    } catch {
      showStorageNotice(
        "Não foi possível carregar o armazenamento deste navegador. Os dados anteriores foram preservados. Novas inscrições funcionarão apenas enquanto esta página estiver aberta.",
      );
    }
  }

  function saveRegistrations() {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(registrations));
    } catch {
      showStorageNotice(
        "O navegador não permitiu salvar esta alteração. Ela ficará disponível apenas enquanto esta página estiver aberta; registros salvos anteriormente podem reaparecer ao recarregar.",
      );
    }
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function focusRegistrationList() {
    const nextButton = registrationList?.querySelector("button");
    if (nextButton) {
      nextButton.focus();
    } else if (registrationsEmpty) {
      registrationsEmpty.tabIndex = -1;
      registrationsEmpty.focus();
    }
  }

  // Dados digitados pelo usuário são inseridos com textContent, nunca com HTML.
  function renderRegistrations() {
    if (registrationCount) {
      registrationCount.textContent = String(registrations.length);
      registrationCount.setAttribute(
        "aria-label",
        `${registrations.length} inscrições salvas`,
      );
    }
    if (registrationsEmpty) {
      registrationsEmpty.hidden = registrations.length > 0;
      registrationsEmpty.classList.toggle("d-none", registrations.length > 0);
    }
    if (!registrationList) return;
    registrationList.replaceChildren();
    registrations.forEach((registration, index) => {
      const item = createElement(
        registrationList.matches("ul, ol") ? "li" : "div",
        "list-group-item p-3",
      );
      const heading = createElement(
        "h3",
        "h6 mb-2",
        events[registration.eventId].title,
      );
      const name = createElement("p", "small mb-1", registration.fullName);
      const code = createElement(
        "p",
        "small text-body-secondary mb-3",
        `Protocolo: ${registration.code}`,
      );
      const cancel = createElement(
        "button",
        "btn btn-sm btn-outline-danger",
        "Cancelar inscrição",
      );
      cancel.type = "button";
      cancel.setAttribute(
        "aria-label",
        `Cancelar inscrição de ${registration.fullName} em ${events[registration.eventId].title}`,
      );
      const confirmation = createElement(
        "div",
        "alert alert-warning mb-0 mt-3",
      );
      confirmation.hidden = true;
      confirmation.setAttribute("role", "group");
      confirmation.setAttribute("aria-label", "Confirmação de cancelamento");
      confirmation.id = `registration-cancel-${index}`;
      cancel.setAttribute("aria-controls", confirmation.id);
      cancel.setAttribute("aria-expanded", "false");
      const question = createElement(
        "p",
        "small mb-2",
        "Deseja cancelar esta inscrição demonstrativa?",
      );
      const actions = createElement("div", "d-flex flex-wrap gap-2");
      const confirm = createElement(
        "button",
        "btn btn-sm btn-danger",
        "Confirmar cancelamento",
      );
      const keep = createElement(
        "button",
        "btn btn-sm btn-outline-secondary",
        "Manter inscrição",
      );
      confirm.type = keep.type = "button";
      cancel.addEventListener("click", () => {
        confirmation.hidden = false;
        cancel.setAttribute("aria-expanded", "true");
        keep.focus();
      });
      keep.addEventListener("click", () => {
        confirmation.hidden = true;
        cancel.setAttribute("aria-expanded", "false");
        cancel.focus();
      });
      confirm.addEventListener("click", () => {
        registrations = registrations.filter(
          (entry) => entry.id !== registration.id,
        );
        saveRegistrations();
        renderRegistrations();
        focusRegistrationList();
      });
      actions.append(confirm, keep);
      confirmation.append(question, actions);
      item.append(heading, name, code, cancel, confirmation);
      registrationList.append(item);
    });
  }

  // O filtro altera apenas a visibilidade dos cards, preservando o grid Bootstrap.
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const eventCards = [...document.querySelectorAll("[data-event-card]")];
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      let visible = 0;
      eventCards.forEach((card) => {
        const show = category === "all" || card.dataset.category === category;
        card.hidden = !show;
        card.classList.toggle("d-none", !show);
        if (show) visible += 1;
      });
      filterButtons.forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
      });
      setText(
        "filterStatus",
        `${visible} ${visible === 1 ? "evento encontrado" : "eventos encontrados"}.`,
      );
    });
  });

  // O Bootstrap controla abertura, foco, sobreposição e fechamento do modal.
  const eventModal = document.getElementById("eventModal");
  eventModal?.addEventListener("show.bs.modal", (event) => {
    const eventId = event.relatedTarget?.closest("[data-event]")?.dataset.event;
    if (!Object.hasOwn(events, eventId)) {
      event.preventDefault();
      return;
    }
    selectedEventId = eventId;
    const details = events[eventId];
    setText("eventModalTitle", details.title);
    setText("eventModalDescription", details.description);
    setText("eventModalDate", details.date);
    setText("eventModalLocation", details.location);
    setText("eventModalCategory", details.category);
  });

  document.getElementById("chooseEvent")?.addEventListener("click", () => {
    if (!eventSelect || !Object.hasOwn(events, selectedEventId)) return;
    eventSelect.value = selectedEventId;
    eventSelect.setCustomValidity("");
    const moveToForm = () =>
      requestAnimationFrame(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        form?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
        fullName?.focus({ preventScroll: true });
      });
    if (eventModal && eventModal.classList.contains("show")) {
      eventModal.addEventListener("hidden.bs.modal", moveToForm, {
        once: true,
      });
      bootstrap.Modal.getOrCreateInstance(eventModal).hide();
    } else {
      moveToForm();
    }
  });

  function hideFormFeedback() {
    if (!formFeedback) return;
    formFeedback.hidden = true;
    formFeedback.classList.add("d-none");
    formFeedback.textContent = "";
  }

  function showFormFeedback(text) {
    if (!formFeedback) return;
    formFeedback.textContent = text;
    formFeedback.hidden = false;
    formFeedback.classList.remove("d-none");
  }

  function validateTrimmedField(field) {
    field.setCustomValidity("");
    const trimmed = field.value.trim();
    if (field.required && !trimmed) {
      field.setCustomValidity(
        "Preencha este campo; espaços em branco não são suficientes.",
      );
    } else if (
      trimmed &&
      field.minLength > 0 &&
      trimmed.length < field.minLength
    ) {
      field.setCustomValidity(`Use pelo menos ${field.minLength} caracteres.`);
    }
  }

  // A validação HTML5 permanece ativa; JavaScript complementa espaços e duplicatas.
  [fullName, email, course, message].filter(Boolean).forEach((field) => {
    field.addEventListener("input", () => {
      validateTrimmedField(field);
      hideFormFeedback();
    });
  });
  [eventSelect, consent].filter(Boolean).forEach((field) => {
    field.addEventListener("change", () => {
      field.setCustomValidity("");
      hideFormFeedback();
    });
  });

  form?.addEventListener("reset", () => {
    [...form.elements].forEach((field) => {
      if (typeof field.setCustomValidity === "function")
        field.setCustomValidity("");
    });
    form.classList.remove("was-validated");
    hideFormFeedback();
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!fullName || !email || !course || !eventSelect || !message || !consent)
      return;
    [fullName, email, course, message].forEach((field) => {
      field.value = field.value.trim();
      validateTrimmedField(field);
    });
    if (!Object.hasOwn(events, eventSelect.value)) {
      eventSelect.setCustomValidity("Selecione um evento da programação.");
    }
    if (!form.reportValidity()) return;

    const normalizedEmail = email.value.toLowerCase();
    const duplicate = registrations.some(
      (registration) =>
        registration.email.trim().toLowerCase() === normalizedEmail &&
        registration.eventId === eventSelect.value,
    );
    if (duplicate) {
      showFormFeedback(
        "Este e-mail já tem uma inscrição neste evento. Você pode consultá-la em Minhas inscrições ou escolher outro evento.",
      );
      email.focus();
      return;
    }

    const button = document.getElementById("submitRegistration");
    if (button) button.disabled = true;
    try {
      const id =
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const registration = {
        id,
        fullName: fullName.value,
        email: normalizedEmail,
        course: course.value,
        eventId: eventSelect.value,
        message: message.value,
        code: `CC-2026-${id.replace(/-/g, "").slice(-8).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      };
      registrations.push(registration);
      saveRegistrations();
      renderRegistrations();
      setText("successName", registration.fullName);
      setText("successEvent", events[registration.eventId].title);
      setText("successCode", registration.code);
      form.reset();
      const successModal = document.getElementById("successModal");
      if (successModal) {
        successModal.addEventListener(
          "hidden.bs.modal",
          () => button?.focus(),
          { once: true },
        );
        bootstrap.Modal.getOrCreateInstance(successModal).show();
      } else {
        showFormFeedback(
          `Inscrição demonstrativa registrada. Protocolo: ${registration.code}.`,
        );
      }
    } finally {
      if (button) button.disabled = false;
    }
  });

  // Recolhe o menu móvel após a escolha de uma seção da página.
  const navigation = document.getElementById("mainNavigation");
  navigation?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (navigation.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navigation, {
          toggle: false,
        }).hide();
      }
    });
  });

  loadRegistrations();
  renderRegistrations();
  const myRegistrationsModal = document.getElementById("myRegistrationsModal");
  myRegistrationsModal?.addEventListener("show.bs.modal", renderRegistrations);

  // O convite do estado vazio leva diretamente à lista de atividades.
  registrationsEmpty
    ?.querySelector('[data-bs-dismiss="modal"]')
    ?.addEventListener("click", () => {
      myRegistrationsModal?.addEventListener(
        "hidden.bs.modal",
        () => {
          requestAnimationFrame(() => {
            const activitiesTitle = document.getElementById("activitiesTitle");
            document
              .getElementById("atividades")
              ?.scrollIntoView({ block: "start" });
            if (activitiesTitle) {
              activitiesTitle.tabIndex = -1;
              activitiesTitle.focus({ preventScroll: true });
            }
          });
        },
        { once: true },
      );
    });
});
