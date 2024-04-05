/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from "react-router-dom";
import Image from "../images/main_header.png";

const Welcome = () => {
  return (
    <header className="welcome">
      <div className="container welcome-container">
        <div className="welcome-left">
          <h4><b>PORTAL SISAPPMA</b></h4>
          <h2>Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang</h2>
          <p><small>
            Layanan Sistem Untuk Peserta Magang DISKOMINFO Kota Semarang
            Perihal Absensi dan Surat Menyurat Magang.
          </small>
          </p>
          <Link to="/plans" className="btn lg">
            Pelajari Lebih Lanjut
          </Link>
        </div>
        <div className="welcome-right">
          <div className="welcome-circle"></div>
          <div className="welcome-image">
            <img src={Image} alt="Welcome Image" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Welcome;
