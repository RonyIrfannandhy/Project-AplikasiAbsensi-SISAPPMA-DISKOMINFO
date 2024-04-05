import { SiOpenaigym } from "react-icons/si";
import { BsInstagram, BsGlobe } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

export const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "Plans",
    path: "/plans",
  },
  {
    name: "Trainers",
    path: "/trainers",
  },
  {
    name: "Login",
    path: "/contact",
  },
];

export const programs = [
  {
    id: 1,
    icon: <SiOpenaigym />,
    title: "Fitur Absensi Online",
    info: "Fitur Absensi pada SISAPPMA merupakan inovasi dari penerapan Absensi secara Offline ke Online.",
    path: "/programs/111",
  },
  {
    id: 2,
    icon: <SiOpenaigym />,
    title: "Fitur Persuratan",
    info: "Fitur Persuratan memudahkan perihal Surat Menyurat bagi Peserta Magang DISKOMINFO Kota Semarang.",
    path: "/programs/222",
  },
  {
    id: 3,
    icon: <SiOpenaigym />,
    title: "Fitur Penugasan",
    info: "Fitur ini memudahkan untuk menerima informasi tugas dari Koordinator Magang DISKOMINFO secara online.",
    path: "/programs/333",
  },
  {
    id: 4,
    icon: <SiOpenaigym />,
    title: "Fitur History Presensi",
    info: "Memudahkan Peserta Magang DISKOMINFO memantau presensi yang terinput secara sistem di SISAPPMA.",
    path: "/programs/444",
  },
];

export const values = [
  {
    id: 1,
    icon: <SiOpenaigym />,
    title: "Langkah 1",
    desc: "Pastikan anda telah diterima oleh Koordinator Magang DISKOMINFO sebelum penggunaan aplikasi SISAPMA.",
  },
  {
    id: 2,
    icon: <SiOpenaigym />,
    title: "Langkah 2",
    desc: "Peserta wajib konfirmasi akun kepada Koordinator Magang DISKOMINFO untuk pendataan.",
  },
  {
    id: 3,
    icon: <SiOpenaigym />,
    title: "Langkah 3",
    desc: "Login Aplikasi SISAPMA sebagai Peserta menggunakan Username dan Password yang telah terinput.",
  },
  {
    id: 4,
    icon: <SiOpenaigym />,
    title: "Langkah 4",
    desc: "Selamat anda dapat menggunakan berbagai fitur yang tersedia sesuai arahan Koordinator Magang.",
  },
];

export const faqs = [
  {
    id: 1,
    question: "Apa itu Aplikasi SISAPPMA?",
    answer:
      "SISAPPMA adalah Platform Digital yang dimiliki DISKOMINFO (Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang) untuk menampung Peserta Magang.",
  },
  {
    id: 2,
    question: "Apa saja fitur di Aplikasi SISAPPMA?",
    answer:
      "Fitur yang dimiliki Aplikasi SISAPPMA diantaranya Fitur Absensi Online, Fitur Persuratan,Fitur Penugasan dan Fitur History Presensi bagi Peserta Magang DISKOMINFO Kota Semarang.",
  },
  {
    id: 3,
    question: "Bagaimana mendapatkan Akun Peserta Magang?",
    answer:
      "Dengan mengikuti Tata Penggunaan di laman home mulai dari Langkah 1 hingga Langkah 4 Peserta Magang DISKOMINFO dapat login sebagai Peserta di Aplikasi SISAPPMA.",
  },
  {
    id: 4,
    question: "Bagaimana jika Saya ingin mengganti Password Akun?",
    answer:
      "Masalah di atas dapat teratasi dengan fiitur Edit Password yang tersedia pada laman Home Peserta Magang DISKOMINFO Kota Semarang.",
  },
  {
    id: 5,
    question: "Bagaimana cara melihat histori presensi?",
    answer:
      "Anda dapat melihat History Presensi magang pada laman Peserta Sidebar fitur History Presensi.",
  },
  {
    id: 6,
    question: "Aplikasi SISAPPMA dapat di akses melalui apa saja?",
    answer:
      "Untuk saat ini Aplikasi SISAPPMA hanya dapat di akses secara online oleh mesin pencarian Anda melalui Website Resmi yang tersedia.",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Rony Irfannandhy",
    quote:
      "Aplikasi SISAPPMA Berbasis Website ini sangat memudahkan Peserta DISKOMINFO dalam melakukan absensi",
    job: "Mahasiswa Universitas Dian Nuswantoro",
    avatar: require("./images/avatar1.jpeg"),
  },
  {
    id: 2,
    name: "Yolanda",
    quote:
      "Saya sangat terbantu dengan adanya Fitur-Fitur dalam aplikasi SISAPPMA. Semoga kedepannya lebih banyak fitur lain untuk pengembangan lebih lanjut.",
    job: "Mahasiswi Universitas Diponegoro",
    avatar: require("./images/avatar2.jpeg"),
  },
  {
    id: 3,
    name: "Fernanda Mulya",
    quote:
      "Fitur-Fitur yang tersedia sangat mudah bagi saya yang awam ini. Dengan adanya fitur presensi sangat memudahkan absen dari jarak jauh tanpa harus datang ke Office.",
    job: "Mahasiswa Universitas Dian Nuswantoro",
    avatar: require("./images/avatar3.jpeg"),
  },
  {
    id: 4,
    name: "Alamsyah",
    quote:
      "Saya sangat senang magang di Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang. Pengalaman menggunakan SISAPPMA sangat membantu sekali.",
    job: "Mahasiswa Universitas Dian Nuswantoro",
    avatar: require("./images/avatar4.jpeg"),
  },
  {
    id: 5,
    name: "Anggun Anggita",
    quote:
      "Aplikasi ini sangat interaktif dengan Peserta Magang sehingga memberikan dampak yang berarti dalam penggunaanya.",
    job: "Mahasiswi Universitas Semarang",
    avatar: require("./images/avatar5.jpg"),
  },
];

