import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/diskominfo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Components/SideBar/Navbar.css";
import './Profil.css'; // Import file CSS terpisah untuk mengatur layout
import icon from "../../Assets/icon.png";
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { isUnauthorizedError }  from '../../config/errorHandling';

const Profil = () => {
  const [nama, setNama] = useState('');
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [asal_univ, setAsalUniv] = useState('');
  const [asal_jurusan, setAsalJurusan] = useState('');
  const [no_telp, setNoTelp] = useState('');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/account/token',{
        headers: {
          'role': "peserta_magang"
        }
      });
      const decoded = jwt_decode(response.data.token);
      setNama(decoded.nama);
      setUserName(decoded.username);
      setAsalUniv(decoded.asal_univ);
      setAsalJurusan(decoded.asal_jurusan);
      setNoTelp(decoded.no_telp);
    } catch (error) {
      if (isUnauthorizedError(error)){
        navigate('/');
      }
    }
  }

  return (
    <div className="body-main">
    <div className={`body-area${showNav ? " body-pd" : ""}`}>
    <header className={`header${showNav ? " body-pd" : ""}`}>
          <div className="header_toggle">
          </div>
          <div className="header_img">
            <img
              src={icon}
              alt=""
            />
          </div>
        </header>
    <div className={`sidebar${showNav ? " open" : ""}`}> 
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus icon'></i>
          <a
              href="/user/homepage"
              target="_self"
              className="logo_name"
            >
              <img
                src={logo}
                alt=""
                style={{ width: "120px", height: "auto" }}
              />
            </a>
          <i class='bi-list' id="btn" onClick={() => setShowNav(!showNav)}></i>
        </div>
        <ul class="nav-list">
          <li>
            <a href="homepage">
            <i className="bi bi-house nav_icon" />
              <span class="links_name">Home</span>
            </a>
            <span class="tooltip">Home</span>
          </li>
          <li>
            <a href="riwayat">
            <i className="bi bi-card-checklist nav_icon" />
              <span class="links_name">History Presensi</span>
            </a>
            <span class="tooltip">History Presensi</span>
          </li>
          <li>
            <a href="presensi">
            <i className="bi bi-camera nav_icon" />
              <span class="links_name">Lakukan Presensi</span>
            </a>
            <span class="tooltip">Lakukan Presensi</span>
          </li>
          <li>
            <a href="tugas">
            <i className="bi bi-list-task nav_icon" />
              <span class="links_name">Penugasan</span>
            </a>
            <span class="tooltip">Penugasan</span>
          </li>
          <li>
            <a href="surat">
            <i className="bi bi-envelope nav_icon" />
              <span class="links_name">Persuratan</span>
            </a>
            <span class="tooltip">Persuratan</span>
          </li>
          <li>
            <a href="profil">
            <i className="bi bi-person nav_icon"></i>
              <span class="links_name">Profile</span>
            </a>
            <span class="tooltip">Profile</span>
          </li>
          <li className="profile">
              {/* <img src="profile.jpg" alt="profileImg"/> */}
            <a href="/">
            
            <i className="bi bi-box-arrow-left nav_icon" ></i>
            <span class="links_name">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
        <div className="home-section">
          <div className="homepage-container">
            <div>
              <h2>Profil Pengguna</h2>
              <p><strong>Selamat Datang, {nama}</strong></p>
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Asal Universitas:</strong> {asal_univ}</p>
              <p><strong>Asal Jurusan:</strong> {asal_jurusan}</p>
              <p><strong>Nomor Telepon:</strong> {no_telp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
