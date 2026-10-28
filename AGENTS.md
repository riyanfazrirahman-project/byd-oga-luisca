# AGENTS.md — Website Sales BYD Oga Luisca

Panduan untuk asisten AI (Claude Code, Cursor, Copilot, dll.) yang bekerja di repo ini.
Baca seluruh file ini sebelum mengubah kode. Sumber kebutuhan produk: PRD "Website Sales Mobil BYD – Oga Luisca".

## 1. Apa proyek ini

Website statis **personal branding** untuk **Oga Luisca**, sales mobil BYD. Pengunjung melihat katalog model BYD, lalu menghubungi Oga lewat WhatsApp. Yang dijual adalah kepercayaan pada Oga sebagai pribadi, bukan brand dealer.

- Referensi tata letak katalog: https://www.byd.com/id (tiru pola, jangan salin desain, teks, atau aset).
- Menu utama: **Beranda · Model · Simulasi · Hubungi**. Halaman **Hubungi** adalah profil Oga: foto, deskripsi, kontak, layanan, testimoni, lokasi.
- Situs ini **bukan situs resmi BYD**. Disclaimer wajib tampil di footer setiap halaman.
- Tidak ada backend, database, login, atau pembayaran. Semua data statis di satu file.

## 2. Stack

| Bagian | Pilihan |
| --- | --- |
| Bahasa | **JavaScript (JSX)**, bukan TypeScript. Jangan membuat file `.ts` atau `.tsx`. |
| Framework | React 19+ dengan Vite |
| UI | shadcn/ui (mode JavaScript, `"tsx": false` di `components.json`) |
| Styling | Tailwind CSS v4 lewat plugin `@tailwindcss/vite` (tidak ada `tailwind.config.js`) |
| Ikon | `lucide-react` |
| Routing | React Router v7 (`createBrowserRouter`, impor dari `react-router`) |
| Data | Satu objek `SITE` di `src/data/site.config.js` |
| Hosting | Statis (Cloudflare Pages / Netlify / GitHub Pages) |

Dokumentasi resmi yang jadi acuan setup: https://ui.shadcn.com/docs/installation/vite dan https://ui.shadcn.com/docs/javascript

## 3. Perintah

```bash
npm install
npm run dev        # server pengembangan Vite
npm run validate   # node scripts/validate-config.mjs
npm run build      # prebuild menjalankan validate, lalu vite build ke dist/
npm run preview    # uji hasil build secara lokal
npm run lint
npx shadcn@latest add <komponen>   # menambah komponen shadcn ke src/components/ui
```

`package.json` harus punya: `"prebuild": "npm run validate"`, `"validate": "node scripts/validate-config.mjs"`.

## 4. Struktur folder

```text
├── AGENTS.md
├── index.html                 # hanya <div id="root"> + meta dasar
├── vite.config.js             # react(), tailwindcss(), alias @ -> src, base
├── jsconfig.json              # alias @/* -> ./src/*
├── components.json            # shadcn, tsx: false
├── public/                    # disajikan apa adanya di root situs
│   ├── _redirects             # /*  /index.html  200  (fallback SPA di Netlify)
│   ├── robots.txt, sitemap.xml, favicon.svg
│   └── assets/
│       ├── img/brand/  img/seller/  img/models/<slug>/
│       ├── icons/
│       └── docs/              # brosur PDF
├── scripts/
│   ├── validate-config.mjs
│   └── generate-sitemap.mjs
└── src/
    ├── main.jsx, App.jsx, index.css
    ├── data/site.config.js    # SATU-SATUNYA sumber data
    ├── lib/                   # utils (cn), paths, data, format, whatsapp, installment, analytics
    ├── hooks/                 # use-model.js, dst.
    ├── components/
    │   ├── ui/                # dibuat CLI shadcn
    │   ├── layout/            # SiteHeader, SiteFooter, FloatingWhatsApp, PageShell
    │   ├── model/             # ModelCard, ModelFilter, SpecTable, ModelGallery, VariantPicker
    │   ├── seller/            # SellerHero, SellerProfile, Testimonials, ContactCard
    │   └── seo/               # Seo.jsx
    └── pages/                 # HomePage, ModelsPage, ModelDetailPage, SimulationPage, ContactPage, NotFoundPage
```

Rute: `/` Beranda · `/model` Katalog · `/model/:slug` Detail · `/simulasi` · `/hubungi` · `*` 404.

## 5. Aturan emas data (paling penting)

