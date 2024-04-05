import React, { useState, useEffect } from "react"
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import imageCon from "../../Assets/balaikota.png"
import logo from "../../Assets/diskominfo.png"
// import icon from "../Assets/icon.png"
import penugasan from "../../Assets/image_Penugasan.svg"
import data from "../../Assets/image_Data Presensi.svg"
import presensi from "../../Assets/image_Lakukan Presensi.svg"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../Components/SideBar/Navbar.css"
import './UserPages.css'
import { TabTitle } from "../../TabName"
import { isUnauthorizedError }  from '../../config/errorHandling';
import { axiosJWTuser } from "../../config/axiosJWT"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import icon from "../../Assets/icon.png"

const UserPages = () => {
  TabTitle('Homepage');
  const [nama, setNama] = useState('');
  const [username, setuserName] = useState('');
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); setErrorMessage('')};
  const handleShow = () => setShow(true);
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState( {password:""});


  useEffect(() => {
    refreshToken();
  })

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/account/token',{
        headers: {
          'role': "peserta_magang"
        }
      });
      const decoded = jwt_decode(response.data.token);
      setNama(decoded.nama);
      setuserName(decoded.username);
  
    } catch (error) {
      if (isUnauthorizedError(error)){
        navigate('/');
    }
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      setErrorMessage('Password tidak sama, silahkan isi kembali');
    } else {
      // setFormData(Password)
      uploadPassword();
      console.log(formData);
      
      handleClose();
    }
  };

  const uploadPassword = async () => {
    try {
      const ambilid = await axios.get('http://localhost:3000/account/token', {
        headers: {
          'role': "peserta_magang"
        },
      });
      const decoded = jwt_decode(ambilid.data.token);
      
      const response = await axiosJWTuser.patch(`http://localhost:3000/user/peserta/${decoded.userId}/edit`, formData);
      console.log('Server Response:', response.data);
      showSuccessNotification("Berhasil menggati password")
    } catch (error) {
      showErrorNotification("Gagal Mengganti Password")
      if (isUnauthorizedError(error)){
        navigate('/');
    }
      console.error('Error:', error);
    }
  };

  const showSuccessNotification = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
    });
};

const showErrorNotification = (message) => {
  toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
    });
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
        <div className="account-info-container">
              <div className="info-box">
                <div className="user-info">
                  <p>Selamat Datang,</p>
                  <p>{nama}</p>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "5px",
                      borderTop: "1px solid #000000",
                    }}
                  >
                    username : {username}
                  </p>
                  <p
                    variant="primary"
                    onClick={handleShow}
                    style={{
                      fontSize: "15px",
                      color: "#0000aa",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <button style={{ color: "red" }}>Edit password</button>
                  </p>
                </div>
              </div>
              <div className="space"></div>
              <div className="user-image">
                <img src={icon} alt="" />
              </div>
            </div>
          <div className="homepage">
            
            <div className="image-container">
              <img className="background-home" src={imageCon} alt="" />
            </div>
            
            <div className="action-buttons">
              <a href="riwayat">
                <img src={data} alt="Peserta" />
                <span>History Presensi</span>
              </a>
              <a href="presensi">
                <img src={presensi} alt="Penugasan" />
                <span>Presensi</span>
              </a>
              <a href="tugas">
                <img src={penugasan} alt="Statistik" />
                <span>Tugas</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        style={{ zIndex: 1050 }}
        className="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormData({ ...formData, password: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default UserPages;