# DESIGN.md — Spesifikasi UI/UX Website Sales BYD Oga Luisca

Dokumen desain untuk desainer dan asisten AI. Dibaca bersama `PRD` (apa yang dibuat) dan `AGENTS.md` (cara membuat kodenya).
Stack tampilan: React + Vite + **shadcn/ui** + **Tailwind CSS v4**. Semua nilai desain di bawah dipetakan ke token tema agar bisa diganti di satu tempat (`src/index.css`).

Catatan: nilai warna, ukuran, dan teks contoh adalah **usulan awal** untuk disetujui Oga. Konten asli (foto, bio, harga) selalu datang dari `src/data/site.config.js`.

---

## 1. Prinsip desain

| # | Prinsip | Artinya dalam praktik |
| --- | --- | --- |
| 1 | **Orang dulu, mobil kemudian** | Wajah, nama, dan suara Oga tampil di Beranda dan Hubungi. Mobil adalah isi, bukan tokoh utama. |
| 2 | **Satu aksi utama: chat Oga** | Setiap layar punya satu tombol WhatsApp yang paling menonjol. Aksi lain bersifat sekunder. |
| 3 | **Mobile dulu** | Dirancang di 360 px lebih dulu, lalu diperluas ke tablet dan desktop. |
| 4 | **Jujur dan tidak resmi-resmian** | Tidak meniru tampilan byd.com. Disclaimer "bukan situs resmi BYD" selalu terlihat. |
| 5 | **Ringan dan cepat** | Sedikit dekorasi, gambar WebP, animasi hemat. Kecepatan adalah bagian dari kesan profesional. |
| 6 | **Dirawat lewat data** | Layout menerima data apa adanya: nama panjang, spesifikasi kosong, tanpa promo, model baru. Tidak ada desain yang rusak karena isi berubah. |

Nada visual: **bersih, modern, hangat-profesional**. Bukan showroom mewah yang dingin, bukan brosur promosi yang ramai.

---

## 2. Identitas visual

### 2.1 Palet warna

Warna bukan merah BYD supaya situs tidak tampak sebagai situs resmi. Aksen teal memberi kesan teknologi/listrik; WhatsApp memakai hijau sendiri khusus untuk tombol chat.

| Peran | Token shadcn | Light | Dark | Dipakai untuk |
| --- | --- | --- | --- | --- |
| Latar halaman | `--background` | `#FFFFFF` | `#0B1220` | Latar utama |
| Teks utama | `--foreground` | `#0B1220` | `#F4F7FB` | Judul dan isi |
| Permukaan kartu | `--card` | `#FFFFFF` | `#111A2E` | Kartu, panel |
| Primer (merek) | `--primary` | `#0B1220` | `#F4F7FB` | Tombol utama non-WhatsApp, navigasi aktif |
| Teks di atas primer | `--primary-foreground` | `#F4F7FB` | `#0B1220` | Label tombol primer |
| Aksen | `--accent` | `#E6F7F5` | `#12302F` | Latar sorotan halus, badge lembut |
| Aksen kuat | `--brand` (tambahan) | `#0E9F8E` | `#2DD4BF` | Tautan, ikon, garis aksen, angka penting |
| Teks sekunder | `--muted-foreground` | `#5B6779` | `#9AA7BA` | Deskripsi, label |
| Latar lembut | `--muted` | `#F3F5F8` | `#16213A` | Bagian selang-seling |
| Garis | `--border` | `#E2E7EE` | `#22304D` | Pembatas, outline kartu |
| Fokus | `--ring` | `#0E9F8E` | `#2DD4BF` | Cincin fokus keyboard |
| CTA WhatsApp | `--wa` (tambahan) | `#128C4B` | `#25D366` | **Hanya** tombol dan ikon WhatsApp |
| Peringatan promo | `--promo` (tambahan) | `#B45309` | `#F59E0B` | Badge promo |
| Galat | `--destructive` | `#C62828` | `#EF5350` | Pesan galat |

Aturan pakai:
- Satu bagian layar memakai maksimal **satu warna aksen kuat** sekaligus (teal *atau* promo, tidak keduanya berdampingan).
- Hijau WhatsApp tidak dipakai untuk hal selain chat, agar tombol chat langsung dikenali.
- Kontras teks: minimal **4.5:1** (teks isi) dan **3:1** (teks besar dan ikon). Periksa pasangan `--brand` di atas putih untuk teks kecil; bila kurang, pakai `--foreground`.
- Mode gelap bersifat opsional untuk versi 1; token sudah disiapkan. Bila tidak dirilis, jangan menampilkan pengalih tema.

Cuplikan `src/index.css` (struktur mengikuti shadcn untuk Tailwind v4):