1. **Semua isi situs dan semua lokasi aset berasal dari `SITE`** di `src/data/site.config.js`. Itu mencakup nama, tagline, bio, kontak, menu, model, varian, harga, promo, template pesan WhatsApp, dan folder aset.
2. **Dilarang menulis di komponen atau halaman:** teks konten, harga, nomor telepon/WhatsApp, nama model, atau path gambar. Ambil dari `SITE` lewat helper.
3. **Path aset selalu lewat helper** `asset()`, `modelAsset()`, `routePath()` di `src/lib/paths.js`. Jangan menyusun string path manual.
4. **Data di `SITE` berupa nilai mentah:** harga sebagai angka (`250000000`), nomor WhatsApp sebagai `62812...` tanpa `+`/spasi. Format tampilan dikerjakan helper (`formatRupiah`).
5. Memindahkan folder aset = mengubah `SITE.paths`, tanpa menyentuh komponen.
6. Setelah mengubah data, jalankan `npm run validate`.

Bila konten belum ada, pakai placeholder berkurung siku seperti `"[Nama Dealer]"`. **Jangan mengarang** harga, spesifikasi, angka pencapaian, testimoni, atau nomor kontak. Data BYD diisi pemilik dari brosur atau daftar harga dealer.

## 6. Bentuk data `SITE`

```js
// src/data/site.config.js (ringkas; struktur lengkap ada di file aslinya)
export const SITE = {
  meta: { name, tagline, url, lang: "id", disclaimer },
  paths: { base, brand, seller, models, icons, docs },     // URL aset; fisik di public/assets/
  brandAssets: { bydLogo, aristaLogo },                    // nama file logo di public/
  homeFaqs: { title, items: [{ question, answer }] },      // konten FAQ beranda
  routes: { home: "/", models: "/model", model: "/model/:slug", simulation: "/simulasi", contact: "/hubungi" },
  nav: [{ label, route }],                                  // route = kunci di SITE.routes
  seller: {
    name, role, dealer, area, photo, bio: [string], highlights: [{ label, value }],
    services: [string], testimonials: [{ name, text, photo }],
    contact: { whatsapp, phone, email, instagram, tiktok, address, mapsEmbedUrl, hours }
  },
  cta: { whatsappTemplate },                                // pakai {model} dan {variant}
  simulation: { tenors: [number], minDpPercent, defaultInterestPercent },
  models: [Model]
};
```

Satu `Model`:

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `slug` | string | ya | unik, huruf kecil + tanda hubung; sama dengan `images.folder` |
| `name` | string | ya | nama tampil |
| `type` | `"suv" \| "sedan" \| "hatchback" \| "mpv"` | ya | untuk filter |
| `tagline` | string | ya | satu kalimat |
| `featured` | boolean | tidak | tampil di sorotan Beranda |
| `status` | `"available" \| "coming-soon" \| "sold-out"` | ya | menentukan tombol dan urutan |
| `priceFrom` | number | ya | rupiah, angka mentah; gunakan `0` bila harga belum dikonfirmasi dan `status: "coming-soon"` |
| `promo` | `{ label, note, until }` | tidak | tampil bila ada |
| `images` | `{ folder, hero, card, gallery[], colors[{ name, hex, image }] }` | ya | nama file relatif ke `public/assets/img/models/<folder>/` |
| `highlights` | string[] | ya | 3–5 poin |
| `variants` | `{ id, name, price, specs }[]` | ya | boleh `[]` saat `status: "coming-soon"` dan varian belum dikonfirmasi; `specs`: `batteryKwh`, `rangeKm`, `powerHp`, `seats`, `drive`, ...; tampilkan hanya field yang terisi |
| `brochure` | string | tidak | nama file di `public/assets/docs/` |
| `seo` | `{ title, description }` | tidak | override meta halaman detail |

Status model: `coming-soon` menampilkan tombol "Tanya info" (bukan "Minta penawaran") dan dapat dipakai sementara saat harga/varian belum dikonfirmasi; harga `0` tidak ditampilkan sebagai harga jual. `sold-out` diberi penanda dan diurutkan paling bawah.

## 7. Pola kode

**Helper path** (`src/lib/paths.js`):

```js
import { SITE } from "@/data/site.config";

export function asset(group, file) {
  const base = SITE.paths[group];
  if (!base) throw new Error(`Grup aset tidak dikenal: ${group}`);
  return `${base}/${file}`;
}
export function modelAsset(model, file) {
  return `${SITE.paths.models}/${model.images.folder}/${file}`;
}
export function routePath(key, params = {}) {
  const pattern = SITE.routes[key];
  if (!pattern) throw new Error(`Rute tidak dikenal: ${key}`);
  return pattern.replace(/:(\w+)/g, (_, name) => encodeURIComponent(params[name]));
}
```

