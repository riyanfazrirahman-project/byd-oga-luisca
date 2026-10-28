# PRD Website Sales Mobil BYD – Oga Luisca

Oct 26, 2026 · @kaos

## 1. Ringkasan & Tujuan

Produk ini adalah website statis personal branding untuk Oga Luisca, sales BYD, yang mengubah pengunjung menjadi chat WhatsApp langsung dengannya. Katalog model BYD menjadi etalase, tetapi yang dijual adalah kepercayaan pada Oga sebagai pribadi, bukan brand dealer.

**Masalah yang diselesaikan:** calon pembeli mobil listrik sering bingung memilih model dan ragu pada sales yang tidak dikenal. Situs resmi seperti [byd.com/id](https://www.byd.com/id) informatif, tetapi tidak mempertemukan pembeli dengan satu orang yang bisa dihubungi dan dipercaya.

**Sasaran utama:**

| Sasaran | Metrik | Target awal (usulan) |
| --- | --- | --- |
| Menghasilkan lead | Klik tombol WhatsApp per bulan | 100 klik, dievaluasi setelah 3 bulan |
| Membangun kepercayaan | Kunjungan ke halaman Hubungi dari halaman model | Minimal 20% dari sesi |
| Cepat di ponsel | Skor Lighthouse mobile (Performance) | 90 atau lebih |
| Mudah dirawat | Menambah satu model baru | Hanya edit satu file data + unggah gambar, tanpa menyentuh HTML |
|  |  |  |

Angka target adalah usulan awal; sesuaikan dengan target penjualan Oga.

## 2. Target Pengguna & Persona

Asumsi: mayoritas pengunjung datang dari tautan di bio Instagram/TikTok atau pesan WhatsApp, sehingga desain harus mobile-first.

| Persona | Kebutuhan | Yang harus dilihat di situs |
| --- | --- | --- |
| Pembeli mobil listrik pertama | Memahami model mana yang cocok, takut salah pilih | Katalog sederhana, perbandingan singkat, simulasi cicilan |
| Pembeli keluarga | Kapasitas kabin, keamanan, jarak tempuh harian | Spesifikasi jelas per varian, galeri interior |
| Pembeli bisnis / armada kecil | Penawaran harga untuk lebih dari satu unit | Tombol minta penawaran khusus, kontak langsung |
| Oga Luisca (pengelola) | Memperbarui harga, promo, dan model tanpa developer | Satu file data yang rapi dan terdokumentasi |

## 3. Ruang Lingkup

Versi 1 adalah situs katalog dan kontak tanpa server, tanpa database, dan tanpa transaksi online.

| Termasuk (in scope) | Tidak termasuk (out of scope) |
| --- | --- |
| 5 halaman: Beranda, Model, Detail Model, Simulasi Kredit, Hubungi | Login, akun pengguna, checkout, pembayaran online |
| Katalog model dan varian dari satu file data | CMS atau panel admin berbasis server |
| Tombol WhatsApp dengan pesan otomatis per model | Chatbot atau live chat |
| Simulasi cicilan di sisi browser | Penyimpanan data pengunjung di server |
| SEO dasar dan analitik klik | Multi bahasa (kandidat fase 2) |
| Halaman Hubungi sebagai profil Oga Luisca | Blog atau artikel (kandidat fase 2) |

## 4. Sitemap & Kebutuhan Fungsional

Menu utama: **Beranda · Model · Simulasi · Hubungi**. Menu Hubungi berfungsi sebagai halaman profil Oga Luisca: foto, cerita singkat, layanan, kontak, dan lokasi.

| Halaman | Rute | Komponen halaman | Tujuan |
| --- | --- | --- | --- |
| Beranda | `/` | `HomePage.jsx` | Memperkenalkan Oga, menampilkan model unggulan, mengarahkan ke WhatsApp |
| Model | `/model` | `ModelsPage.jsx` | Katalog semua model dengan filter tipe (SUV, sedan, hatchback, MPV) |
| Detail Model | `/model/:slug` | `ModelDetailPage.jsx` | Spesifikasi, varian, galeri, harga, tombol tanya Oga |
| Simulasi | `/simulasi` | `SimulationPage.jsx` | Hitung estimasi cicilan dari model, DP, dan tenor |
| Hubungi | `/hubungi` | `ContactPage.jsx` | Profil Oga Luisca, kontak, deskripsi, testimoni, lokasi |
| Tidak ditemukan | `*` | `NotFoundPage.jsx` | Pesan jelas dan tautan kembali ke katalog |

**Kebutuhan fungsional** (P0 = wajib rilis pertama, P1 = penting, P2 = menyusul):

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| FR-01 | Header dan footer sama di semua halaman, dirender dari data pusat | P0 |
| FR-02 | Beranda memuat hero personal (foto, nama, tagline Oga), sorotan model, testimoni singkat, CTA WhatsApp | P0 |
| FR-03 | Katalog menampilkan kartu model dari daftar `models` tanpa HTML manual per model | P0 |
| FR-04 | Filter katalog berdasarkan tipe bodi, tanpa muat ulang halaman | P1 |
| FR-05 | Halaman detail dibuat dari satu komponen, isi diambil dari parameter rute `:slug` | P0 |
| FR-06 | Detail model menampilkan varian, harga mulai dari, spesifikasi kunci, galeri, pilihan warna | P0 |
| FR-07 | Tombol WhatsApp membawa pesan otomatis berisi nama model dan varian yang sedang dilihat | P0 |
| FR-08 | Halaman Hubungi menampilkan foto, bio, angka pencapaian, layanan, testimoni, kontak, jam kerja, peta | P0 |
| FR-09 | Simulasi cicilan: pilih model dan varian, isi DP dan tenor, tampil estimasi per bulan beserta catatan bahwa angka hanya estimasi | P1 |
| FR-10 | Tombol WhatsApp mengambang di ponsel pada semua halaman | P0 |
| FR-11 | Label promo per model (misal periode dan keterangan) tampil bila diisi di data | P1 |
| FR-12 | Disclaimer di footer: situs dikelola Oga Luisca dan bukan situs resmi BYD | P0 |
| FR-13 | Slug tidak dikenal menampilkan pesan dan tautan ke katalog, tidak halaman kosong | P0 |
| FR-14 | Perbandingan dua model berdampingan | P2 |

## 5. Skema Data Model BYD

Setiap mobil adalah satu objek di array `models`. Model yang datanya belum dikonfirmasi boleh memiliki `variants` kosong selama berstatus `coming-soon`; harga `0` berarti harga belum tersedia dan tidak boleh ditampilkan sebagai harga jual. Nama model dan angka spesifikasi harus disalin dari brosur resmi atau dealer, karena lineup dan harga BYD Indonesia dapat berubah (cek [byd.com/id](https://www.byd.com/id)).

| Field | Tipe | Wajib | Keterangan |
| --- | --- | --- | --- |
| `slug` | string | Ya | ID unik untuk URL, huruf kecil dan tanda hubung, misal `seal` |
| `name` | string | Ya | Nama tampil, misal `BYD Seal` |
| `type` | string | Ya | `suv`, `sedan`, `hatchback`, atau `mpv` (dipakai filter) |
| `tagline` | string | Ya | Satu kalimat untuk kartu dan hero |
| `featured` | boolean | Tidak | `true` agar tampil di sorotan Beranda |
| `status` | string | Ya | `available`, `coming-soon`, atau `sold-out` |
| `priceFrom` | number | Ya | Harga mulai dari (rupiah, angka mentah, diformat oleh helper); `0` menandakan harga belum dikonfirmasi dan hanya boleh digunakan untuk model `coming-soon` |
| `promo` | object | Tidak | `{ label, note, until }` |
| `images` | object | Ya | `hero`, `card`, `gallery[]`, `colors[]`, semua relatif terhadap folder model |
| `highlights` | string\[\] | Ya | 3 sampai 5 poin jual singkat |
| `variants` | object\[\] | Ya | Lihat tabel varian; boleh kosong untuk model `coming-soon` yang belum memiliki data varian |
| `brochure` | string | Tidak | Nama file PDF di `assets/docs` |
| `seo` | object | Tidak | `title` dan `description` khusus model |

Field pada setiap varian:

| Field | Tipe | Keterangan |
| --- | --- | --- |
| `id` | string | Unik dalam satu model, misal `premium` |
| `name` | string | Nama varian |
| `price` | number | Harga OTR, angka mentah |
| `specs` | object | `batteryKwh`, `rangeKm`, `powerHp`, `seats`, `drive`, dan lainnya; hanya field yang diisi yang ditampilkan |

Contoh satu entri (nilai angka hanya contoh format, bukan data resmi):

```js
{
  slug: "seal",
  name: "BYD Seal",
  type: "sedan",
  tagline: "Sedan listrik performa tinggi.",
  featured: true,
  status: "available",
  priceFrom: 0, // isi dari daftar harga dealer
  promo: { label: "Promo bulan ini", note: "Isi keterangan", until: "2026-11-30" },
  images: {
    folder: "seal",                  // assets/img/models/seal/
    hero: "hero.webp",
    card: "card.webp",
    gallery: ["gallery-01.webp", "gallery-02.webp"],
    colors: [{ name: "Arctic Blue", hex: "#5b8db8", image: "color-arctic.webp" }]
  },
  highlights: ["Poin jual 1", "Poin jual 2", "Poin jual 3"],
  variants: [
    { id: "premium", name: "Premium", price: 0, specs: { rangeKm: 0, seats: 5 } }
  ]
}
```

## 6. Manajemen Data: Satu File, Dipanggil di Mana Saja

Semua isi situs (profil Oga, kontak, menu, model, varian, FAQ beranda, dan nama file logo) dan semua lokasi aset hidup di satu file, `src/data/site.config.js`, yang mengekspor satu objek `SITE`. Komponen React mengimpornya langsung (`import { SITE } from "@/data/site.config"`), jadi tidak ada fetch, backend, atau state global untuk data. Karena file ini juga menjadi titik awal penentuan folder gambar, ikon, dan dokumen, memindahkan folder aset cukup mengubah satu baris di `paths`. File aset fisik berada di `public/assets/`, sehingga URL-nya stabil di hasil build.

**Aturan emas:**

1. Tidak ada teks, harga, nomor telepon, atau path gambar yang ditulis langsung di HTML atau komponen.
2. Path aset selalu dibangun lewat helper `asset()` yang membaca `SITE.paths`, tidak pernah disusun manual.
3. Nilai di data selalu mentah (angka tanpa titik, nomor WhatsApp tanpa tanda plus); format tampilan dikerjakan helper.
4. Setiap perubahan data diperiksa skrip `validate-config.mjs` sebelum dipublikasikan.

Kerangka file (isi diganti data asli Oga):

```js
// src/data/site.config.js
// Satu-satunya sumber data situs. Jangan menulis teks, harga, kontak, atau path aset di komponen.

// "" di root domain, "/nama-repo" bila di-deploy ke subpath (diatur lewat `base` di vite.config.js)
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const SITE = {
  meta: {
    name: "Oga Luisca – Sales BYD",
    tagline: "Konsultan mobil listrik BYD Anda",
    url: "https://contoh-domain.com",
    lang: "id",
    disclaimer: "Situs ini dikelola oleh Oga Luisca, sales BYD di [Nama Dealer]. Bukan situs resmi BYD."
  },

  // Titik awal semua lokasi aset (file fisik di public/assets/)
  paths: {
    base: BASE,
    brand: `${BASE}/assets/img/brand`,
    seller: `${BASE}/assets/img/seller`,
    models: `${BASE}/assets/img/models`,
    icons: `${BASE}/assets/icons`,
    docs: `${BASE}/assets/docs`
  },

  // Rute aplikasi (React Router), bukan file HTML
  routes: {
    home: "/",
    models: "/model",
    model: "/model/:slug",
    simulation: "/simulasi",
    contact: "/hubungi"
  },

  nav: [
    { label: "Beranda", route: "home" },
    { label: "Model", route: "models" },
    { label: "Simulasi", route: "simulation" },
    { label: "Hubungi", route: "contact" }
  ],

  seller: {
    name: "Oga Luisca",
    role: "Sales Consultant BYD",
    dealer: "[Nama Dealer]",
    area: "[Kota / area layanan]",
    photo: "oga-portrait.webp",            // relatif ke paths.seller
    bio: ["Paragraf perkenalan 1", "Paragraf perkenalan 2"],
    highlights: [{ label: "Pengalaman", value: "[isi]" }, { label: "Unit terkirim", value: "[isi]" }],
    services: ["Test drive", "Simulasi kredit", "Trade-in", "Pendampingan serah terima"],
    testimonials: [{ name: "[Nama]", text: "[Kutipan]", photo: "" }],
    contact: {
      whatsapp: "62XXXXXXXXXX",
      phone: "+62 XXX",
      email: "[email]",
      instagram: "[akun]",
      tiktok: "[akun]",
      address: "[alamat dealer]",
      mapsEmbedUrl: "[url embed peta]",
      hours: "Senin–Sabtu, 09.00–18.00"
    }
  },

  cta: {
    whatsappTemplate: "Halo Kak Oga, saya tertarik dengan {model} {variant}. Boleh minta info dan penawaran?"
  },

  simulation: { tenors: [12, 24, 36, 48, 60], minDpPercent: 20, defaultInterestPercent: 0 },

  models: [ /* objek model sesuai skema bagian 5 */ ]
};
```

Helper yang memakai objek ini dan boleh dipanggil dari halaman mana pun:

| Helper | File | Fungsi |
| --- | --- | --- |
| `asset(group, file)` | `src/lib/paths.js` | Mengembalikan URL aset, misal `asset("seller", SITE.seller.photo)` |
| `modelAsset(model, file)` | `src/lib/paths.js` | URL gambar di folder model tertentu |
| `routePath(key, params)` | `src/lib/paths.js` | Path rute, misal `routePath("model", { slug: "seal" })` menjadi `/model/seal` |
| `getModel(slug)` | `src/lib/data.js` | Mencari model; mengembalikan `undefined` jika tidak ada |
| `formatRupiah(n)` | `src/lib/format.js` | `250000000` menjadi `Rp 250.000.000` |
| `waLink(model, variant)` | `src/lib/whatsapp.js` | Tautan `wa.me` dengan pesan dari `cta.whatsappTemplate` |
| `cn(...classes)` | `src/lib/utils.js` | Penggabung class Tailwind, dibuat otomatis oleh shadcn |

**Cara Oga merawat data:** tambah model = salin satu objek model, isi, unggah gambar ke folder yang namanya sama dengan `images.folder`, jalankan validasi, lalu publikasikan. Skrip validasi menolak data bila slug ganda, file gambar tidak ditemukan, harga kosong, atau nomor WhatsApp tidak valid.

## 7. Struktur File & Folder

Proyek mengikuti struktur standar Vite + shadcn/ui: halaman di `src/pages`, komponen shadcn di `src/components/ui` (dibuat CLI), komponen buatan sendiri dikelompokkan per domain, logika bersama di `src/lib`, dan data di `src/data`. Aset fisik ada di `public/assets` supaya URL-nya tidak berubah saat build.

```text
oga-byd-site/
├── AGENTS.md                  # instruksi untuk AI (lihat bagian 13)
├── README.md                  # cara merawat data dan publikasi
├── index.html                 # satu <div id="root"> + meta dasar
├── package.json
├── vite.config.js             # plugin react + tailwind, alias @, base
├── jsconfig.json              # alias @/* -> ./src/*
├── components.json            # konfigurasi shadcn (tsx: false)
├── eslint.config.js
│
├── public/                    # disajikan apa adanya di root situs
│   ├── _redirects             # Netlify: /*  /index.html  200 (fallback SPA)
│   ├── robots.txt
│   ├── sitemap.xml            # dihasilkan skrip dari data
│   ├── favicon.svg
│   └── assets/
│       ├── img/
│       │   ├── brand/         # logo-oga.svg, og-default.jpg
│       │   ├── seller/        # oga-portrait.webp, foto kegiatan
│       │   └── models/
│       │       └── <slug>/    # hero.webp, card.webp, gallery-01.webp, color-*.webp
│       ├── icons/             # ikon sosial dan logo yang tidak ada di lucide
│       └── docs/              # brosur PDF per model
│
├── scripts/
│   ├── validate-config.mjs    # cek data dan keberadaan file gambar
│   └── generate-sitemap.mjs   # sitemap.xml dari SITE.models
│
└── src/
    ├── main.jsx               # createRoot + RouterProvider
    ├── App.jsx                # definisi rute
    ├── index.css              # @import "tailwindcss" + token tema shadcn
    ├── data/
    │   └── site.config.js     # SATU-SATUNYA sumber data dan titik awal path aset
    ├── lib/
    │   ├── utils.js           # cn() (dibuat shadcn)
    │   ├── paths.js           # asset(), modelAsset(), routePath()
    │   ├── data.js            # getModel(), filterModels()
    │   ├── format.js          # formatRupiah(), formatTanggal()
    │   ├── whatsapp.js        # waLink()
    │   ├── installment.js     # hitungCicilan()
    │   └── analytics.js       # pembungkus event klik
    ├── hooks/
    │   └── use-model.js       # useModel(slug)
    ├── components/
    │   ├── ui/                # dibuat CLI shadcn (button, card, badge, ...)
    │   ├── layout/            # SiteHeader, SiteFooter, FloatingWhatsApp, PageShell
    │   ├── model/             # ModelCard, ModelFilter, SpecTable, ModelGallery, VariantPicker
    │   ├── seller/            # SellerHero, SellerProfile, Testimonials, ContactCard
    │   └── seo/               # Seo.jsx (title, meta, JSON-LD per halaman)
    └── pages/
        ├── HomePage.jsx
        ├── ModelsPage.jsx
        ├── ModelDetailPage.jsx
        ├── SimulationPage.jsx
        ├── ContactPage.jsx
        └── NotFoundPage.jsx
```

**Konvensi:**

| Hal | Aturan |
| --- | --- |
| Komponen React | `PascalCase.jsx`, satu komponen utama per file, ekspor default |
| Hook dan helper | `use-nama.js` untuk hook, `camelCase.js` atau satu kata untuk helper di `src/lib` |
| Impor | Selalu alias `@/` (misal `@/lib/paths`), tidak memakai `../../` |
| `components/ui` | Hasil CLI shadcn; diubah lewat variant dan class, bukan ditulis ulang dari nol |
| Gaya | Tailwind utility class; warna lewat token tema (`bg-primary`, `text-muted-foreground`), tidak memakai hex langsung |
| Nama folder aset dan slug | huruf kecil, tanda hubung, tanpa spasi; slug model sama dengan nama folder gambarnya |
| Format gambar | WebP; hero 1600 px, kartu 800 px, galeri 1200 px (usulan), maksimal 250 KB per gambar |

## 8. Arsitektur Teknis & Reusability

Situs adalah single-page application React yang dibangun dengan Vite menjadi berkas statis (`npm run build` menghasilkan folder `dist/`), sehingga tetap bisa diunggah ke hosting statis mana pun tanpa server.

| Aspek | Keputusan | Alasan |
| --- | --- | --- |
| Bahasa | JavaScript (JSX), bukan TypeScript | Sesuai permintaan React JS; shadcn/ui menyediakan versi JavaScript lewat `"tsx": false` di `components.json` ([panduan](https://ui.shadcn.com/docs/javascript)) |
| Framework dan build | React 19 atau lebih baru + Vite | Cepat, hasil build statis |
| Komponen UI | shadcn/ui di atas Tailwind CSS v4 (`@tailwindcss/vite`) | Mengikuti [panduan instalasi Vite](https://ui.shadcn.com/docs/installation/vite); kode komponen disalin ke repo sehingga bisa diubah bebas |
| Ikon | `lucide-react` | Ikon bawaan shadcn |
| Routing | React Router; rute `/`, `/model`, `/model/:slug`, `/simulasi`, `/hubungi`, `*` | URL bersih; `basename` dari `import.meta.env.BASE_URL` |
| Sumber data | `src/data/site.config.js` (objek `SITE`) | Satu file, diimpor dari komponen mana pun |
| Meta halaman | Komponen `Seo` merender `<title>` dan `<meta>` langsung (didukung React 19) | Tanpa library tambahan |
| Hosting (pilih salah satu) | Cloudflare Pages atau Netlify (fallback SPA via `public/_redirects`); GitHub Pages butuh salinan `404.html` | Gratis untuk situs statis, HTTPS otomatis |
| Validasi data | `scripts/validate-config.mjs` dijalankan lewat `prebuild` | Build gagal bila data rusak |

**Setup proyek** (sesuai panduan shadcn untuk Vite, disesuaikan ke JavaScript):

```bash
npm create vite@latest oga-byd-site -- --template react
cd oga-byd-site
npm install tailwindcss @tailwindcss/vite react-router lucide-react
# isi src/index.css dengan:  @import "tailwindcss";
# lalu buat vite.config.js dan jsconfig.json (di bawah)
npx shadcn@latest init            # pastikan components.json berisi "tsx": false
npx shadcn@latest add button card badge tabs select slider input sheet carousel accordion toggle-group separator avatar table
```

```js
// vite.config.js
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // ganti "/nama-repo/" bila di subpath
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }
});
```

```json
// jsconfig.json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } }, "include": ["src"] }
```

**Alur data (digambar di bawah):** `index.html` hanya memuat `main.jsx`; `App.jsx` memetakan rute ke komponen halaman; halaman mengimpor `SITE` dan helper `lib`, menyusun tampilan dari `components` (shadcn dan komponen sendiri), lalu React merendernya ke `#root`.

&#91;embedded content: alur data · 6 komponen\]

Perubahan di `site.config.js` langsung tampil di semua halaman, dan memindahkan folder aset cukup dengan mengubah `paths`.

**Trade-off yang diterima:** karena konten dirender di browser (SPA), mesin pencari yang tidak menjalankan JavaScript hanya melihat `index.html` dasar. Mitigasinya ada di bagian 10 (meta dasar statis, sitemap, dan prarender per rute pada fase lanjutan).

## 9. Desain, UX & Personal Branding

Situs harus terasa seperti milik Oga: wajah dan namanya tampil di setiap halaman penting, sementara model BYD menjadi isi, bukan tokoh utama.

**Prinsip desain:**

- Foto Oga di hero Beranda dan di Hubungi; nama dan tagline pribadi di header.
- Tombol WhatsApp muncul di hero, di setiap kartu model, di halaman detail, dan sebagai tombol mengambang.
- Tampilan katalog meniru pola [byd.com/id](https://www.byd.com/id) (kartu besar, gambar mobil dominan, harga "mulai dari"), tetapi dengan identitas visual sendiri, bukan salinan situs resmi.
- Mobile-first: lebar acuan 360 px, tombol minimal 44 px, teks isi minimal 16 px.
- Warna dan font didefinisikan sebagai token CSS di `src/index.css` supaya mudah diganti.

**Isi halaman Hubungi (profil Oga Luisca):**

| Urutan | Blok | Sumber data |
| --- | --- | --- |
| 1 | Foto, nama, jabatan, dealer, area layanan | `seller.photo`, `name`, `role`, `dealer`, `area` |
| 2 | Deskripsi diri (cerita singkat dan alasan memilih Oga) | `seller.bio` |
| 3 | Angka pencapaian | `seller.highlights` |
| 4 | Layanan yang diberikan | `seller.services` |
| 5 | Testimoni pelanggan | `seller.testimonials` |
| 6 | Kontak: WhatsApp (tombol utama), telepon, email, Instagram, TikTok | `seller.contact` |
| 7 | Alamat, jam kerja, peta | `seller.contact.address`, `hours`, `mapsEmbedUrl` |

**Kondisi khusus:** model berstatus `coming-soon` menampilkan tombol "Tanya info", bukan "Minta penawaran"; model `sold-out` ditandai dan diurutkan paling bawah; gambar yang gagal dimuat diganti gambar pengganti netral.

## 10. SEO, Performa & Analitik

| Area | Kebutuhan | Prioritas |
| --- | --- | --- |
| Meta statis | `index.html` berisi `<title>`, deskripsi, dan Open Graph default, agar tetap ada meski JavaScript tidak berjalan | P0 |
| Meta per halaman | Komponen `Seo` merender `<title>`, deskripsi, dan gambar OG dari data model atau halaman | P0 |
| Data terstruktur | JSON-LD `Person` untuk Oga dan `Product` atau `Vehicle` per model | P1 |
| Sitemap dan robots | `generate-sitemap.mjs` membuat `sitemap.xml` dari `SITE.models` (URL `/model/<slug>`) | P1 |
| Prarender | HTML statis per rute agar terbaca mesin pencari tanpa JavaScript (pustaka SSG untuk Vite atau skrip sendiri) | P2 |
| Code splitting | Setiap halaman dimuat dengan `React.lazy` | P1 |
| Gambar | WebP, atribut `width` dan `height`, `loading="lazy"` kecuali hero | P0 |
| Performa | Lighthouse mobile Performance 90 atau lebih; JS muat awal di bawah 200 KB gzip (usulan) | P0 |
| Aksesibilitas | Teks alternatif gambar, kontras memadai, navigasi keyboard (komponen shadcn berbasis Radix sudah membantu) | P1 |
| Analitik | Pencatat sederhana tanpa cookie (misal Plausible) atau GA4; keputusan di pertanyaan terbuka | P1 |

Event yang dicatat: `click_whatsapp` (dengan label halaman dan model), `view_model`, `submit_simulation`, `click_phone`, dan `click_social`.

## 11. Kriteria Penerimaan & Roadmap

Versi 1 dianggap selesai bila semua butir berikut terpenuhi:

- [ ] Lima halaman dan halaman 404 tampil benar di lebar 360 px, 768 px, dan 1280 px
- [ ] Menambah model baru hanya dengan mengedit `site.config.js` dan mengunggah gambar; tidak ada komponen yang diubah
- [ ] Tidak ada teks, harga, kontak, atau path gambar yang tertulis langsung di komponen atau `index.html` (kecuali meta dasar)
- [ ] Memindahkan folder aset cukup dengan mengubah `paths` di `site.config.js`
- [ ] Tombol WhatsApp membuka chat dengan pesan berisi nama model dan varian yang benar
- [ ] Halaman Hubungi menampilkan seluruh blok profil dari data `seller`
- [ ] Slug tidak dikenal menampilkan halaman 404 yang jelas, bukan halaman kosong
- [ ] Membuka langsung `/model/<slug>` atau `/hubungi` (refresh browser) berfungsi di hosting yang dipilih
- [ ] `npm run build` dan `validate-config.mjs` lulus tanpa galat
- [ ] Lighthouse mobile Performance 90 atau lebih pada Beranda dan Detail Model
- [ ] Disclaimer "bukan situs resmi BYD" tampil di footer semua halaman

**Tahapan pengerjaan:**

| Fase | Isi | Selesai bila |
| --- | --- | --- |
| 1. Fondasi | Setup Vite + Tailwind + shadcn, `site.config.js`, helper `lib`, tema, `SiteHeader`, `SiteFooter`, `FloatingWhatsApp`, rute kosong | Header dan footer tampil dari data di semua rute |
| 2. Halaman inti | Beranda, Model, Detail Model, Hubungi, 404 | Semua FR berprioritas P0 lulus |
| 3. Fitur tambahan | Simulasi cicilan, filter katalog, label promo, JSON-LD, analitik, code splitting | Semua FR berprioritas P1 lulus |
| 4. Peluncuran | Isi data asli, optimasi gambar, uji perangkat, domain, sitemap, fallback SPA | Kriteria penerimaan di atas semua tercentang |
| 5. Lanjutan | Prarender per rute, perbandingan model, multi bahasa, blog | Disepakati setelah evaluasi 3 bulan |

## 12. Risiko & Pertanyaan Terbuka

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Situs terlihat seperti situs resmi BYD | Masalah merek dan kepercayaan | Disclaimer di footer, identitas visual milik Oga, nama dealer dicantumkan |
| Foto dan logo BYD dipakai tanpa izin | Masalah hak cipta | Pakai materi dari dealer atau media resmi yang diizinkan; simpan bukti izin |
| Harga dan spesifikasi usang | Pembeli kecewa, Oga kehilangan kredibilitas | Tampilkan tanggal pembaruan harga; harga hanya dari satu file sehingga mudah dikoreksi |
| SPA kurang terbaca mesin pencari | Trafik organik rendah | Meta dasar statis, sitemap, JSON-LD, prarender di fase 5 |
| Refresh di rute dalam menghasilkan 404 di hosting | Tautan yang dibagikan rusak | Fallback SPA (`_redirects` atau setelan hosting), diuji di kriteria penerimaan |
| Salah ketik di data merusak halaman | Halaman kosong | `validate-config.mjs` di `prebuild` dan penanganan slug tidak dikenal |
| Komponen `ui/` shadcn diubah liar | Sulit memperbarui dan membingungkan AI | Ubah lewat variant atau bungkus di komponen sendiri; aturan ada di `AGENTS.md` |
| Nomor WhatsApp pribadi terbuka umum | Spam | Pertimbangkan WhatsApp Business dan jam kerja yang jelas |

**Pertanyaan terbuka untuk dikonfirmasi:**

- [ ] Nama dealer dan status Oga (karyawan dealer resmi atau mitra), untuk teks disclaimer
- [ ] Daftar model dan varian yang akan dijual pertama, beserta sumber harga resminya
- [ ] Apakah Oga sudah punya domain, foto profesional, dan akun WhatsApp Business
- [ ] Pilihan analitik: Plausible atau GA4
- [ ] Apakah simulasi cicilan perlu bunga per leasing atau cukup estimasi umum
- [ ] Preferensi warna dan gaya visual personal (misal gelap elegan atau terang bersih)

## 13. Instruksi untuk AI (AGENTS.md)

File `AGENTS.md` di root repo adalah panduan yang dibaca asisten AI (Claude Code, Cursor, Copilot, dan sejenisnya) sebelum mengubah kode. Isinya merangkum seluruh keputusan di PRD ini dalam bentuk aturan yang bisa diikuti mesin:

- stack dan versi, serta perintah setup, dev, validasi, dan build
- peta folder dan tanggung jawab tiap folder
- aturan emas data: semua isi dan path aset hanya dari `site.config.js`
- skema data model dan prosedur menambah model baru
- cara memakai dan menambah komponen shadcn dalam mode JavaScript
- konvensi penamaan, gaya, dan hal yang dilarang
- daftar pemeriksaan sebelum menyatakan pekerjaan selesai

File ini dikirim terpisah sebagai `AGENTS.md`; salin ke root repo. Bila isi PRD berubah (misalnya skema data), perbarui `AGENTS.md` pada saat yang sama.
