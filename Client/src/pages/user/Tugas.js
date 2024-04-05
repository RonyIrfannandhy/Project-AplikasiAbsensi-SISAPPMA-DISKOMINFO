import React, { useEffect, useState } from "react";
import Cards from "../../Assets/Cards";
import Dates from "../../Assets/Date";
import logo from "../../Assets/diskominfo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../Components/SideBar/Sidebar.css";
import './UserPages.css' // Import file CSS terpisah untuk mengatur layout
import jwt_decode from "jwt-decode";
import axios from "axios";
import { axiosJWTuser } from "../../config/axiosJWT";
import { TabTitle } from "../../TabName";
import { isUnauthorizedError } from "../../config/errorHandling";
import { useNavigate } from "react-router-dom";
import icon from "../../Assets/icon.png"


function Tugas() {
  TabTitle("Tugas");
  const [showNav, setShowNav] = useState(false);
  const [cardData, setData] = useState([]);
  const navigate = useNavigate();
  // const [id, setID] = useState([]);

  //menyortir tugas berdasarkan deadline
  const filterTasksByDueDate = (dueDate, filterType) => {
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const taskDueDate = new Date(dueDate);
    currentDate.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

    switch (filterType) {
      case 'today':
        return (
          taskDueDate.getDate() === currentDate.getDate() &&
          taskDueDate.getMonth() === currentDate.getMonth() &&
          taskDueDate.getFullYear() === currentDate.getFullYear()
        );

      case 'nextWeek':
        const nextWeek = new Date(currentDate.getTime() + 7 * oneDay);
        return (
          taskDueDate > currentDate && taskDueDate <= nextWeek
        );

      case 'all':
        return true;

      default:
        return false;
    }
  };

  //variabel yang berisi tugas terpisah berdasarkan deadline
  const dueTodayTasks = cardData.filter((card) => filterTasksByDueDate(card.tugas.dueDate, 'today'));
  const nextWeekTasks = cardData.filter((card) => filterTasksByDueDate(card.tugas.dueDate, 'nextWeek'));
  const allTasks = cardData.filter((card) => filterTasksByDueDate(card.tugas.dueDate, 'all'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const ambilid = await axios.get('http://localhost:3000/account/token', {
          headers: {
            'role': "peserta_magang"
          },
        });
        const decoded = jwt_decode(ambilid.data.token);

        const response = await axiosJWTuser.get(
          `http://localhost:3000/user/tugas-list/${decoded.userId}`
        );
        setData(response.data.tugas);
      } catch (error) {
        if (isUnauthorizedError(error)) {
          navigate("/");
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            {" "}
            <Dates />{" "}
          </div>
          <h1 style={{ marginBottom: "16px" }}>Tenggat Hari ini</h1>
          {!dueTodayTasks.length ? (
            <p>Tidak ada tugas untuk hari ini.</p>
          ) : (
            <div className="card-list">
              {dueTodayTasks.map((card) => (
                <Cards key={card.id} data={card} setData={setData} />
              ))}
            </div>
          )}
          <h1 style={{ marginTop: "16px", marginBottom: "16px" }}>Tenggat dalam 7 hari</h1>
          {!nextWeekTasks.length ? (
            <p>Tidak ada tugas dalam 7 hari kedepan</p>
          ) : (
            <div className="card-list">
              {nextWeekTasks.map((card) => (
                <Cards key={card.id} data={card} setData={setData} />
              ))}
            </div>
          )}
          <h1 style={{ marginTop: "16px", marginBottom: "16px" }}>Semua tugas</h1>
          {!allTasks.length ? (
            <p>Tidak ada tugas yanng harus dikerjakan.</p>
          ) : (
            <div className="card-list">
              {allTasks.map((card) => (
                <Cards key={card.id} data={card} setData={setData} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tugas;
