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
          prices: { 6: 1020000, 12: 1800000, 24: 3120000, 36: 3600000 }
        },
        {
          id: "yoga",
          name: { vi: "Yoga", en: "Yoga" },
          unit: { vi: "/class", en: "/class" },
          prices: { 6: 1020000, 12: 1800000, 24: 3120000, 36: 3600000 }
        },
        {
          id: "towel",
          name: { vi: "Towel", en: "Towel" },
          unit: { vi: "/day/check-in", en: "/day/check-in" },
          prices: { 6: 1280000, 12: 2250000, 24: 3900000, 36: 4500000 }
        },
        {
          id: "water",
          name: { vi: "Daily mineral water", en: "Daily mineral water" },
          unit: { vi: "/day/check-in", en: "/day/check-in" },
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
          prices: { 6: 1140000, 12: 2020000, 24: 3500000, 36: 4040000 }
        },
        {
          id: "locker",
          name: { vi: "Locker", en: "Locker" },
          unit: { vi: "/month", en: "/month" },
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
          prices: { 6: 2450000, 12: 4320000, 24: 7490000, 36: 8640000 }
        },
        {
          id: "hpx",
          name: { vi: "HPX / PT / YI 30'", en: "HPX / PT / YI 30'" },
          unit: { vi: "2 sessions 30'/month", en: "2 sessions 30'/month" },
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
          prices: { 6: 4080000, 12: 7200000 }
        },
        {
          id: "bathrobe",
          name: { vi: "Bathrobe", en: "Bathrobe" },
          unit: { vi: "/time", en: "/time" },
          prices: { 6: 1280000, 12: 2250000, 24: 3900000, 36: 4500000 }
        }
      ]
    }
  ],

  comboGroups: [
    {
      key: "entry",
      title: { vi: "Entry", en: "Entry" },
      combos: [
        {
          id: "essential-starter",
          name: { vi: "Essential Starter", en: "Essential Starter" },
          audience: {
            vi: "Người mới tập, muốn bắt đầu đơn giản và hiệu quả",
            en: "New exercisers who want a simple and effective start"
          },
          why: {
            vi: "Dễ vào, đủ để tạo thói quen tập và cảm nhận giá trị ngay từ đầu",
            en: "Easy entry, enough to build consistency and feel value quickly"
          },
          duration: 12,
          access: "gold",
          benefits: ["gx", "yoga"]
        },
        {
          id: "daily-comfort",
          name: { vi: "Daily Comfort", en: "Daily Comfort" },
          audience: {
            vi: "Khách đi tập thường xuyên, ưu tiên tiện lợi mỗi ngày",
            en: "Frequent visitors who prioritize daily convenience"
          },
          why: {
            vi: "Giảm friction khi đi tập, tăng trải nghiệm mượt và đều đặn",
            en: "Reduces friction and makes regular training smoother"
          },
          duration: 12,
          access: "platinum",
          benefits: ["towel", "water", "locker"]
        }
      ]
    },
    {
      key: "lifestyle",
      title: { vi: "Lifestyle", en: "Lifestyle" },
      combos: [
        {
          id: "social-active",
          name: { vi: "Social Active", en: "Social Active" },
          audience: {
            vi: "Khách thích class, thích tập cùng bạn bè, thích động lực từ môi trường",
            en: "Clients who enjoy classes, social energy, and external motivation"
          },
          why: {
            vi: "Kết hợp vận động đa dạng và tính social để tăng độ gắn bó",
            en: "Combines variety and social energy to increase engagement"
          },
          duration: 12,
          access: "platinum",
          benefits: ["gx", "yoga", "guest"]
        },
        {
          id: "premium-recovery",
          name: { vi: "Premium Recovery", en: "Premium Recovery" },
          audience: {
            vi: "Người tập đều, quan tâm recovery và chăm sóc cơ thể",
            en: "Regular trainers who care about recovery and body care"
          },
          why: {
            vi: "Định vị wellness rõ ràng, rất phù hợp nhóm trung cao cấp",
            en: "Strong wellness positioning, ideal for premium users"
          },
          duration: 12,
          access: "wellness",
          benefits: ["towel", "drink", "hpx"]
        }
      ]
    },
    {
      key: "signature",
      title: { vi: "Signature", en: "Signature" },
      combos: [
        {
          id: "executive-signature",
          name: { vi: "Executive Signature", en: "Executive Signature" },
          audience: {
            vi: "Khách cao cấp, cần trải nghiệm đầy đủ và tiện lợi tối đa",
            en: "High-end clients who want the fullest and smoothest experience"
          },
          why: {
            vi: "Hero combo để thể hiện lifestyle premium và anchor perception",
            en: "A hero combo that anchors premium perception clearly"
          },
          duration: 12,
          access: "centuryon",
          benefits: ["towel", "water", "drink", "locker", "bathrobe", "parking"]
        }
      ]
    }
  ]
};