**WhatsApp** (`src/lib/whatsapp.js`):

```js
import { SITE } from "@/data/site.config";

export function waLink(model, variant) {
  const text = SITE.cta.whatsappTemplate
    .replace("{model}", model?.name ?? "mobil BYD")
    .replace("{variant}", variant?.name ?? "")
    .replace(/\s+/g, " ")
    .trim();
  return `https://wa.me/${SITE.seller.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
```

**Komponen** mengambil data dari `SITE` atau dari props yang berasal dari `SITE`:

```jsx
import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { modelAsset, routePath } from "@/lib/paths";
import { formatRupiah } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

export default function ModelCard({ model }) {
  return (
    <Card className="overflow-hidden">
      <Link to={routePath("model", { slug: model.slug })}>
        <img src={modelAsset(model, model.images.card)} alt={model.name} loading="lazy" width={800} height={500} />
      </Link>
      <CardContent className="space-y-2 pt-4">
        {model.promo && <Badge>{model.promo.label}</Badge>}
        <h3 className="text-lg font-semibold">{model.name}</h3>
        <p className="text-muted-foreground text-sm">{model.tagline}</p>
        <p className="font-medium">Mulai dari {formatRupiah(model.priceFrom)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={waLink(model)} target="_blank" rel="noreferrer">Tanya Oga</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

**Halaman detail** mengambil model dengan `useParams()` lalu `getModel(slug)`. Bila hasilnya kosong, render `NotFoundPage` (jangan halaman kosong).

**Router** (`App.jsx`): `createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })`. Muat halaman dengan `React.lazy` + `Suspense`.

**Meta halaman:** komponen `Seo` merender `<title>` dan `<meta>` langsung di JSX (didukung React 19), nilainya dari `SITE` atau `model.seo`.

## 8. shadcn/ui dalam mode JavaScript

- `components.json` harus berisi `"tsx": false`, alias `@/components`, `@/components/ui`, `@/lib`, `@/hooks`, `@/lib/utils`, dan `tailwind.css` menunjuk `src/index.css`.
- Alias `@` diatur di dua tempat: `vite.config.js` (`resolve.alias`) dan `jsconfig.json` (`paths: { "@/*": ["./src/*"] }`).
- Tambah komponen hanya lewat CLI: `npx shadcn@latest add <nama>`. Hasilnya berupa `.jsx` di `src/components/ui/`.
- **Jangan menulis ulang atau mengedit besar-besaran `src/components/ui/*`.** Ubah tampilan lewat `className`, `variant`, atau bungkus di komponen sendiri (misal `components/model/`). Edit kecil di file ui hanya bila benar-benar perlu.
- Pakai `cn()` dari `@/lib/utils` untuk menggabung class.
- Tema (warna, radius) ada sebagai CSS variable di `src/index.css`. Pakai token: `bg-primary`, `text-muted-foreground`, `border`, dst. Jangan hex langsung.
- Komponen yang direncanakan: `button card badge tabs select slider input sheet carousel accordion toggle-group separator avatar table`.

## 9. Styling dan UX

- **Mobile-first.** Lebar acuan 360 px; tombol minimal 44 px tinggi; teks isi minimal 16 px.
- Tombol WhatsApp ada di hero, setiap kartu model, halaman detail, dan sebagai tombol mengambang (`FloatingWhatsApp`) di ponsel.
- Foto dan nama Oga tampil menonjol di Beranda dan Hubungi (personal branding adalah tujuan utama).
- Gambar: WebP, beri `width`/`height`, `loading="lazy"` kecuali hero, teks `alt` bermakna.
- Urutan blok halaman Hubungi: foto + nama + jabatan + dealer + area → bio → angka pencapaian → layanan → testimoni → kontak (WhatsApp sebagai tombol utama) → alamat, jam kerja, peta.

## 10. Fitur dan aturan bisnis

- **Katalog:** kartu dari `SITE.models`; filter tipe bodi tanpa reload.
- **Detail model:** varian, harga mulai dari, spesifikasi kunci, galeri, pilihan warna, tombol WhatsApp berisi nama model dan varian.
- **Simulasi cicilan** (`src/lib/installment.js`): input model, varian, DP (minimal `minDpPercent`), tenor dari `SITE.simulation.tenors`. Selalu tampilkan catatan bahwa angka hanya estimasi dan bukan penawaran resmi. Metode hitung bunga belum diputuskan pemilik; sampai ada keputusan, pakai rumus anuitas standar dan beri komentar `// TODO: konfirmasi metode leasing`.
- **Analitik:** panggil pembungkus di `src/lib/analytics.js` untuk event `click_whatsapp` (label halaman + model), `view_model`, `submit_simulation`, `click_phone`, `click_social`.
- **Hosting SPA:** refresh di `/model/seal` harus bekerja. Pastikan `public/_redirects` ada dan jangan mengubah rute tanpa memperbarui sitemap.

## 11. Tugas umum (resep)

**Tambah model baru**
1. Salin satu objek di `SITE.models`, ubah semua field.
2. Taruh gambar di `public/assets/img/models/<slug>/` (WebP, maks 250 KB per gambar; hero 1600 px, kartu 800 px, galeri 1200 px).
3. `npm run validate`, lalu `npm run build`.
4. Tidak ada komponen yang perlu diubah. Bila ternyata perlu, berarti ada data yang di-hardcode: perbaiki akarnya.

**Ubah kontak atau bio Oga:** edit `SITE.seller` saja.

**Tambah halaman:** tambah rute di `SITE.routes`, tambah entri `nav` bila perlu, buat `src/pages/NamaPage.jsx`, daftarkan di `App.jsx` (lazy), tambahkan ke `generate-sitemap.mjs`.

**Tambah komponen shadcn:** `npx shadcn@latest add <nama>`, impor dari `@/components/ui/<nama>`.

**Pindah folder aset:** ubah `SITE.paths` dan pindahkan fisiknya di `public/assets/`.

## 12. Aturan `validate-config.mjs`

Skrip menolak (exit code 1) bila: slug ganda atau tidak sesuai pola, `priceFrom` atau `variants[].price` kosong/bukan angka, model selain `coming-soon` tidak memiliki varian, `type` atau `status` di luar nilai yang diizinkan, nomor WhatsApp bukan digit berawalan `62`, file gambar di `images` tidak ditemukan di `public/assets/img/models/<folder>/`, `brochure` tidak ditemukan, `nav[].route` tidak ada di `routes`, atau placeholder `[...]` masih tersisa saat `NODE_ENV=production` (peringatan boleh di dev).

## 13. Larangan

- Jangan memakai TypeScript, class components, atau library state global (Redux, Zustand) — tidak dibutuhkan.
- Jangan menambah backend, API call, atau database.
- Jangan hardcode konten, harga, kontak, atau path aset (lihat bagian 5).
- Jangan menyalin teks, foto, atau logo dari byd.com atau sumber lain tanpa izin; pakai aset yang disediakan pemilik di `public/assets/`.
- Jangan mengarang data BYD (harga, spesifikasi, promo) atau testimoni.
- Jangan membuat situs tampak sebagai situs resmi BYD; disclaimer di footer tidak boleh dihapus.
- Jangan mengedit besar-besaran `src/components/ui/*`.
- Jangan menambah dependensi besar tanpa alasan; JS muat awal ditargetkan di bawah 200 KB gzip.
- Jangan memakai warna hex langsung; pakai token tema.

## 14. Sebelum menyatakan pekerjaan selesai

- [ ] `npm run validate` lulus
- [ ] `npm run build` lulus tanpa galat
- [ ] `npm run lint` bersih
- [ ] Tidak ada teks, harga, kontak, atau path gambar baru yang di-hardcode di komponen
- [ ] Tampilan dicek di lebar 360 px dan 1280 px
- [ ] Refresh di `/model/<slug>` dan `/hubungi` tidak 404 pada hasil `npm run preview`
- [ ] Disclaimer "bukan situs resmi BYD" masih tampil di footer
- [ ] Bila skema data berubah: perbarui `validate-config.mjs`, bagian 6 file ini, dan PRD

## 15. Konteks untuk keputusan yang ambigu

Prioritaskan berurutan: (1) kepercayaan dan personal branding Oga, (2) kemudahan Oga memperbarui data sendiri, (3) kecepatan di ponsel, (4) kerapian kode. Bila ada pertanyaan yang tidak terjawab di sini atau di PRD (nama dealer, pilihan analitik, metode cicilan, daftar model awal), jangan menebak: beri placeholder dan catat sebagai pertanyaan untuk pemilik.