```css
@import "tailwindcss";

:root {
  --radius: 0.75rem;
  --background: #ffffff;
  --foreground: #0b1220;
  --card: #ffffff;
  --card-foreground: #0b1220;
  --popover: #ffffff;
  --popover-foreground: #0b1220;
  --primary: #0b1220;
  --primary-foreground: #f4f7fb;
  --secondary: #f3f5f8;
  --secondary-foreground: #0b1220;
  --muted: #f3f5f8;
  --muted-foreground: #5b6779;
  --accent: #e6f7f5;
  --accent-foreground: #0b1220;
  --destructive: #c62828;
  --border: #e2e7ee;
  --input: #e2e7ee;
  --ring: #0e9f8e;
  --brand: #0e9f8e;
  --wa: #128c4b;
  --promo: #b45309;
}

.dark {
  --background: #0b1220;
  --foreground: #f4f7fb;
  --card: #111a2e;
  --card-foreground: #f4f7fb;
  --popover: #111a2e;
  --popover-foreground: #f4f7fb;
  --primary: #f4f7fb;
  --primary-foreground: #0b1220;
  --secondary: #16213a;
  --secondary-foreground: #f4f7fb;
  --muted: #16213a;
  --muted-foreground: #9aa7ba;
  --accent: #12302f;
  --accent-foreground: #f4f7fb;
  --destructive: #ef5350;
  --border: #22304d;
  --input: #22304d;
  --ring: #2dd4bf;
  --brand: #2dd4bf;
  --wa: #25d366;
  --promo: #f59e0b;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-brand: var(--brand);
  --color-wa: var(--wa);
  --color-promo: var(--promo);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-heading: "Plus Jakarta Sans Variable", "Inter Variable", system-ui, sans-serif;
}
```

Warna tambahan dipakai sebagai `bg-brand`, `text-brand`, `bg-wa`, `bg-promo` di Tailwind. Nilai hex di atas boleh diganti (misal ke oklch) selama kontrasnya tetap lolos.

### 2.2 Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Judul | Plus Jakarta Sans (variable) | Bobot 700–800, tampil hangat dan modern |
| Isi dan UI | Inter (variable) | Bobot 400/500/600, mudah dibaca di layar kecil |
| Angka harga dan spesifikasi | Inter dengan `tabular-nums` | Angka sejajar rapi |

Font dipasang lokal (tanpa CDN) agar cepat dan tidak bergantung pihak ketiga:

```bash
npm install @fontsource-variable/plus-jakarta-sans @fontsource-variable/inter
```

Impor di `src/main.jsx`: `@fontsource-variable/plus-jakarta-sans` dan `@fontsource-variable/inter`.

Skala tipografi (mobile → desktop, dengan `clamp` atau kelas responsif):

| Gaya | Mobile | Desktop | Bobot | Line height | Kelas contoh |
| --- | --- | --- | --- | --- | --- |
| Display (hero Beranda) | 36 px | 60 px | 800 | 1.1 | `font-heading text-4xl md:text-6xl font-extrabold leading-tight` |
| H1 (judul halaman) | 30 px | 44 px | 700 | 1.15 | `text-3xl md:text-5xl` |
| H2 (judul bagian) | 24 px | 32 px | 700 | 1.2 | `text-2xl md:text-3xl` |
| H3 (judul kartu) | 18 px | 20 px | 600 | 1.3 | `text-lg md:text-xl` |
| Isi | 16 px | 17 px | 400 | 1.6 | `text-base` |
| Isi kecil / keterangan | 14 px | 14 px | 400 | 1.5 | `text-sm text-muted-foreground` |
| Label / badge | 12 px | 12 px | 600 | 1.2 | `text-xs font-semibold uppercase tracking-wide` |
| Harga besar | 28 px | 36 px | 800 | 1.1 | `font-heading tabular-nums` |

Aturan: teks isi tidak lebih kecil dari 16 px di mobile; panjang baris paragraf maksimal ±70 karakter (`max-w-prose`); jangan memakai huruf kapital semua untuk kalimat panjang.

### 2.3 Jarak, grid, dan bentuk

