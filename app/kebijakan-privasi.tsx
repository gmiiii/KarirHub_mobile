import { DocScreen } from '../src/components/DocScreen';

export default function KebijakanPrivasiScreen() {
  return (
    <DocScreen
      title="Kebijakan Privasi"
      intro="Kami menjelaskan bagaimana data pribadimu dikumpulkan, digunakan, dan dilindungi."
      updated="9 Juni 2026"
      sections={[
        {
          title: '1. Data yang kami kumpulkan',
          body: 'Kami mengumpulkan data yang kamu berikan saat mendaftar (nama, email, profil, CV) serta data penggunaan seperti riwayat lamaran dan transaksi.',
        },
        {
          title: '2. Penggunaan data',
          body: 'Data digunakan untuk menyediakan layanan, mencocokkan kamu dengan lowongan atau jasa yang relevan, memproses pembayaran, dan meningkatkan kualitas platform.',
        },
        {
          title: '3. Berbagi data',
          body: 'Profil dan CV kamu dapat dilihat rekruter saat kamu melamar. Kami tidak menjual data pribadimu kepada pihak ketiga.',
        },
        {
          title: '4. Keamanan',
          body: 'Kami menerapkan enkripsi dan kontrol akses untuk melindungi data. Meski demikian, tidak ada sistem yang sepenuhnya bebas risiko.',
        },
        {
          title: '5. Hak kamu',
          body: 'Kamu dapat mengakses, memperbarui, atau menghapus data pribadimu melalui halaman Profil, atau menghubungi kami di privasi@karirhub.id.',
        },
      ]}
    />
  );
}