export const plans = [
  {
    id: 1,
    name: "Fitur Absensi Online",
    desc: "Fitur Absensi pada SISAPPMA merupakan inovasi dari penerapan Absensi secara Offline ke Online.",
    price: 0.0,
    features: [
      { feature: "Akses Kamera", available: true },
      { feature: "Upload Foto", available: true },
      { feature: "Rekap Presensi", available: false },
      { feature: "Unduh File PDF", available: false },
      { feature: "Akses Peserta Lainnya", available: false },
    ],
  },
  {
    id: 2,
    name: "Fitur Persuratan",
    desc: "Fitur Persuratan memudahkan perihal Surat Menyurat bagi Peserta Magang DISKOMINFO Kota Semarang.",
    price: 0.0,
    features: [
      { feature: "Unduh Surat", available: true },
      { feature: "Edit Surat", available: true },
      { feature: "Upload Surat", available: false },
    ],
  },
  {
    id: 3,
    name: "Fitur Penugasan",
    desc: "Fitur ini memudahkan untuk menerima informasi tugas dari Koordinator Magang DISKOMINFO secara online.",
    price: 0.0,
    features: [
      { feature: "Akses Informasi", available: true },
      { feature: "Upload Tugas", available: false },
      { feature: "Edit dan Delete Tugas", available: false },
    ],
  },
];

 

export const trainers = [
  {
    id: 1,
    image: require("./images/trainerkominfo.png"),
    name: "DISKOMINFO KOTA SEMARANG",
    job: "Data Profil Koordinator Magang DISKOMINFO Kota Semarang.",
    socials: [
      {
        link: "https://www.instagram.com/diskominfokotasemarang/",
        icon: <BsInstagram />,
      },
      {
        link: "https://diskominfo.semarangkota.go.id/",
        icon: <BsGlobe />,
      },
    ],
  },
  {
    id: 2,
    image: require("./images/trainer2.png"),
    name: "ASDANI KINDARTO, S.Sos, M.Eng, Ph.D",
    job: "Sub Koordinator Pengembangan dan Pengelolaan Aplikasi",
    socials: [
      {
        link: "https://www.instagram.com/asdaniki/",
        icon: <BsInstagram />,
      },
      {
        link: "https://www.linkedin.com/in/asdani/?originalSubdomain=id",
        icon: <FaLinkedinIn />,
      },
    ],
  },
  {
    id: 3,
    image: require("./images/trainer1.png"),
    name: "HANRY SUGIHASTOMO, S.Sos, MM",
    job: "Sub Koordinator Pengembangan Sdm Komunitas Tik",
    socials: [
      {
        link: "https://www.instagram.com/hanry_sugi/",
        icon: <BsInstagram />,
      },
    ]
  },
];
