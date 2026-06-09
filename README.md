# KarirHub - Mobile

Aplikasi mobile **KarirHub**, platform karir Indonesia yang menggabungkan **job board**
(cari & lamar lowongan, pasang lowongan & kelola pelamar) dan **marketplace jasa karir**
ala Fiverr (review CV, AI foto CV, coaching interview, dll). Status: front-end statis dengan
data dummy - belum ada backend/database.

Versi web-nya ada di repo terpisah: **KarirHub_web** (Next.js 14).

## Stack

- **Expo SDK 51** + **TypeScript** + **expo-router**
- **NativeWind v4** dengan design token Material 3 terpusat di [`tokens.js`](tokens.js)
- Ikon: `@expo/vector-icons` (MaterialIcons) · Font: Inter · Semua gambar memakai placeholder

## Menjalankan

```bash
npm install
npx expo start       # buka di Expo Go / emulator
npm run typecheck    # tsc --noEmit (terverifikasi: 0 error)
```

## Navigasi

Tab: **Beranda · Jasa · Lowongan · Pesanan · Profil**. Plus stack: detail lowongan/jasa,
checkout, **flow pembayaran** (pilih metode → QRIS / Virtual Account → berhasil / gagal),
Buat CV dengan AI, talenta, dashboard rekruter/seller, langganan, transaksi.

## Design token

[`tokens.js`](tokens.js) adalah satu sumber kebenaran untuk warna & spacing - di-`require`
oleh [`tailwind.config.js`](tailwind.config.js). File yang sama disinkronkan ke repo
**KarirHub_web** agar tampilan kedua platform identik. Untuk React Native, `fontSize` & `radius`
didefinisikan dalam px langsung di config (kebutuhan NativeWind), sedangkan warna & spacing
diimpor dari `tokens.js`.

- `primary` `#004ac6` (CTA) · `primary-container` `#2563eb` (Royal Blue, hero/aktif)
- `tertiary` hijau = status Verified/sukses · `error` merah

## Data dummy

Terpusat di [`src/data/index.ts`](src/data/index.ts), bentuknya dijaga identik dengan
`KarirHub_web/src/lib/data.ts` agar mudah disambungkan ke API nanti.

## Catatan teknis

- Dipin ke **NativeWind 4.1.23 + reanimated 3.10.1** (kompatibel Expo SDK 51). NativeWind 4.2+
  menuntut `react-native-worklets` (reanimated 4 / SDK 52+) sehingga tidak dipakai.
- [`.npmrc`](.npmrc) memakai `legacy-peer-deps=true` + `overrides` untuk menjaga satu versi
  `react-native` (0.74.5) dan mencegah duplikasi tipe.
- `expo-font` wajib terpasang (peer `@expo/vector-icons`) - tanpa ini ikon crash di luar Expo Go.

---

Tugas Besar - Manajemen Basis Data, Rekayasa Perangkat Lunak.
