import { DocScreen } from '../src/components/DocScreen';

export default function KetentuanScreen() {
  return (
    <DocScreen
      title="Ketentuan Layanan"
      intro="Ketentuan ini mengatur penggunaan platform KarirHub oleh seluruh pengguna."
      updated="9 Juni 2026"
      sections={[
        {
          title: '1. Penerimaan ketentuan',
          body: 'Dengan membuat akun atau menggunakan layanan KarirHub, kamu menyetujui ketentuan ini. Bila tidak setuju, mohon untuk tidak menggunakan layanan kami.',
        },
        {
          title: '2. Akun pengguna',
          body: 'Kamu bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas pada akunmu. Data yang kamu berikan harus akurat dan terkini.',
        },
        {
          title: '3. Lowongan dan jasa',
          body: 'Rekruter bertanggung jawab atas keakuratan lowongan yang dipasang, dan seller bertanggung jawab atas jasa yang ditawarkan. KarirHub berperan sebagai perantara dan tidak menjamin hasil rekrutmen maupun jasa tertentu.',
        },
        {
          title: '4. Pembayaran',
          body: 'Transaksi layanan berbayar diproses melalui kanal pembayaran resmi. Pengembalian dana mengikuti kebijakan masing-masing layanan dan Jaminan KarirHub.',
        },
        {
          title: '5. Larangan',
          body: 'Pengguna dilarang mengunggah konten palsu, melanggar hukum, atau merugikan pengguna lain. Pelanggaran dapat berakibat penangguhan akun.',
        },
        {
          title: '6. Perubahan ketentuan',
          body: 'KarirHub dapat memperbarui ketentuan ini sewaktu-waktu. Perubahan berlaku sejak dipublikasikan pada halaman ini.',
        },
      ]}
    />
  );
}
