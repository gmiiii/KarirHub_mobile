import { DocScreen } from '../src/components/DocScreen';

export default function BantuanScreen() {
  return (
    <DocScreen
      title="Pusat Bantuan"
      intro="Temukan jawaban cepat atas pertanyaan yang paling sering diajukan."
      sections={[
        {
          title: 'Bagaimana cara melamar lowongan?',
          body: 'Buka tab Lowongan, pilih posisi yang sesuai, lalu tekan "Lamar Sekarang". Pastikan profil dan CV kamu sudah lengkap agar peluang lolos lebih besar.',
        },
        {
          title: 'Apa itu kredit pembuatan CV?',
          body: '1 kredit dipakai untuk sekali membuat CV dengan AI (pasfoto formal dan ringkasan otomatis). Kamu mendapat kredit gratis dan bisa menambah lewat halaman Paket Langganan.',
        },
        {
          title: 'Bagaimana cara menjadi seller jasa karir?',
          body: 'Pilih paket seller di halaman Paket Langganan, lalu kelola jasa kamu di menu Layanan Saya. Pesanan yang masuk akan tampil di tab Pesanan.',
        },
        {
          title: 'Apakah pembayaran di KarirHub aman?',
          body: 'Ya. Seluruh transaksi melewati kanal pembayaran terenkripsi dan dilindungi Jaminan KarirHub hingga pesanan selesai.',
        },
        {
          title: 'Masih butuh bantuan?',
          body: 'Hubungi tim dukungan kami di bantuan@karirhub.id. Kami siap membantu pada hari kerja, pukul 09.00-17.00 WIB.',
        },
      ]}
    />
  );
}