- **Satuan jarak:** kelipatan 4 px (skala Tailwind). Jarak antar-bagian halaman: 64 px mobile, 96 px desktop (`py-16 md:py-24`).
- **Kontainer:** lebar maksimal 1200 px, padding samping 16 px (mobile), 24 px (tablet), 32 px (desktop). Pembungkus: `mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8`.
- **Grid:** 4 kolom (mobile), 8 (tablet), 12 (desktop), gap 16/24 px.
- **Breakpoint:** `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. Titik uji wajib: **360, 768, 1280 px**.
- **Radius:** kartu `rounded-xl` (16 px), tombol dan input `rounded-lg` (12 px), badge `rounded-full`, gambar mobil di kartu `rounded-lg`.
- **Bayangan:** sangat tipis. Kartu diam memakai garis (`border`), bayangan lembut (`shadow-sm`) hanya saat hover dan pada elemen mengambang (tombol WhatsApp, sheet).
- **Ikon:** `lucide-react`, ukuran 20 px (UI) dan 24 px (fitur), tebal garis 1.75. Ikon sosial/WhatsApp memakai SVG di `public/assets/icons/` (lucide tidak memuat logo merek).

---

## 3. Arsitektur informasi dan navigasi

```text
Beranda (/)
├── Model (/model)
│   └── Detail Model (/model/:slug)
├── Simulasi (/simulasi)
└── Hubungi (/hubungi)      ← profil Oga Luisca
```

Menu ditentukan oleh `SITE.nav`: **Beranda · Model · Simulasi · Hubungi**. Satu tombol aksi tetap di header: **Chat WhatsApp**.

### 3.1 Header (`SiteHeader`)

| Aspek | Desktop (≥ 1024 px) | Mobile (< 1024 px) |
| --- | --- | --- |
| Tinggi | 72 px | 60 px |
| Kiri | Logo/nama "Oga Luisca" + keterangan kecil "Sales BYD" | Sama, nama saja bila sempit |
| Tengah | Menu tautan horizontal | — |
| Kanan | Tombol WhatsApp (ukuran sedang) | Tombol WhatsApp ikon + tombol menu |
| Perilaku | Lengket di atas (`sticky top-0`), latar `bg-background/90 backdrop-blur`, garis bawah muncul setelah scroll 8 px | Menu terbuka sebagai **Sheet** dari kanan, tautan besar (tinggi 48 px), tombol WhatsApp penuh di bawah |
| Aktif | Tautan halaman aktif bergaris bawah `brand` 2 px | Tautan aktif berlatar `accent` |

### 3.2 Footer (`SiteFooter`)

Tiga kolom (desktop), bertumpuk (mobile):
1. **Oga Luisca** — foto kecil bulat, jabatan, dealer, area layanan.
2. **Tautan** — menu utama + brosur.
3. **Kontak** — WhatsApp, telepon, email, Instagram, TikTok, jam kerja.

Baris bawah: hak cipta dan **disclaimer** dari `SITE.meta.disclaimer` (teks 14 px, selalu terbaca, tidak disembunyikan di balik tautan).

### 3.3 Tombol WhatsApp mengambang (`FloatingWhatsApp`)

- Tampil di ponsel dan tablet (< 1024 px), kanan bawah, jarak 16 px dari tepi, memperhitungkan `safe-area-inset-bottom`.
- Lingkaran 56 px, warna `bg-wa`, ikon putih. Bayangan `shadow-lg`.
- Disembunyikan di halaman detail model bila bar CTA bawah halaman (lihat 5.3) sudah tampil, untuk menghindari tumpang tindih.
- Label aksesibilitas: "Chat Oga lewat WhatsApp".

---

## 4. Komponen

### 4.1 Peta komponen shadcn

| Kebutuhan UI | Komponen shadcn | Catatan |
| --- | --- | --- |
| Tombol | `button` | Varian kustom `wa` (lihat 4.2) |
| Kartu model dan kartu profil | `card` | |
| Badge promo/status/tipe | `badge` | |
| Tab di detail model | `tabs` | Ringkasan · Spesifikasi · Galeri |
| Filter tipe bodi | `toggle-group` | Satu pilihan aktif |
| Pilih model/varian/tenor | `select` | |
| DP | `slider` + `input` | |
| Menu mobile | `sheet` | |
| Galeri | `carousel` | Berbasis Embla |
| FAQ | `accordion` | |
| Tabel spesifikasi | `table` | |
| Avatar penguji testimoni | `avatar` | |
| Pembatas | `separator` | |

### 4.2 Tombol

| Varian | Tampilan | Dipakai untuk |
| --- | --- | --- |
| `wa` (kustom) | Latar `bg-wa`, teks putih, ikon WhatsApp di kiri, `font-semibold` | **Satu** aksi utama per layar: chat Oga |
| `default` | Latar `primary` | Aksi utama non-chat (misal "Lihat Model") |
| `outline` | Garis `border`, latar transparan | Aksi sekunder (misal "Unduh Brosur") |
| `ghost` | Tanpa garis | Aksi tersier, tautan dalam menu |
| `link` | Teks `brand` bergaris bawah saat hover | Tautan dalam teks |

Ukuran: `lg` tinggi 48 px (CTA hero), `default` 44 px (**minimum untuk target sentuh**), `sm` 36 px (hanya di desktop, bukan aksi utama). Status: hover (gelap 8%), fokus (cincin `ring` 2 px, offset 2 px), aktif (turun 1 px), nonaktif (opasitas 50%, kursor `not-allowed`).

Varian `wa` ditambahkan di `src/components/ui/button.jsx` lewat `cva` (edit kecil yang diperbolehkan) atau dibungkus komponen `WhatsAppButton` di `components/layout/`. **Pilih pembungkus** agar file `ui/` tetap bersih.

### 4.3 Kartu model (`ModelCard`)

```text
┌───────────────────────────┐
│ [PROMO]            [SUV]  │  ← badge di atas gambar (kiri promo, kanan tipe)
│                           │
│       gambar mobil        │  ← rasio 16:10, object-contain, latar muted
│                           │
├───────────────────────────┤
│ BYD Seal                  │  H3
│ Sedan listrik performa…   │  tagline, 2 baris maks (line-clamp-2)
│                           │
│ Mulai dari                │  label kecil
│ Rp 000.000.000            │  harga besar, tabular-nums
│ [ Tanya Oga ]  [ Detail ] │  wa + outline
└───────────────────────────┘
```

- Seluruh area gambar dan judul adalah tautan ke `/model/:slug`.
- Hover (desktop): gambar membesar 3% dan kartu naik 2 px dengan `transition 200ms`.
- Status `coming-soon`: badge "Segera hadir", harga diganti "Harga menyusul", tombol utama berlabel "Tanya info".
- Status `sold-out`: gambar digelapkan 40%, badge "Stok habis", tombol utama dinonaktifkan; tombol Detail tetap aktif.
- Harga kosong tidak boleh tampil sebagai "Rp 0"; tampilkan "Hubungi untuk harga".

### 4.4 Kartu profil Oga (`SellerProfile` / `ContactCard`)

Foto bulat (mobile 120 px, desktop 180 px) dengan cincin `brand` 3 px, nama (H2), jabatan + dealer (teks sekunder), area layanan dengan ikon pin, deretan tombol kontak. Bila foto belum ada, tampilkan avatar inisial "OL" di lingkaran `accent`.

### 4.5 Tabel spesifikasi (`SpecTable`)

- Dua kolom: label (teks sekunder, 40%) dan nilai (teks utama, 60%), baris selang-seling `muted`.
- Hanya field yang terisi yang ditampilkan; urutan tetap: baterai, jarak tempuh, tenaga, penumpang, penggerak, lainnya.
- Satuan melekat pada nilai ("510 km", "5 kursi").
- Bila ada lebih dari satu varian: kolom varian bergulir horizontal di mobile (`overflow-x-auto`, kolom label menempel di kiri).

### 4.6 Pemilih varian (`VariantPicker`)

`toggle-group` bergaya kartu kecil: nama varian + harga. Memilih varian memperbarui harga besar, tabel spesifikasi, dan isi pesan WhatsApp tanpa memuat ulang halaman.

### 4.7 Galeri (`ModelGallery`)

- Carousel gambar 16:10 dengan indikator titik dan panah (panah hanya di desktop), geser jari di mobile.
- Baris thumbnail 4 kecil di bawah (desktop). Tap gambar membuka **Dialog** layar penuh dengan navigasi keyboard.
- Pemilih warna: bulatan 32 px dengan nama warna; memilih warna mengganti gambar utama bila `colors[].image` tersedia.

### 4.8 Testimoni

Kartu dengan kutipan, nama, foto kecil (opsional). Mobile: carousel satu kartu dengan titik; desktop: tiga kartu berdampingan. Bila `testimonials` kosong, **seluruh bagian disembunyikan** (jangan tampilkan kartu kosong).

### 4.9 Pesan kosong dan galat

| Situasi | Tampilan | Teks (usulan) |
| --- | --- | --- |
| Filter tanpa hasil | Ikon mobil, teks, tombol "Hapus filter" | "Belum ada model di kategori ini." |
| Slug tidak dikenal / 404 | Ikon, judul, dua tombol | "Halaman tidak ditemukan." + "Lihat semua model" dan "Chat Oga" |
| Gambar gagal dimuat | Kotak `muted` dengan ikon mobil | (tanpa teks, `alt` tetap ada) |
| Data bagian kosong | Bagian disembunyikan | — |
| Simulasi belum diisi | Hasil menampilkan petunjuk | "Pilih model dan isi DP untuk melihat estimasi." |

---

## 5. Rancangan halaman

Wireframe berikut bersifat struktural (urutan dan hierarki), bukan visual final. `[ ]` = tombol, `( )` = gambar/foto.

### 5.1 Beranda (`/`)

```text
MOBILE (360)                         DESKTOP (1280)
┌─────────────────────┐              ┌──────────────────────────────────────────────┐
│ Header              │              │ Header                                       │
├─────────────────────┤              ├──────────────────────────────────────────────┤
│ (foto Oga)          │              │ Teks (7 kol)            │ (foto Oga) (5 kol) │
│ Display: nama +     │              │ Display: nama + janji   │                    │
│ janji singkat       │              │ Sub: 2 kalimat          │                    │
│ [ Chat WhatsApp ]   │              │ [Chat WhatsApp][Lihat   │                    │
│ [ Lihat Model ]     │              │  Model]                 │                    │
├─────────────────────┤              │ Angka pencapaian (3)    │                    │
│ Angka pencapaian    │              ├──────────────────────────────────────────────┤
│ (2 kolom)           │              │ H2 "Model Unggulan"  [Lihat semua]           │
├─────────────────────┤              │ 3 kartu model berdampingan                   │
│ H2 Model Unggulan   │              ├──────────────────────────────────────────────┤
│ carousel kartu      │              │ H2 "Kenapa lewat Oga" — 3 poin + ikon        │
├─────────────────────┤              ├──────────────────────────────────────────────┤
│ Kenapa lewat Oga    │              │ Testimoni (3 kartu)                          │
│ (daftar vertikal)   │              ├──────────────────────────────────────────────┤
├─────────────────────┤              │ Bidang CTA penutup: foto kecil + [WhatsApp]  │
│ Testimoni carousel  │              ├──────────────────────────────────────────────┤
├─────────────────────┤              │ Footer                                       │
│ CTA penutup         │              └──────────────────────────────────────────────┘
│ Footer              │
└─────────────────────┘
```

Detail:
- **Hero:** latar `background` dengan bentuk aksen `accent` di belakang foto (lingkaran/organik, bukan gradien ramai). Foto Oga memotong sampai pinggang, tinggi 360 px (mobile) / 560 px (desktop). Bila foto belum ada, tampilkan gambar model unggulan sebagai pengganti.
- **Janji singkat** diambil dari `SITE.meta.tagline`; deskripsi pendek dari paragraf pertama `seller.bio`.
- **Angka pencapaian:** dari `seller.highlights`, angka besar `brand` + label kecil. Bagian disembunyikan bila kosong.
- **Model unggulan:** `models.filter(m => m.featured)`, maksimal 3 (desktop) atau carousel (mobile).
- **Kenapa lewat Oga:** dari `seller.services` (ikon lucide + judul + satu kalimat).
- **CTA penutup:** latar `primary`, teks terang, satu tombol `wa` besar.

### 5.2 Katalog Model (`/model`)

```text
┌──────────────────────────────────────────────┐
│ H1 "Model BYD"      sub: "Pilih, lalu tanya  │
│                     langsung ke Oga"          │
│ Filter: [Semua][SUV][Sedan][Hatchback][MPV]  │  ← toggle-group, bergulir horizontal di mobile
│ "5 model"                       Urut: [Harga ▾]│ (urutan: unggulan, harga naik/turun)
├──────────────────────────────────────────────┤
│ grid kartu: 1 kolom (mobile), 2 (tablet),    │
│ 3 (desktop)                                  │
├──────────────────────────────────────────────┤
│ Bantuan: "Bingung memilih?" [Chat Oga]       │
└──────────────────────────────────────────────┘
```

- Filter bersifat instan (tanpa reload) dan tersimpan di parameter URL (`?tipe=suv`) agar bisa dibagikan.
- Urutan bawaan: `featured` dulu, lalu harga naik; `sold-out` selalu paling akhir.
- Jumlah hasil diumumkan ke pembaca layar (`aria-live="polite"`).

### 5.3 Detail Model (`/model/:slug`)

```text
MOBILE                                DESKTOP
┌─────────────────────┐               ┌─────────────────────────────────────────────┐
│ Breadcrumb          │               │ Breadcrumb: Beranda › Model › BYD Seal      │
│ (galeri carousel)   │               ├───────────────────────┬─────────────────────┤
│ H1 nama + badge     │               │ Galeri (7 kol)        │ H1 + badge          │
│ tagline             │               │ carousel + thumbnail  │ tagline             │
│ Harga mulai dari    │               │                       │ Pilih varian        │
│ Pilih varian        │               │                       │ Harga (berubah)     │
│ Pilih warna         │               │                       │ Pilih warna         │
│ Poin unggulan       │               │                       │ [Minta Penawaran WA]│
│ Tab: Ringkasan |    │               │                       │ [Unduh Brosur]      │
│ Spesifikasi |       │               │                       │ Kartu mini Oga      │
│ Galeri              │               ├───────────────────────┴─────────────────────┤
│ Kartu mini Oga      │               │ Tab: Ringkasan | Spesifikasi | Galeri       │
│ Model lain          │               │ Model lain yang mungkin cocok (3 kartu)     │
│ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ │               └─────────────────────────────────────────────┘
│ Bar CTA bawah lengket│
└─────────────────────┘
```

- **Panel pembelian (kolom kanan, lengket di desktop):** harga besar mengikuti varian terpilih; tombol utama `wa` berlabel "Minta Penawaran" (atau "Tanya Info" bila `coming-soon`); tombol `outline` "Unduh Brosur" muncul hanya bila `brochure` ada.
- **Bar CTA bawah (mobile):** lengket di dasar layar, berisi harga ringkas dan tombol `wa`. Tampil setelah pengguna menggulir melewati panel harga; tinggi 64 px + safe area.
- **Kartu mini Oga:** foto kecil, "Dilayani langsung oleh Oga Luisca", jam respons dari `seller.contact.hours`, tautan "Lihat profil" ke `/hubungi`. Ini kunci personal branding di halaman produk.
- **Tab Ringkasan:** poin `highlights` dengan ikon centang, deskripsi singkat. **Spesifikasi:** `SpecTable`. **Galeri:** grid foto.
- **Tanggal pembaruan harga** tampil kecil di bawah harga bila tersedia ("Harga per [tanggal]; hubungi Oga untuk harga terbaru"). Teks "Harga estimasi OTR" mengikuti kebijakan dealer.
- **Model lain:** tiga model dengan `type` sama atau `featured`, tidak termasuk model saat ini.

### 5.4 Simulasi Kredit (`/simulasi`)

```text
┌──────────────────────────────────────────────┐
│ H1 "Simulasi Cicilan"                        │
│ sub: "Perkiraan awal, angka pasti dari Oga"  │
├──────────────────────┬───────────────────────┤
│ FORM                 │ HASIL (lengket)       │
│ 1 Model  [select]    │ Estimasi cicilan      │
│ 2 Varian [select]    │ Rp 0.000.000 / bulan  │
│ 3 DP     [slider]    │ ─────────────         │
│   Rp … (…%) [input]  │ Harga: Rp …           │
│ 4 Tenor  [toggle-    │ DP: Rp …              │
│    group: 12–60 bln] │ Pokok pinjaman: Rp …  │
│                      │ Tenor: … bulan        │
│                      │ [Bahas dengan Oga WA] │
│                      │ Catatan: hanya estimasi│
└──────────────────────┴───────────────────────┘
(mobile: form di atas, hasil menempel di bawah layar sebagai ringkasan yang bisa diperluas)
```

- Nilai awal: model pertama berstatus `available`, varian termurah, DP = `minDpPercent`, tenor 36 bulan.
- Slider DP dibatasi minimal `minDpPercent` dan maksimal 70% harga; input angka dan slider selalu sinkron.
- Hasil memperbarui saat setiap kontrol berubah (tanpa tombol "Hitung").
- Tombol WhatsApp membawa pesan yang memuat model, varian, DP, dan tenor terpilih.
- **Catatan wajib** di bawah hasil: "Angka ini hanya perkiraan dan bukan penawaran resmi. Bunga dan biaya mengikuti leasing yang disetujui."

### 5.5 Hubungi / Profil Oga (`/hubungi`)

Halaman paling penting untuk personal branding.

```text
┌──────────────────────────────────────────────┐
│ (foto besar)   H1 Oga Luisca                 │
│                Sales Consultant BYD · Dealer │
│                📍 Area layanan               │
│                [Chat WhatsApp] [Telepon]     │
├──────────────────────────────────────────────┤
│ Cerita singkat (bio 2–3 paragraf)            │
├──────────────────────────────────────────────┤
│ Angka pencapaian (3–4 kotak)                 │
├──────────────────────────────────────────────┤
│ Layanan: grid kartu ikon (test drive,        │
│ simulasi kredit, trade-in, serah terima)     │
├──────────────────────────────────────────────┤
│ Testimoni                                    │
├──────────────────────────────────────────────┤
│ Kontak lengkap (kartu)    │ Peta (embed)     │
│ WA · telepon · email ·    │ Alamat, jam kerja│
│ Instagram · TikTok        │                  │
├──────────────────────────────────────────────┤
│ CTA penutup                                  │
└──────────────────────────────────────────────┘
```

- **Hero profil:** foto Oga besar (mobile di atas, desktop di kiri 5 kolom). Nama H1; jabatan, dealer, dan area dalam satu baris sekunder.
- **Bio:** paragraf dari `seller.bio`, lebar baca maksimal 65 karakter, kalimat pertama dicetak lebih besar (lead).
- **Kontak:** setiap baris berupa tautan satu ketukan (WhatsApp `wa.me`, telepon `tel:`, email `mailto:`, sosial membuka tab baru) dengan ikon, label, dan nilai. Tombol salin kecil untuk nomor telepon dan email.
- **Peta:** `mapsEmbedUrl` dalam iframe `loading="lazy"`, tinggi 280 px (mobile) / 360 px (desktop). Bila kosong, tampilkan alamat teks dengan tombol "Buka di Peta".
- Bagian bio, layanan, testimoni, dan peta disembunyikan bila datanya kosong; kontak dan CTA WhatsApp **selalu** tampil.

### 5.6 Halaman 404

Layout terpusat: ikon, judul "Halaman tidak ditemukan", satu kalimat, tombol `default` "Lihat semua model" dan tombol `wa` "Chat Oga". Dipakai juga untuk slug model yang tidak dikenal.

---

## 6. Interaksi dan gerak

| Elemen | Perilaku | Durasi / easing |
| --- | --- | --- |
| Hover kartu | Naik 2 px, gambar zoom 3% | 200 ms, `ease-out` |
| Tombol | Perubahan warna 8%, turun 1 px saat ditekan | 150 ms |
| Sheet menu mobile | Masuk dari kanan, latar gelap 50% | 250 ms, `ease-out` |
| Munculnya bagian (scroll) | Fade-in + geser 12 px ke atas, sekali saja | 400 ms, bertahap 60 ms antar-elemen |
| Pergantian varian | Angka harga berganti dengan fade pendek | 150 ms |
| Galeri | Geser mengikuti jari; transisi antar-gambar | 300 ms |
| Header | Garis bawah dan latar kabur muncul setelah scroll | 150 ms |

Aturan gerak:
- Hormati `prefers-reduced-motion`: matikan zoom, geser, dan fade-in; ganti dengan perubahan instan.
- Tidak ada animasi otomatis berulang (karusel yang berputar sendiri, teks berkedip).
- Tidak ada animasi yang menghalangi konten utama untuk terbaca atau diklik.
- Pemuatan: kerangka (`skeleton`) berukuran sama dengan konten asli agar halaman tidak melompat (CLS mendekati 0).

---

## 7. Konten dan gaya bahasa

Suara Oga: **ramah, jelas, tidak memaksa**, sapaan "Anda"/"Kak" sesuai preferensi Oga. Kalimat pendek, hindari istilah teknis tanpa penjelasan.

| Elemen | Pedoman | Contoh (usulan) |
| --- | --- | --- |
| Tagline hero | Janji manfaat, bukan slogan | "Pilih mobil listrik BYD dengan tenang, saya temani sampai kunci di tangan." |
| Tombol WhatsApp utama | Kata kerja + hasil | "Chat Oga di WhatsApp", "Minta Penawaran" |
| Tombol sekunder | Singkat | "Lihat Model", "Unduh Brosur" |
| Kartu model | Satu kalimat manfaat | "Sedan listrik yang nyaman untuk harian." |
| Galat | Sebutkan masalah dan solusinya | "Model tidak ditemukan. Lihat semua model atau tanya Oga." |
| Disclaimer | Jelas dan tidak bertele-tele | Dari `SITE.meta.disclaimer` |

Format angka dan tanggal: harga `Rp 250.000.000` (titik ribuan), jarak `510 km`, tanggal `26 Okt 2026`. Semua lewat helper `format.js`.

Pesan WhatsApp otomatis (dari `SITE.cta.whatsappTemplate`): sapaan, nama model + varian, permintaan info. Pesan tidak boleh memuat data pribadi pengunjung.

Foto Oga: portrait setengah badan, latar bersih atau showroom, pencahayaan natural, senyum, pakaian rapi; format WebP 1200 px sisi panjang. Foto kegiatan (serah terima, test drive) memperkuat kepercayaan; hanya dengan izin pelanggan yang tampil.

---

## 8. Citra dan aset

| Aset | Spesifikasi | Lokasi |
| --- | --- | --- |
| Logo/nama Oga | SVG, versi terang dan gelap, tinggi 32 px di header | `public/assets/img/brand/` |
| Foto Oga | WebP, 1200 px, rasio 4:5 | `public/assets/img/seller/` |
| Gambar OG (bagikan sosmed) | JPG 1200×630 | `public/assets/img/brand/og-default.jpg` |
| Hero model | WebP 1600 px, rasio 16:10, latar polos atau transparan | `public/assets/img/models/<slug>/hero.webp` |
| Kartu model | WebP 800 px, rasio 16:10 | `.../card.webp` |
| Galeri | WebP 1200 px | `.../gallery-01.webp` dst. |
| Ikon sosial | SVG monokrom | `public/assets/icons/` |

Aturan: semua gambar punya `alt`, `width`, `height`; hero `fetchpriority="high"`, lainnya `loading="lazy"`; maksimal 250 KB per gambar. Foto dan logo BYD hanya dari dealer atau media resmi yang mengizinkan.

---

## 9. Aksesibilitas (target WCAG 2.2 AA)

- Kontras: teks isi 4.5:1, teks besar dan ikon fungsional 3:1.
- Target sentuh minimal 44×44 px, jarak antar-target minimal 8 px.
- Semua fungsi bisa dipakai dengan keyboard; urutan fokus mengikuti urutan visual; cincin fokus selalu terlihat.
- Tautan "Lewati ke konten utama" di awal halaman.
- Struktur judul berurutan (satu H1 per halaman, lalu H2, H3).
- Tombol ikon punya `aria-label` (menu, WhatsApp, panah galeri, tutup dialog).
- Carousel: tombol panah dan titik bisa difokus, ada `aria-roledescription="carousel"`, tidak berputar otomatis.
- Perubahan dinamis (hasil filter, hasil simulasi) diumumkan dengan `aria-live="polite"`.
- Warna tidak jadi satu-satunya penanda (status stok dan promo memakai teks, bukan hanya warna).
- Komponen shadcn berbasis Radix sudah menangani banyak pola ARIA; jangan menimpa perilaku itu.
- `lang="id"` pada `<html>`.

---

## 10. Responsif

| Area | < 640 | 640–1023 | ≥ 1024 |
| --- | --- | --- | --- |
| Navigasi | Sheet + tombol WA ikon | Sheet + tombol WA teks | Menu horizontal + tombol WA |
| Grid katalog | 1 kolom | 2 kolom | 3 kolom |
| Hero | Tumpuk, foto di atas | Tumpuk | Dua kolom 7/5 |
| Detail model | Satu kolom + bar CTA bawah | Satu kolom | Dua kolom, panel kanan lengket |
| Simulasi | Form di atas, ringkasan hasil lengket di bawah | Sama | Dua kolom, hasil lengket |
| Tabel spesifikasi varian | Gulir horizontal | Gulir horizontal bila > 2 varian | Semua kolom terlihat |
| Tombol WhatsApp mengambang | Tampil | Tampil | Tersembunyi (header sudah memuat) |
| Testimoni | Carousel | Carousel 2 | 3 kolom |

Uji wajib: 360, 390, 768, 1024, 1280 px; orientasi lanskap di ponsel; zoom teks 200%.

---

## 11. Performa sebagai bagian dari desain

- Hero Beranda dan gambar model di atas lipatan dimuat lebih dulu; sisanya malas dimuat.
- Halaman dimuat dengan `React.lazy`; galeri dan peta baru dimuat saat mendekati layar.
- Font variabel lokal dengan `font-display: swap`.
- Kerangka (`skeleton`) mengisi ruang agar tidak ada lompatan tata letak.
- Target: Lighthouse mobile Performance ≥ 90, LCP < 2,5 detik, CLS < 0,1 (pada jaringan 4G umum).

---

## 12. Pelacakan interaksi (titik sentuh desain)

| Elemen | Event |
| --- | --- |
| Setiap tombol `wa` (header, hero, kartu, panel, bar bawah, mengambang, footer, Hubungi) | `click_whatsapp` dengan label lokasi tombol dan model/varian |
| Membuka detail model | `view_model` |
| Mengubah dan memakai simulasi | `submit_simulation` saat tombol WhatsApp di hasil diklik |
| Telepon, email, sosial | `click_phone`, `click_email`, `click_social` |
| Unduh brosur | `download_brochure` |

Label lokasi tombol WhatsApp membantu Oga tahu bagian mana yang paling efektif menghasilkan chat.

---

## 13. Daftar periksa desain sebelum rilis

- [ ] Palet dan font terpasang di `src/index.css` dan `main.jsx`; tidak ada hex di komponen
- [ ] Setiap halaman memiliki tepat satu tombol `wa` yang paling menonjol
- [ ] Foto dan nama Oga tampil di Beranda, detail model (kartu mini), dan Hubungi
- [ ] Semua keadaan tercakup: kosong, galat, memuat, `coming-soon`, `sold-out`, tanpa promo, spesifikasi sebagian
- [ ] Bagian berdata kosong tersembunyi dengan benar (testimoni, peta, pencapaian)
- [ ] Disclaimer "bukan situs resmi BYD" terbaca di footer semua halaman
- [ ] Lolos uji kontras, keyboard, dan pembaca layar pada halaman utama
- [ ] Diuji di 360, 768, 1280 px dan dengan `prefers-reduced-motion`
- [ ] Gambar WebP, ber-`alt`, berukuran di bawah 250 KB
- [ ] Skor Lighthouse mobile memenuhi target

---

## 14. Pertanyaan desain yang perlu keputusan Oga

- [ ] Gaya foto dan pakaian untuk foto profil (formal, semi-formal, kasual)
- [ ] Sapaan: "Anda" atau "Kak"
- [ ] Apakah mode gelap dirilis di versi 1
- [ ] Apakah ada logo pribadi, atau cukup nama bertipografi
- [ ] Warna aksen: teal usulan sudah cocok, atau ingin warna lain
- [ ] Apakah harga ditampilkan (mulai dari) atau cukup "Hubungi untuk harga"
- [ ] Apakah dealer mengizinkan penggunaan foto resmi model
