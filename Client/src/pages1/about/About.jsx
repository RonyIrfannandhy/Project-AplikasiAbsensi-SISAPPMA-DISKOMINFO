/* eslint-disable jsx-a11y/img-redundant-alt */
import { PageWelcome } from "../../components1";
import WelcomeImage from "./../../images/header_bg_1.png";
import StoryImage from "./../../images/about1.jpeg";
import VisionImage from "./../../images/about2.png";
import MissionImage from "./../../images/about3.png";
import "./about.scss";

const About = () => {
  return (
    <>
      <PageWelcome title="Mengenai DISKOMINFO" image={WelcomeImage}>
        Mencakup Latar Belakang, Visi dan Misi
        Dinas Komunikasi, Informatika, Statistik dan Persandian
        Kota Semarang
      </PageWelcome>
      <section className="about__story">
        <div className="container about__story-container">
          <div className="about__section-image">
            <img src={StoryImage} alt="Our Story Image" />
          </div>
          <div className="about__section-content">
            <h1>DISKOMINFO</h1>
            <p>
              Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang
              berdiri pada tahun 2017 sesuai dengan Peraturan Walikota Semarang
              Nomor 76 Tahun 2016 tentang Kedudukan, Susunan Organisasi, Tugas dan Fungsi,
              Serta Tata Kerja Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang.
            </p>
            <p>
              Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang
              semula merupakan bagian dari DISHUBKOMINFO yang mengalami pemisahan menjadi
              DISKOMINFO dan DISHUB. DISKKOMINFO bergabung dengan bagian Pelayanan data Elektronik (PDE),
              Bagian Rumah Tangga, dan Bagian Humas Setda Kota Semarang menjadi
              Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang.
            </p>
          </div>
        </div>
      </section>
      <section className="about__vision">
        <div className="container about__vision-container">
          <div className="about__section-content">
            <h1>VISI</h1>
            <p>
              <b>
                2021-2024
              </b>
            </p>
            <p>
              " Terwujudnya Kota Semarang yang Semakin Hebat
              berlandaskan Pancasila dalam Bingkai NKRI
              Yang Ber-Bhineka Tunggal Ika "
            </p>
          </div>
          <div className="about__section-image">
            <img src={VisionImage} alt="Our Vision Image" />
          </div>
        </div>
      </section>
      <section className="about__mission">
        <div className="container about__mission-container">
          <div className="about__section-image">
            <img src={MissionImage} alt="Our Mission Image" />
          </div>
          <div className="about__section-content">
            <h1>MISI</h1>
            <small>
              <p>
                <b>
                  MISI 1
                </b>
              </p>
              <p>
                MENINGKATKAN KUALITAS & KAPASITAS SUMBER DAYA MANUSIA YANG
                UNGGUL & PRODUKTIF UNTUK MENCAPAI KESEJAHTERAAN & KEADILAN SOSIAL
              </p>
              <p>
                <b>
                  MISI 2
                </b>
              </p>
              <p>
                MENINGKATKAN POTENSI EKONOMI LOKAL YANG BERDAYA SAING DAN STIMULASI
                PEMBANGUNAN INDUSTRI, BERLANDASAN RISET DAN INOVASI BERDASAR PRINSIP
                DEMOKRASI EKONOMI PANCASILA
              </p>
              <p>
                <b>
                  MISI 3
                </b>
              </p>
              <p>
                MENJAMIN KEMERDEKAAN MASYARAKAT MENJALANKAN IBADAH,
                PEMENUHAN HAK DASAR DAN PERLINDUNGAN KESEJAHTERAAN SOSIAL SERTA
                HAK ASASI MANUSIA BAGI MASYARAKAT SECARA BERKEADILAN
              </p>
              <p>
                <b>
                  MISI 4
                </b>
              </p>
              <p>
                MENDUKUNG INFRASTRUKTUR BERKUALITAS YANG BERWAWASAN LINGKUNGAN
                UNTUK MENDUKUNG KEMAJUAN KOTA
              </p>
              <p>
                <b>
                  MISI 5
                </b>
              </p>
              <p>
                MENJALANKAN REFORMASI BIROKRASI PEMERINTAHAN SECARA DINAMIS
                DAN MENYUSUN PRODUK HUKUM YANG SESUAI NILAI-NILAI PANCASILA
                DALAM KERANGKA NEGARA KESATUAN REPUBLIK INDONESIA
              </p>
            </small>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
