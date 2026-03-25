window.APP_DATA = {
  durationLabels: {
    6: { vi: "6 tháng", en: "6 months" },
    12: { vi: "12 tháng", en: "12 months" },
    24: { vi: "24 tháng", en: "24 months" },
    36: { vi: "36 tháng", en: "36 months" }
  },

  discountByRank: [0.10, 0.15, 0.20, 0.20, 0.20],

  accessData: [
    {
      id: "gold",
      name: { vi: "Gold", en: "Gold" },
      remark: {
        vi: "1 club, không có Central area",
        en: "1 club, no Central area"
      },
      prices: { 12: 4850000, 24: 9160000, 36: 12120000 }
    },
    {
      id: "platinum",
      name: { vi: "Platinum", en: "Platinum" },
      remark: {
        vi: "Regional clubs, không Wellness Hub, không Central area",
        en: "Regional clubs, no Wellness Hub, no Central area"
      },
      prices: { 12: 5930000, 24: 11200000, 36: 14820000 }
    },
    {
      id: "wellness",
      name: { vi: "Wellness Hub", en: "Wellness Hub" },
      remark: {
        vi: "Regional clubs + Wellness Hub, không Central area",
        en: "Regional clubs + Wellness Hub, no Central area"
      },
      prices: { 12: 7010000, 24: 13240000, 36: 17520000 }
    },
    {
      id: "centuryon",
      name: {
        vi: "Centuryon + Jacuzzi + Swimming",
        en: "Centuryon + Jacuzzi + Swimming"
      },
      remark: {
        vi: "Nationwide, Central area, Wellness Hub",
        en: "Nationwide, Central area, Wellness Hub"
      },
      prices: { 12: 14030000, 24: 26500000, 36: 35070000 }
    }
  ],

  benefitGroups: [
    {
      key: "essential",
      label: { vi: "Essential experience", en: "Essential experience" },
      items: [
        {
          id: "gx",
          name: { vi: "GX", en: "GX" },
          unit: { vi: "/class", en: "/class" },
          retailPrice: 300000,
          retailText: {
            vi: "Giá lẻ: 300,000 VND / class",
            en: "Retail price: 300,000 VND / class"
          },
          prices: { 6: 1020000, 12: 1800000, 24: 3120000, 36: 3600000 }
        },
        {
          id: "yoga",
          name: { vi: "Yoga", en: "Yoga" },
          unit: { vi: "/class", en: "/class" },
          retailPrice: 300000,
          retailText: {
            vi: "Giá lẻ: 300,000 VND / class",
            en: "Retail price: 300,000 VND / class"
          },
          prices: { 6: 1020000, 12: 1800000, 24: 3120000, 36: 3600000 }
        },
        {
          id: "towel",
          name: { vi: "Towel", en: "Towel" },
          unit: { vi: "/day/check-in", en: "/day/check-in" },
          retailPrice: 400000,
          retailText: {
            vi: "Giá lẻ: 400,000 VND / day/check-in",
            en: "Retail price: 400,000 VND / day/check-in"
          },
          prices: { 6: 1280000, 12: 2250000, 24: 3900000, 36: 4500000 }
        },
        {
          id: "water",
          name: { vi: "Daily mineral water", en: "Daily mineral water" },
          unit: { vi: "/day/check-in", en: "/day/check-in" },
          retailPrice: 180000,
          retailText: {
            vi: "Giá lẻ: 180,000 VND / day/check-in",
            en: "Retail price: 180,000 VND / day/check-in"
          },
          prices: { 6: 920000, 12: 1620000, 24: 2810000, 36: 3240000 }
        }
      ]
    },
    {
      key: "tier1",
      label: { vi: "Signature experience – Tier 1", en: "Signature experience – Tier 1" },
      items: [
        {
          id: "guest",
          name: { vi: "1 non-fixed guest", en: "1 non-fixed guest" },
          unit: { vi: "served as Gold", en: "served as Gold" },
          retailPrice: 224500,
          retailText: {
            vi: "Giá lẻ: 224,500 VND / usage",
            en: "Retail price: 224,500 VND / usage"
          },
          prices: { 6: 1140000, 12: 2020000, 24: 3500000, 36: 4040000 }
        },
        {
          id: "locker",
          name: { vi: "Locker", en: "Locker" },
          unit: { vi: "/month", en: "/month" },
          retailPrice: 200000,
          retailText: {
            vi: "Giá lẻ: 200,000 VND / month",
            en: "Retail price: 200,000 VND / month"
          },
          prices: { 6: 1020000, 12: 1800000, 24: 3120000, 36: 3600000 }
        }
      ]
    },
    {
      key: "tier2",
      label: { vi: "Signature experience – Tier 2", en: "Signature experience – Tier 2" },
      items: [
        {
          id: "drink",
          name: { vi: "Daily special drink", en: "Daily special drink" },
          unit: { vi: "/day/check-in", en: "/day/check-in" },
          retailPrice: 480000,
          retailText: {
            vi: "Giá lẻ: 480,000 VND / day/check-in",
            en: "Retail price: 480,000 VND / day/check-in"
          },
          prices: { 6: 2450000, 12: 4320000, 24: 7490000, 36: 8640000 }
        },
        {
          id: "hpx",
          name: { vi: "HPX / PT / YI 30'", en: "HPX / PT / YI 30'" },
          unit: { vi: "2 sessions 30'/month", en: "2 sessions 30'/month" },
          retailPrice: 576000,
          retailText: {
            vi: "Giá lẻ: 576,000 VND / 2 sessions 30'/month",
            en: "Retail price: 576,000 VND / 2 sessions 30'/month"
          },
          prices: { 6: 2940000, 12: 5180000, 24: 8990000, 36: 10370000 }
        }
      ]
    },
    {
      key: "premium",
      label: { vi: "Signature experience", en: "Signature experience" },
      items: [
        {
          id: "parking",
          name: { vi: "Car parking", en: "Car parking" },
          unit: { vi: "/time", en: "/time" },
          retailPrice: 800000,
          retailText: {
            vi: "Giá lẻ: 800,000 VND / time",
            en: "Retail price: 800,000 VND / time"
          },
          prices: { 6: 4080000, 12: 7200000 }
        },
        {
          id: "bathrobe",
          name: { vi: "Bathrobe", en: "Bathrobe" },
          unit: { vi: "/time", en: "/time" },
          retailPrice: 250000,
          retailText: {
            vi: "Giá lẻ: 250,000 VND / time",
            en: "Retail price: 250,000 VND / time"
          },
          prices: { 6: 1280000, 12: 2250000, 24: 3900000, 36: 4500000 }
        }
      ]
    }
  ]
};
