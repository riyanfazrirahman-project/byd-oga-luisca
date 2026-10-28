# Website Sales BYD Oga Luisca

Website statis personal branding untuk Oga Luisca. Pengunjung dapat menjelajahi katalog BYD, membuat simulasi cicilan, dan menghubungi Oga. Situs ini bukan situs resmi BYD.

## Menjalankan proyek

```bash
npm install
npm run dev
npm run validate
npm run build
npm run preview
npm run lint
```

## Memperbarui konten

Semua konten profil, kontak, rute navigasi, pengaturan simulasi, dan katalog ada di [src/data/site.config.js](./src/data/site.config.js). Jangan mengarang harga, spesifikasi, foto, testimoni, atau detail kontak. Gunakan placeholder berkurung siku sampai data disetujui pemilik.

Untuk menambah model:

1. Tambahkan data model dan varian dari brosur atau daftar harga yang disetujui ke `SITE.models`.
2. Simpan gambar WebP di `public/assets/img/models/<slug>/` dan pastikan `images.folder` sama dengan slug.
3. Jalankan `npm run validate`, lalu `npm run build`.

Nomor WhatsApp harus berupa digit dengan awalan `62`. CTA kontak tidak aktif selama nomor masih placeholder.

## Publikasi

Build menghasilkan situs statis di `dist/`. Fallback SPA untuk Netlify tersedia di `public/_redirects`. Ganti `SITE.meta.url` dengan domain HTTPS milik situs, lalu jalankan `npm run sitemap` untuk membuat `public/sitemap.xml`.

Validasi saat dijalankan dengan `NODE_ENV=production` menolak placeholder atau katalog kosong. Lengkapi data yang diperlukan sebelum publikasi produksi. Jangan menghapus disclaimer footer bahwa situs bukan situs resmi BYD.
