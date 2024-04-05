import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../Assets/diskominfo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Components/SideBar/Navbar.css";
import './Surat.css'; // Import file CSS terpisah untuk mengatur layout
import icon from "../../Assets/icon.png";
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { isUnauthorizedError }  from '../../config/errorHandling';

const Surat = () => {
  const [nama, setNama] = useState('');
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nim: "",
    prodi: "",
    fakultas: "",
    universitas: "",
    tgl_masuk: "",
    tgl_keluar: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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

    } catch (error) {
      if (isUnauthorizedError(error)){
        navigate('/');
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error message when input fields are filled
    setErrorMessage("");
  };

  const handleConfirmationChange = (e) => {
    setConfirmationChecked(e.target.checked);
  };

  const handleGenerateDocx = async () => {
    try {
      // Check if all input fields are filled
      if (!formData.first_name || !formData.last_name || !formData.nim || !formData.prodi || !formData.fakultas || !formData.universitas || !formData.tgl_masuk || !formData.tgl_keluar) {
        setErrorMessage("Isi data diatas terlebih dahulu.");
        return;
      }

      const response = await axios.post("http://localhost:3000/generateDocx", {
        data: formData,
      }, { responseType: 'blob', withCredentials: true }); // Include credentials in the request

      if (response.status === 200) {
        // File generated successfully, initiate download
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'output.docx');
        document.body.appendChild(link);
        link.click();
      } else {
        console.error("Error generating file:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
              <h1 className="h1">Unduh Surat Diterima Magang</h1>
              <div>
                <label>First Name:</label>
                <input type="text" name="first_name" onChange={handleInputChange} />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" onChange={handleInputChange} />
              </div>
              <div>
                <label>NIM:</label>
                <input type="text" name="nim" onChange={handleInputChange} />
              </div>
              <div>
                <label>Program Studi:</label>
                <input type="text" name="prodi" onChange={handleInputChange} />
              </div>
              <div>
                <label>Fakultas:</label>
                <input type="text" name="fakultas" onChange={handleInputChange} />
              </div>
              <div>
                <label>Asal Instansi:</label>
                <input type="text" name="universitas" onChange={handleInputChange} />
              </div>
              <div>
                <label>Tanggal Masuk:</label>
                <input type="text" name="tgl_masuk" onChange={handleInputChange} />
              </div>
              <div>
                <label>Tanggal Keluar:</label>
                <input type="text" name="tgl_keluar" onChange={handleInputChange} />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="confirmation-checkbox">
                <input type="checkbox" id="confirmation" checked={confirmationChecked} onChange={handleConfirmationChange} />
                <label htmlFor="confirmation">&nbsp;Saya telah mengisi data diatas dengan benar</label>
              </div>
              <div className="button-container"> 
                <button className="button" onClick={handleGenerateDocx} disabled={!confirmationChecked}>Generate Docx</button>
              </div>
            </div>
            <div className="info-field">
              <p>Referensi: </p>
              <p>
                Nama terdaftar: &nbsp;&nbsp;&nbsp;&nbsp;{nama}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surat;