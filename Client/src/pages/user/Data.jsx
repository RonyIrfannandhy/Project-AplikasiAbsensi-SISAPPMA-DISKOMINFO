import React, { useState, useEffect } from 'react';
import ListTable from './ListTable';
import logo from "../../Assets/diskominfo.png"
import icon from "../../Assets/icon.png"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../Components/SideBar/Sidebar.css"
import "../../Components/SideBar/Navbar.css"
import axios from 'axios';
import './UserPages.css'
import jwt_decode from "jwt-decode";
import { axiosJWTuser } from '../../config/axiosJWT';
import { isUnauthorizedError } from '../../config/errorHandling';
import { useNavigate } from 'react-router-dom';
import ImageModal from './ImageModal'; // Create this component
import { TabTitle } from '../../TabName';
import loading from "../../Assets/Loading_Screen.gif"

function formatDueDate(inputDate) {
  const date = new Date(inputDate);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return hours + ':' + minutes;
}

function Data(props) {
  TabTitle('Data Presensi')
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAndPresensiData = async () => {
      try {
        const ambilid = await axios.get('http://localhost:3000/account/token', {
          headers: {
            'role': "peserta_magang"
          },
        });
        const decoded = jwt_decode(ambilid.data.token);

          
        const response = await axiosJWTuser.get(`http://localhost:3000/user/presensi/${decoded.userId}`);
        const dataWithKosong = response.data.presensi.map((item) => ({
          ...item,
          check_in: item.check_in === null ? (
            <span style={{ color: "red" }}>Belum Presensi</span>
          ) : (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleImageClick(item.image_url_in)}>
              {formatDueDate(item.check_in)}
            </span>
          ),
          check_out: item.check_out === null ? (
            <span style={{ color: "red" }}>Belum Presensi</span>
          ) : (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleImageClick(item.image_url_out)}>
              {formatDueDate(item.check_out)}
            </span>
          ),
          image_url_in: item.image_url_in === null ? (
            <span style={{ color: "red" }}>Belum Presensi</span>
          ) : (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleImageClick(item.image_url_in)}>
              Sudah Presensi
            </span>
          ),
          image_url_out: item.image_url_out === null ? (
            <span style={{ color: "red" }}>Belum Presensi</span>
          ) : (
            <span style={{ color: "blue", cursor: "pointer" }} onClick={() => handleImageClick(item.image_url_out)}>
              Sudah Presensi
            </span>
          ),
        }));
        setData(dataWithKosong);
        
      } catch (error) {
        if (isUnauthorizedError(error)){
          navigate('/');
      }
      }
    };

    fetchDataAndPresensiData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleImageClick(imageUrl) {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  }

  function closeImageModal() {
    setShowImageModal(false);
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
        <div className={"home-section"} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{textAlign:'left', fontWeight:'bold', fontSize:'18px', fontfamily: 'Poppins'}} >Daftar data Absen</h1>
          <br/>
          {!data? (
            <img src={loading}  alt=""/>
          ) : (
          <ListTable data={data} />)}
        </div>

        {showImageModal && (
          <ImageModal imageUrl={selectedImage} onClose={closeImageModal} />
        )}
      </div>
    </div>
  );
}

export default Data;
