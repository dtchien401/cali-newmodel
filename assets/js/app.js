(function () {
  const { durationLabels, discountByRank, accessData, benefitGroups } = window.APP_DATA;
  const state = window.APP_STATE;

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
                      ${state.lang === "vi" ? "Package price" : "Package price"}
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

  function renderAll() {
    recalcBenefitsForDuration();
    renderDurations();
    renderAccess();
    renderBenefits();
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

  window.renderAll = renderAll;
  window.selectDuration = selectDuration;
  window.selectAccess = selectAccess;
  window.toggleBenefit = toggleBenefit;

  document.addEventListener("DOMContentLoaded", () => {
    window.setLanguage("vi");
  });
})();
