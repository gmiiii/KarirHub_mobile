// Data dummy KarirHub (front-end statis). Bentuk dijaga sama dengan mobile (src/data).
// Belum ada backend; semua nilai contoh.

export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Remote' | 'Kontrak';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  experience: string;
  verified: boolean;
  remote: boolean;
  postedAgo: string;
  logoColor: string; // warna placeholder logo
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Service {
  id: string;
  title: string;
  seller: string;
  category: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  verified: boolean;
  deliveryDays: number;
  thumbColor: string;
  description: string;
  packages: { name: string; price: number; desc: string; features: string[] }[];
}

export const formatRupiah = (n: number) =>
  'Rp' + n.toLocaleString('id-ID');

export const jobs: Job[] = [
  {
    id: 'senior-uiux-designer',
    title: 'Senior UI/UX Designer',
    company: 'PT. Teknologi Masa Depan',
    location: 'Jakarta Selatan',
    type: 'Full-time',
    salary: 'Rp15.000.000 – Rp22.000.000',
    experience: '3–5 Tahun',
    verified: true,
    remote: false,
    postedAgo: '2 jam yang lalu',
    logoColor: '#2563eb',
    tags: ['Figma', 'Design System', 'Prototyping'],
    description:
      'Kami mencari Senior UI/UX Designer yang akan memimpin desain produk digital kami, dari riset hingga eksekusi antarmuka yang rapi dan mudah dipakai.',
    responsibilities: [
      'Memimpin proses desain end-to-end untuk fitur produk utama.',
      'Membangun dan merawat design system perusahaan.',
      'Berkolaborasi dengan tim produk dan engineering.',
    ],
    requirements: [
      'Minimal 3 tahun pengalaman sebagai product/UI-UX designer.',
      'Portofolio yang menunjukkan proses berpikir, bukan hanya visual.',
      'Mahir Figma dan terbiasa dengan komponen reusable.',
    ],
  },
  {
    id: 'marketing-associate-intern',
    title: 'Marketing Associate (Intern)',
    company: 'Global Creative Agency',
    location: 'Bandung',
    type: 'Internship',
    salary: 'Rp2.500.000 – Rp4.000.000',
    experience: 'Fresh Graduate',
    verified: false,
    remote: true,
    postedAgo: '5 jam yang lalu',
    logoColor: '#006329',
    tags: ['Social Media', 'Copywriting', 'Canva'],
    description:
      'Program magang 6 bulan untuk kamu yang ingin belajar pemasaran digital langsung dari praktisi agensi kreatif.',
    responsibilities: [
      'Membantu menyusun kalender konten media sosial.',
      'Menulis caption dan materi promosi singkat.',
      'Menganalisis performa kampanye sederhana.',
    ],
    requirements: [
      'Mahasiswa tingkat akhir atau fresh graduate.',
      'Tertarik pada pemasaran digital dan media sosial.',
      'Mampu bekerja remote dengan disiplin.',
    ],
  },
  {
    id: 'backend-engineer-go-node',
    title: 'Back-End Engineer (Go/Node)',
    company: 'Fintech Solution Indo',
    location: 'Surabaya',
    type: 'Full-time',
    salary: 'Rp18.000.000 – Rp28.000.000',
    experience: '3–5 Tahun',
    verified: true,
    remote: false,
    postedAgo: '1 hari yang lalu',
    logoColor: '#004ac6',
    tags: ['Go', 'Node.js', 'PostgreSQL', 'Docker'],
    description:
      'Bangun layanan backend yang andal untuk produk pembayaran dengan jutaan transaksi per hari.',
    responsibilities: [
      'Mengembangkan dan memelihara API pembayaran.',
      'Menjaga keandalan dan keamanan sistem.',
      'Menulis pengujian dan dokumentasi teknis.',
    ],
    requirements: [
      'Pengalaman dengan Go atau Node.js di produksi.',
      'Paham basis data relasional dan optimasi query.',
      'Terbiasa dengan Docker dan CI/CD.',
    ],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    company: 'Retail Nusantara Group',
    location: 'Jakarta Pusat',
    type: 'Full-time',
    salary: 'Rp9.000.000 – Rp14.000.000',
    experience: '1–3 Tahun',
    verified: true,
    remote: false,
    postedAgo: '2 hari yang lalu',
    logoColor: '#7c3aed',
    tags: ['SQL', 'Looker', 'Spreadsheet'],
    description:
      'Ubah data penjualan menjadi keputusan bisnis yang jelas untuk tim ritel kami.',
    responsibilities: [
      'Menyusun dashboard penjualan mingguan.',
      'Menganalisis tren dan memberi rekomendasi.',
      'Bekerja sama dengan tim operasional toko.',
    ],
    requirements: [
      'Mahir SQL dan spreadsheet tingkat lanjut.',
      'Mampu menceritakan data dengan visual yang jelas.',
      'Teliti dan berorientasi pada detail.',
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    company: 'EduTech Pintar',
    location: 'Remote',
    type: 'Remote',
    salary: 'Rp20.000.000 – Rp30.000.000',
    experience: '5+ Tahun',
    verified: true,
    remote: true,
    postedAgo: '3 hari yang lalu',
    logoColor: '#0891b2',
    tags: ['Roadmap', 'Discovery', 'Analytics'],
    description:
      'Pimpin arah produk pembelajaran daring yang dipakai ratusan ribu pelajar Indonesia.',
    responsibilities: [
      'Menyusun roadmap produk berbasis riset pengguna.',
      'Memprioritaskan backlog bersama tim.',
      'Mengukur dampak fitur lewat data.',
    ],
    requirements: [
      'Pengalaman 5+ tahun mengelola produk digital.',
      'Terbiasa dengan discovery dan eksperimen.',
      'Komunikasi lintas tim yang kuat.',
    ],
  },
  {
    id: 'customer-success-officer',
    title: 'Customer Success Officer',
    company: 'SaaS Lokal Berdaya',
    location: 'Yogyakarta',
    type: 'Part-time',
    salary: 'Rp5.000.000 – Rp7.000.000',
    experience: '1–3 Tahun',
    verified: false,
    remote: true,
    postedAgo: '4 hari yang lalu',
    logoColor: '#be123c',
    tags: ['CRM', 'Komunikasi', 'Onboarding'],
    description:
      'Bantu pelanggan kami berhasil memakai produk dan tumbuh bersama mereka.',
    responsibilities: [
      'Mendampingi onboarding pelanggan baru.',
      'Menjawab pertanyaan dan menampung masukan.',
      'Menjaga tingkat retensi pelanggan.',
    ],
    requirements: [
      'Komunikasi yang sabar dan jelas.',
      'Terbiasa dengan tools CRM.',
      'Berorientasi pada solusi.',
    ],
  },
];

export const jobTypes: JobType[] = ['Full-time', 'Part-time', 'Internship', 'Remote', 'Kontrak'];
export const experiences = ['Fresh Graduate', '1–3 Tahun', '3–5 Tahun', '5+ Tahun'];

export const serviceCategories = [
  { id: 'cv', label: 'Review CV & ATS', icon: 'description' },
  { id: 'foto', label: 'AI Foto CV', icon: 'photo_camera' },
  { id: 'interview', label: 'Latihan Interview', icon: 'forum' },
  { id: 'linkedin', label: 'Optimasi LinkedIn', icon: 'hub' },
  { id: 'coaching', label: 'Career Coaching', icon: 'school' },
  { id: 'portfolio', label: 'Portofolio', icon: 'collections_bookmark' },
];

export const services: Service[] = [
  {
    id: 'review-cv-ats',
    title: 'Review CV profesional + optimasi ATS',
    seller: 'Dewi Lestari',
    category: 'Review CV & ATS',
    rating: 4.9,
    reviews: 218,
    priceFrom: 75000,
    verified: true,
    deliveryDays: 2,
    thumbColor: '#2563eb',
    description:
      'Saya bantu rapikan CV kamu agar lolos screening ATS dan menonjol di mata rekruter, dengan revisi sampai kamu puas.',
    packages: [
      { name: 'Basic', price: 75000, desc: 'Review 1 halaman CV', features: ['Feedback tertulis', '1x revisi', 'Selesai 2 hari'] },
      { name: 'Standar', price: 150000, desc: 'Review + perbaikan layout', features: ['Perbaikan struktur', 'Optimasi kata kunci ATS', '2x revisi'] },
      { name: 'Premium', price: 300000, desc: 'CV + LinkedIn + konsultasi', features: ['Tulis ulang CV', 'Optimasi LinkedIn', 'Konsultasi 30 menit'] },
    ],
  },
  {
    id: 'ai-foto-cv-formal',
    title: 'AI Foto CV formal siap pakai',
    seller: 'Studio Karya',
    category: 'AI Foto CV',
    rating: 4.8,
    reviews: 412,
    priceFrom: 49000,
    verified: true,
    deliveryDays: 1,
    thumbColor: '#006329',
    description:
      'Ubah swafoto biasa jadi pasfoto profesional dengan latar rapi dan pencahayaan studio, dihasilkan AI.',
    packages: [
      { name: 'Basic', price: 49000, desc: '10 hasil foto', features: ['Latar polos', 'Resolusi standar', 'Selesai 1 hari'] },
      { name: 'Standar', price: 99000, desc: '30 hasil foto', features: ['3 pilihan latar', 'Resolusi tinggi', 'Retouch ringan'] },
      { name: 'Premium', price: 199000, desc: '60 hasil + pakaian formal', features: ['Ganti pakaian formal', 'Resolusi cetak', 'Prioritas antrian'] },
    ],
  },
  {
    id: 'latihan-interview-mock',
    title: 'Mock interview + feedback langsung',
    seller: 'Budi Santoso',
    category: 'Latihan Interview',
    rating: 5.0,
    reviews: 96,
    priceFrom: 120000,
    verified: true,
    deliveryDays: 3,
    thumbColor: '#7c3aed',
    description:
      'Latihan wawancara 1-on-1 sesuai posisi yang kamu incar, lengkap dengan masukan konkret untuk perbaikan.',
    packages: [
      { name: 'Basic', price: 120000, desc: '45 menit mock interview', features: ['1 sesi', 'Feedback lisan', 'Rekaman sesi'] },
      { name: 'Standar', price: 220000, desc: '2 sesi + catatan', features: ['2 sesi', 'Catatan tertulis', 'Tips per pertanyaan'] },
      { name: 'Premium', price: 400000, desc: '4 sesi intensif', features: ['4 sesi', 'Simulasi panel', 'Evaluasi akhir'] },
    ],
  },
  {
    id: 'optimasi-linkedin',
    title: 'Optimasi profil LinkedIn end-to-end',
    seller: 'Sari Wijaya',
    category: 'Optimasi LinkedIn',
    rating: 4.7,
    reviews: 154,
    priceFrom: 90000,
    verified: false,
    deliveryDays: 2,
    thumbColor: '#0891b2',
    description:
      'Profil LinkedIn yang menarik perhatian rekruter: headline, ringkasan, dan pengalaman yang menjual.',
    packages: [
      { name: 'Basic', price: 90000, desc: 'Headline + ringkasan', features: ['Perbaikan headline', 'Tulis ringkasan', '1x revisi'] },
      { name: 'Standar', price: 170000, desc: 'Profil lengkap', features: ['Semua section', 'Kata kunci industri', '2x revisi'] },
      { name: 'Premium', price: 320000, desc: 'Profil + strategi konten', features: ['Optimasi penuh', 'Rencana konten 1 bulan', 'Konsultasi'] },
    ],
  },
  {
    id: 'career-coaching-1on1',
    title: 'Career coaching 1-on-1 terarah',
    seller: 'Andi Pratama',
    category: 'Career Coaching',
    rating: 4.9,
    reviews: 73,
    priceFrom: 200000,
    verified: true,
    deliveryDays: 3,
    thumbColor: '#be123c',
    description:
      'Sesi pendampingan karir untuk memetakan tujuan, mengatasi hambatan, dan menyusun langkah nyata.',
    packages: [
      { name: 'Basic', price: 200000, desc: '1 sesi 60 menit', features: ['Pemetaan tujuan', 'Rencana aksi', 'Ringkasan sesi'] },
      { name: 'Standar', price: 540000, desc: '3 sesi bulanan', features: ['3 sesi', 'Pendampingan chat', 'Evaluasi progres'] },
      { name: 'Premium', price: 950000, desc: '6 sesi intensif', features: ['6 sesi', 'Prioritas jadwal', 'Materi tambahan'] },
    ],
  },
  {
    id: 'desain-portofolio',
    title: 'Desain portofolio kerja profesional',
    seller: 'Studio Karya',
    category: 'Portofolio',
    rating: 4.8,
    reviews: 131,
    priceFrom: 250000,
    verified: true,
    deliveryDays: 5,
    thumbColor: '#ca8a04',
    description:
      'Portofolio rapi dan terstruktur yang membuat karya kamu mudah dipahami calon pemberi kerja.',
    packages: [
      { name: 'Basic', price: 250000, desc: '3 halaman portofolio', features: ['Layout dasar', '1x revisi', 'Format PDF'] },
      { name: 'Standar', price: 450000, desc: '6 halaman + studi kasus', features: ['Studi kasus', '2x revisi', 'Sumber file'] },
      { name: 'Premium', price: 800000, desc: 'Portofolio web', features: ['Versi web', 'Domain bantu setup', 'Revisi sampai puas'] },
    ],
  },
];

export const getJob = (id: string) => jobs.find((j) => j.id === id);
export const getService = (id: string) => services.find((s) => s.id === id);

// Data dashboard / transaksi (ringkas)
export const recruiterStats = [
  { label: 'Lowongan Aktif', value: '8', icon: 'work', delta: '+2 bulan ini' },
  { label: 'Total Pelamar', value: '1.248', icon: 'group', delta: '+18%' },
  { label: 'Dalam Review', value: '64', icon: 'fact_check', delta: '12 baru' },
  { label: 'Diterima', value: '9', icon: 'verified', delta: '3 minggu ini' },
];

export const sellerStats = [
  { label: 'Pendapatan Bulan Ini', value: 'Rp4.250.000', icon: 'payments', delta: '+24%' },
  { label: 'Pesanan Aktif', value: '6', icon: 'pending_actions', delta: '2 mendekati tenggat' },
  { label: 'Rating Rata-rata', value: '4,9', icon: 'star', delta: 'dari 318 ulasan' },
  { label: 'Tingkat Selesai', value: '98%', icon: 'task_alt', delta: 'tepat waktu' },
];

export const applicants = [
  { name: 'Rina Hapsari', role: 'Senior UI/UX Designer', match: 92, status: 'Baru', stage: 'Screening' },
  { name: 'Joko Susilo', role: 'Senior UI/UX Designer', match: 88, status: 'Review', stage: 'Interview HR' },
  { name: 'Maya Putri', role: 'Back-End Engineer', match: 84, status: 'Review', stage: 'Tes Teknis' },
  { name: 'Eko Prasetyo', role: 'Data Analyst', match: 79, status: 'Baru', stage: 'Screening' },
  { name: 'Lina Marlina', role: 'Product Manager', match: 95, status: 'Shortlist', stage: 'Interview User' },
];

export const incomingOrders = [
  { id: 'KH-2041', buyer: 'Ahmad Fauzi', service: 'Review CV profesional', pkg: 'Standar', price: 150000, due: '1 hari lagi', status: 'Dikerjakan' },
  { id: 'KH-2039', buyer: 'Citra Dewi', service: 'AI Foto CV formal', pkg: 'Premium', price: 199000, due: 'Hari ini', status: 'Menunggu' },
  { id: 'KH-2035', buyer: 'Bayu Aji', service: 'Mock interview', pkg: 'Basic', price: 120000, due: '3 hari lagi', status: 'Dikerjakan' },
  { id: 'KH-2030', buyer: 'Sinta Lestari', service: 'Optimasi LinkedIn', pkg: 'Standar', price: 170000, due: 'Selesai', status: 'Selesai' },
];

export const transactions = [
  { id: 'TRX-90231', date: '28 Mei 2026', item: 'AI Foto CV formal — Standar', amount: 99000, method: 'GoPay', status: 'Berhasil' },
  { id: 'TRX-90188', date: '22 Mei 2026', item: 'Review CV profesional — Premium', amount: 300000, method: 'BCA Virtual Account', status: 'Berhasil' },
  { id: 'TRX-90142', date: '15 Mei 2026', item: 'Langganan Seller — Pro (bulanan)', amount: 99000, method: 'Kartu Kredit', status: 'Berhasil' },
  { id: 'TRX-90101', date: '9 Mei 2026', item: 'Mock interview — Basic', amount: 120000, method: 'OVO', status: 'Gagal' },
  { id: 'TRX-90077', date: '2 Mei 2026', item: 'Optimasi LinkedIn — Standar', amount: 170000, method: 'GoPay', status: 'Berhasil' },
];

export const sellerPlans = [
  {
    name: 'Starter',
    price: 0,
    period: 'selamanya',
    highlight: false,
    features: ['3 layanan aktif', 'Komisi 10%', 'Dashboard dasar', 'Dukungan komunitas'],
    cta: 'Paket saat ini',
  },
  {
    name: 'Pro',
    price: 99000,
    period: 'bulan',
    highlight: true,
    features: ['Layanan tak terbatas', 'Komisi 5%', 'Analitik lengkap', 'Badge terverifikasi', 'Prioritas pencarian'],
    cta: 'Pilih paket Pro',
  },
  {
    name: 'Bisnis',
    price: 299000,
    period: 'bulan',
    highlight: false,
    features: ['Semua fitur Pro', 'Komisi 3%', 'Tim hingga 5 orang', 'Manajer akun khusus'],
    cta: 'Pilih paket Bisnis',
  },
];

export const myServices = [
  { id: 'review-cv-ats', title: 'Review CV profesional + optimasi ATS', active: true, orders: 218, price: 75000, impressions: '3.420' },
  { id: 'optimasi-linkedin', title: 'Optimasi profil LinkedIn end-to-end', active: true, orders: 154, price: 90000, impressions: '2.110' },
  { id: 'desain-portofolio', title: 'Desain portofolio kerja profesional', active: false, orders: 131, price: 250000, impressions: '1.870' },
];

export const talents = [
  { name: 'Rina Hapsari', title: 'Senior Product Designer', location: 'Jakarta', exp: '6 tahun', skills: ['Figma', 'Design System', 'Riset'], rating: 4.9, open: true },
  { name: 'Joko Susilo', title: 'Frontend Engineer', location: 'Bandung', exp: '4 tahun', skills: ['React', 'TypeScript', 'Next.js'], rating: 4.8, open: true },
  { name: 'Maya Putri', title: 'Data Scientist', location: 'Remote', exp: '5 tahun', skills: ['Python', 'ML', 'SQL'], rating: 4.7, open: false },
  { name: 'Eko Prasetyo', title: 'Digital Marketer', location: 'Surabaya', exp: '3 tahun', skills: ['SEO', 'Ads', 'Analytics'], rating: 4.6, open: true },
  { name: 'Lina Marlina', title: 'Product Manager', location: 'Jakarta', exp: '7 tahun', skills: ['Roadmap', 'Discovery', 'Agile'], rating: 5.0, open: true },
  { name: 'Bayu Aji', title: 'Mobile Engineer', location: 'Yogyakarta', exp: '4 tahun', skills: ['Kotlin', 'Swift', 'Flutter'], rating: 4.8, open: false },
];
