import React, { useState, useRef, useEffect } from 'react';
import logo from "../../Assets/diskominfo.png"
// import { Container } from 'react-bootstrap';
import Dates from '../../Assets/Date';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../Components/SideBar/Navbar.css"
import jwt_decode from "jwt-decode"
import axios from 'axios';
import './UserPages.css'
import { TabTitle } from '../../TabName';
import { isUnauthorizedError } from '../../config/errorHandling';
import { useNavigate } from 'react-router-dom';
import { axiosJWTuser } from '../../config/axiosJWT';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { showSuccessNotification } from '../../Components/User/toastSuccess'
import icon from "../../Assets/icon.png"

const Presensi = () => {
  TabTitle('Presensi');
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [captureTime, setCaptureTime] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {

    let stream;

    const startCamera = async () => {
      try {
        await axios.get('http://localhost:3000/account/token', {
          headers: {
            'role': "peserta_magang"
          },
        });
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        if (isUnauthorizedError(error)) {
          navigate('/');
        }
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    // Cleanup function: stop the camera when the component unmounts
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const capturedImageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    const capturedImageFile = new File([capturedImageBlob], 'captured-image.jpg', { type: 'image/jpeg' });

    // Set the captured image as a File object in state
    setImageSrc(capturedImageFile);
    setCaptureTime(new Date());
    console.log('Captured Image:', capturedImageFile);
    console.log(captureTime);
  };

  const uploadImage = async () => {
    try {
      const ambilid = await axios.get('http://localhost:3000/account/token', {
        headers: {
          'role': "peserta_magang"
        },
      });
      const decoded = jwt_decode(ambilid.data.token);

      // Create a FormData object to send the image as multipart/form-data
      const formData = new FormData();
      formData.append('image', imageSrc);

      const response = await axiosJWTuser.patch(`http://localhost:3000/user/presensi/${decoded.userId}/up`, formData, {
        headers: {
          'role': "peserta_magang"
        }
      });
      console.log('Server Response:', response.data);
      showSuccessNotification("Berhasil Melakukan Presensi")
    } catch (error) {
      if (isUnauthorizedError(error)) {
        navigate('/');
      }
      window.alert("Gagal Melakukan Presensi")
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
        <div className={"home-section"} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <h1 style={{ marginBottom: "10px" }}>Silahkan Presensi</h1>
          <div> <Dates style={{ display: 'flex', alignItems: 'end' }} /> </div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', }}>
              <video ref={videoRef} autoPlay style={{ width: '40vw', height: 'auto' }} />
              {imageSrc && <img src={URL.createObjectURL(imageSrc)} alt="Selfie" style={{ width: '40vw', height: 'auto', marginLeft: "10px" }} />}
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
              <button onClick={capture} style={{ height: "40px", width: "100px", borderRadius: "10px" }}>Ambil Foto</button>
              <button onClick={uploadImage} style={{ marginLeft: 10, height: "40px", width: "120px", borderRadius: "10px" }}>Upload Foto</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Presensi;