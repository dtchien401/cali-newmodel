window.APP_STATE = {
  lang: "vi",
  duration: 12,
  access: "gold",
  benefits: []
};

window.setLanguage = function setLanguage(lang) {
  window.APP_STATE.lang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-vi").forEach((el) => {
    el.classList.toggle("lang-hidden", lang !== "vi");
  });

  document.querySelectorAll(".lang-en").forEach((el) => {
    el.classList.toggle("lang-hidden", lang !== "en");
  });

  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "vi" ? "EN" : "VI";
  }

  if (typeof window.renderAll === "function") {
    window.renderAll();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("langToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextLang = window.APP_STATE.lang === "vi" ? "en" : "vi";
      window.setLanguage(nextLang);
    });
  }
});
