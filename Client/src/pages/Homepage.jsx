import React, { useState, useEffect } from "react"
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate, useLocation } from 'react-router-dom'
import imageCon from "../Assets/balaikota.png"
import logo from "../Assets/diskominfo.png"
import icon from "../Assets/icon.png"
import penugasan from "../Assets/image_Buat Penugasan.svg"
import peserta from "../Assets/image_Peserta magang.svg"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../Components/SideBar/Navbar.css"
import './Homestyle.css'
import { TabTitle } from "../TabName"

const Homepage = () => {
  TabTitle('Homepage');
  const [nama, setNama] = useState('');
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };

  useEffect(() => {
    refreshToken();
    setActiveLink(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/account/token', {
        headers: {
          'role': "admin"
        },
      });
      const decoded = jwt_decode(response.data.token);
      setNama(decoded.nama);
    } catch (error) {
      if (error.response) {
        navigate("/");
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
              href="/homepage"
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
              <a href="admin">
                <i className="bi bi-person-check-fill nav_icon" />
                <span class="links_name">Admin</span>
              </a>
              <span class="tooltip">Admin</span>
            </li>
            <li>
              <a href="peserta">
                <i className="bi bi-person nav_icon" />
                <span class="links_name">Peserta</span>
              </a>
              <span class="tooltip">Peserta</span>
            </li>
            <li>
              <a href="presensi">
                <i className="bi bi-person-check nav_icon" />
                <span class="links_name">Presensi Magang</span>
              </a>
              <span class="tooltip">Presensi Magang</span>
            </li>
            <li>
              <a href="penugasan">
                <i className="bi bi-list-task nav_icon" />
                <span class="links_name">Penugasan</span>
              </a>
              <span class="tooltip">Penugasan</span>
            </li>
            <li className="profile">

              <a href="/">

                <i className="bi bi-box-arrow-left nav_icon" ></i>
                <span class="links_name">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="home-section">
          <div className="homepage">
            <div className="account-info-container">
              <div className="info-box">
                <div className="user-info">
                  <p className="user-info-1">Selamat Datang,</p>
                  <p className="user-info-1">{nama}</p>
                </div>
              </div>
              <div className='space'></div>
              <div className="user-image">
                <img src={icon} alt="" />
              </div>
            </div>
            <div className="homepage"></div>
            <div className="image-container">
              <img className="background-home" src={imageCon} alt='' />
            </div>

          </div>
          <div className="action-buttons">
            <a href="/peserta">
              <img src={peserta} alt="" />
              <span>Peserta</span>
            </a>
            <a href="/penugasan">
              <img src={penugasan} alt="" />
              <span>Penugasan</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;