const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const SITE = {
  meta: {
    name: "Oga Luisca",
    tagline: "Sales Marketing",
    title: "Oga Luisca | Konsultasi Mobil BYD Palangka Raya",
    description:
      "Temukan informasi model dan harga mobil BYD di Palangka Raya. Konsultasi langsung dengan Oga Luisca, Sales Consultant BYD Arista.",
    keywords:
      "BYD Palangka Raya, mobil BYD, harga BYD Palangka Raya, Oga Luisca, BYD Arista",
    socialImage: "image.png",
    socialImageAlt: "Oga Luisca, Sales Consultant BYD Arista Palangka Raya",
    modelImageAltTemplate: "Mobil {model} | BYD Palangka Raya",
    pages: {
      models: {
        title: "Model BYD Palangka Raya | Oga Luisca",
        description:
          "Jelajahi katalog model BYD dan informasi harga OTR Palangka Raya. Tanyakan varian, ketersediaan, dan promo terbaru kepada Oga Luisca.",
      },
      simulation: {
        title: "Simulasi Cicilan Mobil BYD | Oga Luisca",
        description:
          "Hitung estimasi awal cicilan mobil BYD berdasarkan harga, uang muka, dan tenor. Konsultasikan kembali hasilnya dengan Oga Luisca.",
      },
      contact: {
        title: "Hubungi Oga Luisca | Sales BYD Palangka Raya",
        description:
          "Hubungi Oga Luisca, Sales Consultant BYD Arista Palangka Raya, untuk konsultasi model, harga, promo, dan ketersediaan BYD.",
      },
      model: {
        titleTemplate: "{model} | Harga dan Informasi BYD Palangka Raya",
        descriptionTemplate:
          "Lihat informasi {model} di Palangka Raya dan tanyakan harga, varian, serta ketersediaan terbaru kepada Oga Luisca.",
      },
      notFound: {
        title: "Halaman tidak ditemukan | Oga Luisca",
        description: "Halaman yang Anda cari tidak tersedia.",
      },
    },
    url: "[URL situs]",
    lang: "id",
    disclaimer:
      "Situs ini dikelola secara pribadi oleh Oga Luisca dan bukan situs resmi BYD. Informasi harga dan kendaraan perlu dikonfirmasi langsung kepada Oga.",
  },
  paths: {
    base: BASE,
    brand: `${BASE}/assets/img/brand`,
    seller: `${BASE}/assets/img/seller`,
    models: `${BASE}/assets/img/models`,
    icons: `${BASE}/assets/icons`,
    docs: `${BASE}/assets/docs`,
  },
  brandAssets: {
    bydLogo: "byd-com-brandmark.svg",
    aristaLogo: "Logo ARISTA white-(1).png",
  },
  modelBenefits: {
    tagline: "Lebih nyaman & hemat untuk keluarga Indonesia.",
    note: "Klaim mengikuti materi promosi dealer; konfirmasi syarat dan ketentuan kepada Oga.",
    specificationNote:
      "Angka jarak mengikuti poster dealer; konfirmasi detail varian dan metode pengukurannya kepada Oga.",
    items: [
      {
        id: "battery",
        title: "Battery Safety",
        description: "Blade Battery: super aman dan tahan lama.",
      },
      {
        id: "warranty",
        title: "Garansi lengkap",
        description:
          "Garansi baterai hingga 8 tahun / 160.000 km dan kendaraan hingga 8 tahun / 150.000 km.",
      },
      {
        id: "comfort",
        title: "Nyaman & hemat",
        description:
          "Beralih ke BYD untuk pengalaman berkendara yang terasa lebih nyaman dan hemat.",
      },
    ],
  },
  homeFaqs: {
    title: "Pertanyaan yang sering ditanyakan",
    items: [
      {
        question: "Bagaimana cara mengetahui harga BYD terbaru?",
        answer:
          "Harga yang tampil merupakan informasi OTR Palangka Raya dari materi dealer. Hubungi Oga untuk memastikan harga, promo, dan ketersediaan terbaru.",
      },
      {
        question: "Bisa dibantu memilih model yang sesuai kebutuhan?",
        answer:
          "Bisa. Sampaikan kebutuhan penggunaan dan anggaran Anda kepada Oga agar dapat mendiskusikan pilihan model serta varian yang tersedia.",
      },
      {
        question: "Apakah tersedia simulasi cicilan?",
        answer:
          "Gunakan halaman Simulasi untuk melihat perkiraan awal. Angka tersebut hanya estimasi, bukan penawaran resmi; detail pembiayaan perlu dikonfirmasi bersama Oga dan pihak leasing.",
      },
    ],
  },
  routes: {
    home: "/",
    models: "/model",
    model: "/model/:slug",
    simulation: "/simulasi",
    contact: "/hubungi",
  },
  nav: [
    { label: "Beranda", route: "home" },
    { label: "Model", route: "models" },
    { label: "Simulasi", route: "simulation" },
    { label: "Hubungi", route: "contact" },
  ],
  seller: {
    name: "Oga Luisca",
    role: "Sales Consultant BYD",
    dealer: "BYD Arista Palangkaraya",
    area: "Palangka Raya",
    photo: "image.png",
    bio: ["Halo, saya Oga Luisca, Sales Resmi BYD Palangka Raya. Saya membantu customer mendapatkan mobil listrik BYD terbaik sesuai kebutuhan dan budget, dengan proses yang aman, jelas, dan profesional. Fokus saya adalah memberikan pengalaman pembelian yang nyaman, transparan, dan memastikan unit BYD Anda tiba dengan aman sampai di depan rumah."],
    highlights: [],
    services: [],
    testimonials: [],
    contact: {
      whatsapp: "628135419221",
      phone: "[Nomor telepon]",
      email: "[Alamat email]",
      instagram: "[Akun Instagram]",
      tiktok: "[Akun TikTok]",
      address: "Jl. Tjilik Riwut, Bukit Tunggal, Kec. Jekan Raya, Kota Palangka Raya, Kalimantan Tengah 74874",
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1805.1264392900678!2d113.85932556515422!3d-2.170472406758557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dfcb1003471ce77%3A0xf39acb6a817a5ac!2sBYD%20Arista%20Palangkaraya!5e1!3m2!1sid!2sid!4v1793206302543!5m2!1sid!2sid",
      hours: "Open 08.30 - 16.30 WIB",
    },
  },
  cta: {
    whatsappTemplate:
      "Halo Kak Oga, saya tertarik dengan {model} {variant}. Boleh minta informasi dan penawaran?",
  },
  simulation: {
    tenors: [12, 24, 36, 48, 60],
    minDpPercent: 20,
    defaultInterestPercent: 7,
    interestNote: "Estimasi rate 7% /Tahun, tergantung leasing.",
  },
  models: [
    {
      slug: "byd-atto1",
      name: "BYD Atto 1",
      type: "suv",
      tagline: "Harga OTR Palangka Raya mengikuti poster dealer. Hubungi Oga untuk konfirmasi harga terbaru dan ketersediaan.",
      featured: false,
      status: "available",
      priceFrom: 223000000,
      images: {
        folder: "byd-atto1",
        hero: "atto1-1.jpeg",
        card: "atto1-1 card.jpeg",
        gallery: ["atto1-2.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "standard", name: "Standard", price: 223000000, specs: {} },
        { id: "dynamic", name: "Dynamic", price: 236000000, specs: { rangeKm: 300, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "premium", name: "Premium", price: 271000000, specs: { rangeKm: 380, rangeQualifier: "±", rangeStandard: "NEDC" } },
      ],
    },
    {
      slug: "byd-atto3",
      name: "BYD Atto 3",
      type: "suv",
      tagline: "Harga OTR Palangka Raya mengikuti poster dealer. Hubungi Oga untuk konfirmasi harga terbaru dan ketersediaan.",
      featured: false,
      status: "available",
      priceFrom: 445000000,
      images: {
        folder: "byd-atto3",
        hero: "atto3-1.jpeg",
        card: "atto3-1 card.jpeg",
        gallery: ["atto3-2.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "advanced-plus", name: "Advanced +", price: 445000000, specs: { rangeKm: 410, rangeQualifier: "±", rangeStandard: "NEDC" } },
      ],
    },
    {
      slug: "byd-m6",
      name: "BYD M6",
      type: "mpv",
      tagline: "Harga OTR Palangka Raya mengikuti poster dealer. Hubungi Oga untuk konfirmasi harga terbaru dan ketersediaan.",
      featured: false,
      status: "available",
      priceFrom: 418000000,
      images: {
        folder: "byd-m6",
        hero: "m6-1.jpeg",
        card: "m6-1 card.jpeg",
        gallery: ["m6-2.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "standard", name: "Standard", price: 418000000, specs: { rangeKm: 420, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "7s-superior", name: "7S Superior", price: 458000000, specs: { rangeKm: 530, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "6s-superior-captain", name: "6S Superior Captain", price: 468000000, specs: { rangeKm: 530, rangeQualifier: "±", rangeStandard: "NEDC" } },
      ],
    },
    {
      slug: "byd-m6-dm",
      name: "BYD M6 DM",
      type: "mpv",
      tagline: "Bensin bisa, listrik bisa. Poster dealer mencantumkan konsumsi bensin 65 km/L; hubungi Oga untuk konfirmasi detail.",
      featured: false,
      status: "available",
      priceFrom: 320600000,
      images: {
        folder: "byd-m6-dm",
        hero: "m6dm-1.jpeg",
        card: "m6dm-1 card.jpeg",
        gallery: ["m6dm-2.jpeg"],
        colors: [],
      },
      highlights: ["Poster dealer mencantumkan konsumsi bensin 65 km/L."],
      variants: [
        { id: "classic-standard", name: "Classic Standard", price: 320600000, specs: { rangeKm: 1000, rangeQualifier: ">", rangeNote: "Gabungan BBM & listrik" } },
        { id: "classic-dynamic", name: "Classic Dynamic", price: 340600000, specs: { rangeKm: 1000, rangeQualifier: ">", rangeNote: "Gabungan BBM & listrik" } },
        { id: "cross-advance", name: "Cross Advance", price: 382600000, specs: { rangeKm: 1000, rangeQualifier: ">", rangeNote: "Gabungan BBM & listrik" } },
        { id: "cross-superior", name: "Cross Superior", price: 402600000, specs: { rangeKm: 1000, rangeQualifier: ">", rangeNote: "Gabungan BBM & listrik" } },
        { id: "cross-superior-capt", name: "Cross Superior Capt", price: 412600000, specs: { rangeKm: 1000, rangeQualifier: ">", rangeNote: "Gabungan BBM & listrik" } },
      ],
    },
    {
      slug: "byd-sealion",
      name: "BYD Seal",
      type: "sedan",
      tagline: "Harga OTR Palangka Raya mengikuti poster dealer. Hubungi Oga untuk konfirmasi harga terbaru dan ketersediaan.",
      featured: false,
      status: "available",
      priceFrom: 653500000,
      images: {
        folder: "byd-sealion",
        hero: "sealion-1.jpeg",
        card: "sealion-1 card.jpeg",
        gallery: ["sealion-2.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "premium", name: "Premium", price: 653500000, specs: { rangeKm: 650, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "performance", name: "Performance", price: 764500000, specs: { rangeKm: 580, rangeQualifier: "±", rangeStandard: "NEDC" } },
      ],
    },
    {
      slug: "byd-sealion7",
      name: "BYD Sealion 7",
      type: "suv",
      tagline: "Harga OTR Palangka Raya mengikuti poster dealer. Hubungi Oga untuk konfirmasi harga terbaru dan ketersediaan.",
      featured: false,
      status: "available",
      priceFrom: 641500000,
      images: {
        folder: "byd-sealion7",
        hero: "sealion7-1.jpeg",
        card: "sealion7-1 card.jpeg",
        gallery: ["sealion7-2.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "premium", name: "Premium", price: 641500000, specs: { rangeKm: 567, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "performance", name: "Performance", price: 731500000, specs: { rangeKm: 542, rangeQualifier: "±", rangeStandard: "NEDC" } },
        { id: "extended", name: "Extended", price: 900000000, specs: {} },
      ],
    },
    {
      slug: "d9",
      name: "Denza D9",
      type: "mpv",
      tagline: "Poster terbaru 2026 mencantumkan harga OTR Palangka Raya Rp 1.129.000.000; poster lain memuat angka berbeda, jadi konfirmasi varian dan harga terbaru kepada Oga.",
      featured: false,
      status: "available",
      priceFrom: 1129000000,
      images: {
        folder: "d9",
        hero: "Danza D9 New 2026-2.jpeg",
        card: "Danza D9 New 2026-2 card.jpeg",
        gallery: ["Danza D9 New 2026-1.jpeg"],
        colors: [],
      },
      highlights: [],
      variants: [
        { id: "otr-2026", name: "OTR 2026", price: 1129000000, specs: { rangeKm: 600, rangeStandard: "NEDC" } },
      ],
    },
  ],
};
