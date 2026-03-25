(function () {
  const {
    durationLabels,
    discountByRank,
    accessData,
    benefitGroups,
    comboGroups
  } = window.APP_DATA;

  const state = window.APP_STATE;
  let storyStepIndex = 0;
  let currentProductTab = "combo";

  function formatVND(num) {
    return new Intl.NumberFormat("en-US").format(Math.round(num)) + " VND";
  }

  function durationDiscountLabel(months) {
    if (months === 6) return "Base";
    if (months === 12) return "-15%";
    if (months === 24) return "-25%";
    if (months === 36) return "-35%";
    return "";
  }

  function getBenefitById(id) {
    for (const group of benefitGroups) {
      const found = group.items.find((item) => item.id === id);
      if (found) return found;
    }
    return null;
  }

  function getAccessById(id) {
    return accessData.find((x) => x.id === id) || null;
  }

  function getSelectedAccess() {
    let access = accessData.find((x) => x.id === state.access) || accessData[0];

    if (!access.prices[state.duration]) {
      const fallback = accessData.find((x) => x.prices[state.duration]);
      access = fallback || access;
      state.access = access.id;
    }

    return access;
  }

  function recalcBenefitsForDuration() {
    state.benefits = state.benefits.filter((id) => {
      const item = getBenefitById(id);
      return item && item.prices[state.duration];
    });
  }

  function calculateConfigSummary(duration, accessId, benefitIds) {
    let access = getAccessById(accessId) || accessData[0];
    if (!access.prices[duration]) {
      const fallback = accessData.find((x) => x.prices[duration]);
      access = fallback || access;
    }

    const accessPrice = access.prices[duration] || 0;

    const selectedBenefitObjects = benefitIds
      .map(getBenefitById)
      .filter((item) => item && item.prices[duration]);

    let benefitTotal = 0;

    const benefitRows = selectedBenefitObjects.map((item, index) => {
      const base = item.prices[duration] || 0;
      const discount = discountByRank[Math.min(index, discountByRank.length - 1)] || 0.20;
      const finalPrice = base * (1 - discount);
      benefitTotal += finalPrice;
      return { item, base, discount, finalPrice };
    });

    const total = accessPrice + benefitTotal;
    const monthly = total / duration;

    return { access, accessPrice, benefitRows, total, monthly };
  }

  function renderDurations() {
    const wrap = document.getElementById("durationOptions");
    if (!wrap) return;

    wrap.innerHTML = [6, 12, 24, 36].map((months) => {
      const active = state.duration === months ? "option-active" : "bg-white border-slate-200";
      const label = durationLabels[months][state.lang];

      return `
        <button onclick="selectDuration(${months})" type="button"
          class="text-left rounded-2xl border p-4 transition ${active}">
          <div class="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">
            ${durationDiscountLabel(months)}
          </div>
          <div class="mt-2 text-lg font-black text-slate-900">${label}</div>
        </button>
      `;
    }).join("");
  }

  function renderAccess() {
    const wrap = document.getElementById("accessOptions");
    if (!wrap) return;

    wrap.innerHTML = accessData.map((item) => {
      const active = state.access === item.id ? "option-active" : "bg-white border-slate-200";
      const unavailable = !item.prices[state.duration];

      const priceText = unavailable
        ? (state.lang === "vi" ? "Không bán ở thời hạn này" : "Not sold for this duration")
        : formatVND(item.prices[state.duration]);

      const monthly = unavailable
        ? ""
        : `<div class="mt-1 text-sm text-slate-500">${formatVND(item.prices[state.duration] / state.duration)} / ${state.lang === "vi" ? "tháng" : "month"}</div>`;

      return `
        <button onclick="selectAccess('${item.id}')" type="button"
          class="text-left rounded-2xl border p-5 transition ${active} ${unavailable ? "opacity-70 cursor-not-allowed" : ""}">
          <div>
            <div class="text-lg font-black text-slate-900">${item.name[state.lang]}</div>
            <div class="mt-1 text-sm text-slate-500 leading-6">${item.remark[state.lang]}</div>
          </div>
          <div class="mt-4 text-xl font-black text-red-600">${priceText}</div>
          ${monthly}
        </button>
      `;
    }).join("");
  }

  function renderBenefits() {
    const wrap = document.getElementById("benefitGroups");
    if (!wrap) return;

    wrap.innerHTML = benefitGroups.map((group) => {
      return `
        <div>
          <div class="text-sm font-black uppercase tracking-[0.18em] text-slate-500 mb-3">
            ${group.label[state.lang]}
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            ${group.items.map((item) => {
              const selected = state.benefits.includes(item.id);
              const active = selected ? "benefit-selected" : "bg-white border-slate-200";
              const unavailable = !item.prices[state.duration];

              const packagePrice = unavailable
                ? (state.lang === "vi" ? "Không bán ở thời hạn này" : "Not sold for this duration")
                : formatVND(item.prices[state.duration]);

              const monthly = unavailable
                ? ""
                : `<div class="mt-1 text-sm text-slate-500">${formatVND(item.prices[state.duration] / state.duration)} / ${state.lang === "vi" ? "tháng" : "month"}</div>`;

              const retailHtml = item.retailPrice
                ? `
                  <div class="mt-3 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2">
                    <div class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      ${state.lang === "vi" ? "Single usage / Giá lẻ" : "Single usage / Retail"}
                    </div>
                    <div class="mt-1 text-sm font-semibold text-slate-800">
                      ${item.retailText ? item.retailText[state.lang] : formatVND(item.retailPrice)}
                    </div>
                  </div>
                `
                : "";

              const valueNote = !unavailable
                ? `
                  <div class="mt-2 text-xs font-semibold text-emerald-600">
                    ${state.lang === "vi"
                      ? "Đăng ký theo gói giúp tối ưu chi phí hơn so với mua lẻ"
                      : "Package selection gives better value than single-use purchase"}
                  </div>
                `
                : "";

              return `
                <button onclick="toggleBenefit('${item.id}')" type="button"
                  class="text-left rounded-2xl border p-5 transition ${active} ${unavailable ? "opacity-60 cursor-not-allowed" : ""}">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <div class="text-lg font-black text-slate-900">${item.name[state.lang]}</div>
                      <div class="mt-1 text-sm text-slate-500">${item.unit[state.lang]}</div>
                    </div>

                    <div class="rounded-full px-3 py-1 text-xs font-black border ${selected ? "pill-active" : "bg-white text-slate-500 border-slate-200"}">
                      ${selected ? (state.lang === "vi" ? "Đã chọn" : "Selected") : (state.lang === "vi" ? "Chọn" : "Select")}
                    </div>
                  </div>

                  ${retailHtml}

                  <div class="mt-4">
                    <div class="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      Package price
                    </div>
                    <div class="mt-1 text-xl font-black text-red-600">${packagePrice}</div>
                    ${monthly}
                    ${valueNote}
                  </div>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  function renderCombos() {
    const wrap = document.getElementById("comboGroups");
    if (!wrap || !comboGroups) return;

    wrap.innerHTML = comboGroups.map((group) => {
      return `
        <div>
          <div class="text-sm font-black uppercase tracking-[0.18em] text-slate-500 mb-4">
            ${group.title[state.lang]}
          </div>

          <div class="grid lg:grid-cols-2 gap-4 ${group.combos.length === 1 ? "max-w-2xl" : ""}">
            ${group.combos.map((combo) => {
              const summary = calculateConfigSummary(combo.duration, combo.access, combo.benefits);
              const access = getAccessById(combo.access);
              const benefitNames = combo.benefits
                .map((id) => getBenefitById(id))
                .filter(Boolean)
                .map((item) => item.name[state.lang]);

              return `
                <div class="combo-card rounded-3xl border border-slate-200 bg-white p-5">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <div class="text-2xl font-black text-slate-900">${combo.name[state.lang]}</div>
                      <div class="mt-2 text-sm text-slate-500 leading-6">${combo.audience[state.lang]}</div>
                    </div>
                    <div class="rounded-full bg-red-50 text-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
                      ${durationLabels[combo.duration][state.lang]}
                    </div>
                  </div>

                  <div class="mt-5 grid gap-3">
                    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <div class="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        ${state.lang === "vi" ? "Access" : "Access"}
                      </div>
                      <div class="mt-2 text-lg font-black text-slate-900">
                        ${access ? access.name[state.lang] : combo.access}
                      </div>
                      <div class="mt-1 text-sm text-slate-500">
                        ${access ? access.remark[state.lang] : ""}
                      </div>
                    </div>

                    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <div class="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        ${state.lang === "vi" ? "Benefits included" : "Benefits included"}
                      </div>
                      <div class="mt-2 flex flex-wrap gap-2">
                        ${benefitNames.map((name) => `
                          <span class="inline-flex rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">${name}</span>
                        `).join("")}
                      </div>
                    </div>

                    <div class="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <div class="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        ${state.lang === "vi" ? "Why this combo works" : "Why this combo works"}
                      </div>
                      <div class="mt-2 text-sm text-slate-600 leading-7">
                        ${combo.why[state.lang]}
                      </div>
                    </div>
                  </div>

                  <div class="mt-5 grid md:grid-cols-[1fr_auto] gap-4 items-end">
                    <div>
                      <div class="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                        ${state.lang === "vi" ? "Estimated monthly investment" : "Estimated monthly investment"}
                      </div>
                      <div class="mt-1 text-3xl font-black text-red-600">${formatVND(summary.monthly)}</div>
                      <div class="mt-1 text-sm text-slate-500">${formatVND(summary.total)} total</div>
                    </div>

                    <button onclick="useCombo('${combo.id}')" type="button"
                      class="rounded-2xl bg-red-600 text-white px-5 py-3 font-bold shadow hover:opacity-95 transition">
                      ${state.lang === "vi" ? "Dùng combo này" : "Use this combo"}
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  function calculateSummary() {
    const access = getSelectedAccess();
    const accessPrice = access.prices[state.duration] || 0;

    const selectedBenefitObjects = state.benefits
      .map(getBenefitById)
      .filter(Boolean);

    let benefitTotal = 0;

    const benefitRows = selectedBenefitObjects.map((item, index) => {
      const base = item.prices[state.duration] || 0;
      const discount = discountByRank[Math.min(index, discountByRank.length - 1)] || 0.20;
      const finalPrice = base * (1 - discount);

      benefitTotal += finalPrice;

      return { item, base, discount, finalPrice };
    });

    const total = accessPrice + benefitTotal;
    const monthly = total / state.duration;

    return { access, accessPrice, benefitRows, total, monthly };
  }

  function renderSummary() {
    const summary = calculateSummary();

    const summaryDuration = document.getElementById("summaryDuration");
    const summaryAccess = document.getElementById("summaryAccess");
    const summaryAccessRemark = document.getElementById("summaryAccessRemark");
    const summaryMonthly = document.getElementById("summaryMonthly");
    const summaryTotal = document.getElementById("summaryTotal");
    const benefitCountBadge = document.getElementById("benefitCountBadge");
    const summaryBenefits = document.getElementById("summaryBenefits");
    const summaryFootnote = document.getElementById("summaryFootnote");

    if (summaryDuration) summaryDuration.textContent = durationLabels[state.duration][state.lang];
    if (summaryAccess) summaryAccess.textContent = summary.access.name[state.lang];
    if (summaryAccessRemark) summaryAccessRemark.textContent = summary.access.remark[state.lang];
    if (summaryMonthly) summaryMonthly.textContent = formatVND(summary.monthly);
    if (summaryTotal) summaryTotal.textContent = formatVND(summary.total);
    if (benefitCountBadge) benefitCountBadge.textContent = String(summary.benefitRows.length);

    if (summaryBenefits) {
      const benefitHtml = summary.benefitRows.length
        ? summary.benefitRows.map((row, index) => {
            const discountLabel = "-" + Math.round(row.discount * 100) + "%";
            return `
              <div class="rounded-xl bg-white/5 border border-white/10 p-3">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="font-bold text-white">${index + 1}. ${row.item.name[state.lang]}</div>
                    <div class="text-xs text-slate-300 mt-1">${row.item.unit[state.lang]}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-xs text-red-200 font-black">${discountLabel}</div>
                    <div class="font-bold text-white">${formatVND(row.finalPrice)}</div>
                  </div>
                </div>
              </div>
            `;
          }).join("")
        : `<div class="text-sm text-slate-300">${state.lang === "vi" ? "Chưa chọn benefit nào." : "No benefits selected yet."}</div>`;

      summaryBenefits.innerHTML = benefitHtml;
    }

    if (summaryFootnote) {
      summaryFootnote.innerHTML = state.lang === "vi"
        ? "Mô phỏng theo logic từ file pricing hiện tại: Access tính theo giá thời hạn đã chọn; benefits giảm giá theo thứ tự chọn: benefit 1 = -10%, benefit 2 = -15%, benefit 3 trở đi = -20%."
        : "Simulation based on the current pricing file: access is charged by selected duration; benefits receive sequential discounts: benefit 1 = -10%, benefit 2 = -15%, benefit 3 onward = -20%.";
    }
  }

  function showStoryStep(index) {
    const tabs = document.querySelectorAll(".story-tab");
    const steps = document.querySelectorAll("[data-step-content]");

    storyStepIndex = index;

    tabs.forEach((tab) => {
      const isActive = Number(tab.dataset.step) === index;
      tab.classList.toggle("is-active", isActive);
    });

    steps.forEach((step) => {
      const isActive = Number(step.dataset.stepContent) === index;
      step.classList.toggle("hidden", !isActive);
    });
  }

  function initStoryTabs() {
    const tabs = document.querySelectorAll(".story-tab");
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        showStoryStep(Number(tab.dataset.step));
      });
    });

    showStoryStep(0);
  }

  function showProductTab(tabName) {
    currentProductTab = tabName;

    document.querySelectorAll(".product-tab").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.productTab === tabName);
    });

    const comboPanel = document.getElementById("panel-combo");
    const builderPanel = document.getElementById("panel-builder");

    if (comboPanel) comboPanel.classList.toggle("hidden", tabName !== "combo");
    if (builderPanel) builderPanel.classList.toggle("hidden", tabName !== "builder");
  }

  function initProductTabs() {
    const tabs = document.querySelectorAll(".product-tab");
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        showProductTab(tab.dataset.productTab);
      });
    });

    showProductTab(currentProductTab);
  }

  function renderAll() {
    recalcBenefitsForDuration();
    renderDurations();
    renderAccess();
    renderBenefits();
    renderCombos();
    renderSummary();
  }

  function selectDuration(months) {
    state.duration = months;
    renderAll();
  }

  function selectAccess(id) {
    const item = accessData.find((x) => x.id === id);
    if (!item || !item.prices[state.duration]) return;
    state.access = id;
    renderAll();
  }

  function toggleBenefit(id) {
    const item = getBenefitById(id);
    if (!item || !item.prices[state.duration]) return;

    if (state.benefits.includes(id)) {
      state.benefits = state.benefits.filter((x) => x !== id);
    } else {
      state.benefits.push(id);
    }

    renderAll();
  }

  function useCombo(comboId) {
    let selectedCombo = null;

    comboGroups.forEach((group) => {
      group.combos.forEach((combo) => {
        if (combo.id === comboId) selectedCombo = combo;
      });
    });

    if (!selectedCombo) return;

    state.duration = selectedCombo.duration;
    state.access = selectedCombo.access;
    state.benefits = [...selectedCombo.benefits];

    renderAll();
    showProductTab("builder");

    const builderPanel = document.getElementById("panel-builder");
    if (builderPanel) {
      builderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  window.renderAll = renderAll;
  window.selectDuration = selectDuration;
  window.selectAccess = selectAccess;
  window.toggleBenefit = toggleBenefit;
  window.useCombo = useCombo;

  document.addEventListener("DOMContentLoaded", () => {
    window.setLanguage("vi");
    initStoryTabs();
    initProductTabs();
  });
})();
