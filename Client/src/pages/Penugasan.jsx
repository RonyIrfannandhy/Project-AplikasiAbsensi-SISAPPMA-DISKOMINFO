import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../Assets/diskominfo.png";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Components/SideBar/Navbar.css"
import "./Penugasan.css";
import { axiosJWTadmin } from "../config/axiosJWT";
import { TabTitle } from "../TabName";
import ImageOverlay from "../Components/Admin/ImageOverlay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import icon from "../Assets/icon.png"
import EditTugas from "../Components/Admin/EditTugas";



export const Penugasan = () => {
  TabTitle("Penugasan");
  const [showNav, setShowNav] = useState(false);
  const [activeTasks, setActiveTasks] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeNow, setTimeNow] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tugas, setTugas] = useState([]);
  const [idtugas, setIdTugas] = useState('');
  const navigate = useNavigate();

  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const handleNavLinkClick = (path) => {
    setActiveLink(path);
  };


  const [formData, setFormData] = useState({
    judul: "",
    tugas_url: "",
    dueDate: "",
  });

  //variabel pembantu untuk menangani editing tugas
  const [showEditTugasModal, setShowEditTugasModal] = useState(false);
  const [selectedTugasId, setSelectedTugasId] = useState(null);

  //fungsi untuk membuka dan menutup form editing tugas
  const handleEditTugas = (tugasId) => {
    setSelectedTugasId(tugasId);
    setShowEditTugasModal(true);
  };

  const handleCloseEditTugasModal = () => {
    getTugas();
    setSelectedTugasId(null);
    setShowEditTugasModal(false);
  };


  //variabel untuk indikator validasi pengisian form
  const [judulError, setJudulError] = useState('');
  const [deskripsiError, setDeskripsiError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');

  useEffect(() => {
    getTugasById();
    getTugas();
    fetchCurrentTime();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportPenugasan = async (tugasId) => {
    try {
      if (tugasId) {
        const response = await axiosJWTadmin.get(
          `http://localhost:3000/admin/tugas/${tugasId}/export-tugas`,
          {
            responseType: 'arraybuffer'
          }
        );
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Penugasan.xlsx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Handle jika tugasId tidak tersedia
        console.error('Tugas ID tidak tersedia');
      }
    } catch (error) {
      // navigate('/');
      console.error(error);
    }
  };

  useEffect(() => {
    const activeTaskCount = tugas.filter((tugas) => {
      const dueDate = new Date(tugas.dueDate);
      return dueDate > currentTime;
    }).length;
    setActiveTasks(activeTaskCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  const fetchCurrentTime = async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const data = await response.json();
      const dateTimeString = data.datetime;
      const dateTime = new Date(dateTimeString);

      const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };

      const date = dateTime.toLocaleDateString(undefined, dateOptions);
      const time = dateTime.toLocaleTimeString(undefined, timeOptions);

      const dateTimeStringFormatted = `${date} - ${time}`;
      setTimeNow(dateTimeStringFormatted);
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  };

  function formatDueDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const addTugas = async (e) => {
    // kondisi untuk validasi pengisian form
    let isValid = true;

    if (formData.judul.trim() === "") {
      setJudulError("Judul tugas wajib diisi!");
      isValid = false;
    } else {
      setJudulError("");
    }

    if (formData.tugas_url.trim() === "") {
      setDeskripsiError("Deskripsi tugas wajib diisi!");
      isValid = false;
    } else {
      setDeskripsiError("");
    }

    //menetapkan bahwa deadline harus setidaknya 2 jam dari waktu sekarang
    const dueDateTime = new Date(formData.dueDate);
    const currentTime = new Date();
    const twoHoursAhead = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

    if (!formData.dueDate || dueDateTime <= twoHoursAhead) {
      setDeadlineError("Deadline ditetapkan setidaknya 2 jam dari waktu sekarang");
      isValid = false;
    } else {
      setDeadlineError("");
    }

    if (isValid) {
      e.preventDefault();
      try {
        await axiosJWTadmin.post("http://localhost:3000/admin/tugas/add", formData);
        getTugas();
        setShowTaskForm(false);
        toast.success("Tugas berhasil ditambahkan!", { position: "top-right" });
      } catch (error) {
        navigate("/");
      }

      // Untuk mengembalikan kondisi form setelah tugas berhasil ditambahkan
      setFormData({
        judul: "",
        tugas_url: "",
        dueDate: "",
      });
    }
  };


  const updateTugasData = (updatedTugas) => {
    console.log("Updated Tugas Data:", updatedTugas);
    setTugas((prevTugas) =>
      prevTugas.map((tugas) =>
        tugas.id === updatedTugas.id ? { ...tugas, ...updatedTugas } : tugas
      )
    );
  };

  const getTugas = async () => {
    try {
      const response = await axiosJWTadmin.get("http://localhost:3000/admin/tugas");
      setTugas(response.data.tugas);
    } catch (error) {
      navigate("/");
    }
  };

  const [statustugas, setStatusTugas] = useState([]);

  const getTugasById = async (taskId, index) => {
    try {
      const response = await axiosJWTadmin.get(
        `http://localhost:3000/admin/tugas/${taskId}`
      );
      setStatusTugas(response.data.tugas);
      setIdTugas(taskId);
      setSelectedItemIndex(index);
    } catch (error) {
      navigate("/");
    }
  };

  //fungsi untuk menghapus tugas
  const deleteTugas = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus tugas ini?")) {
      try {
        await axiosJWTadmin.delete(
          `http://localhost:3000/admin/tugas/${id}/delete`
        );
        getTugas();
        toast.success("Tugas berhasil dihapus!", { position: "top-right" });
      } catch (error) {
        navigate('/');
        toast.error("Gagal menghapus tugas");
        console.log(error);
      }
    }
  }

  const handleShowTaskForm = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
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
          <div className="body-penugasan">
            <section id="penugasan">
              <p
                style={{
                  textAlign: "start",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 25,
                  marginBottom: 20,
                  color: "black"
                }}
              >
                Penugasan
              </p>
              <div className="card-waktu" style={{ backgroundColor: "red", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <p style={{ color: "white" }}>Tanggal Hari Ini</p>
                <p style={{ color: "white" }}>{timeNow}</p>
              </div>
            </section>
            <section id="cards-penugasan">
              <div className="card-penugasan-1 green-penugasan">
                <p>Jumlah Tugas Aktif: {activeTasks}</p>
              </div>
              <div
                className="card-penugasan-1 red-penugasan"
                style={{ marginTop: 10, cursor: "pointer" }}
                onClick={handleShowTaskForm}
              >
                <button
                  style={{
                    backgroundColor: "red",
                    border: "none",
                    color: "white",
                  }}
                >
                  Tambah Tugas
                </button>
              </div>
            </section>
            <section id="informasi-penugasan">
              <div className="container-penugasan left">
                <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: 20, color: "black", marginBottom: 10 }}>
                  Daftar Tugas
                </p>
                <div className='table-container-penugasan'>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tugas.map((tugas, index) => (
                        <tr key={tugas.id}>
                          <td>{index + 1}</td>
                          <td>{tugas.judul}</td>
                          <td>{tugas.tugas_url}</td>
                          <td>{formatDueDate(tugas.dueDate)}</td>
                          <td>
                            <button
                              onClick={() => {
                                getTugasById(tugas.id, index); // Pass the task ID and index
                              }}
                              className="button is-small is-info"
                            >
                              Detail
                            </button>
                            <button
                              style={{ minWidth: "60px" }}
                              onClick={() => handleEditTugas(tugas.id)}
                              className="button is-small is-warning"
                            >
                              Edit
                            </button>
                            <button
                              style={{ minWidth: "60px" }}
                              onClick={() => deleteTugas(tugas.id)}
                              className="button is-small is-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <EditTugas
                    tugasId={selectedTugasId}
                    handleCloseModal={handleCloseEditTugasModal}
                    showEditTugasModal={showEditTugasModal}
                    updateTugasData={updateTugasData}
                  />
                </div>
              </div>
              <div className="container-penugasan right">
                <p style={{ textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: 20, color: "black", marginBottom: 10 }}>
                  Detail Penugasan
                </p>
                <div className="table-container-penugasan">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th>Lampiran Pekerjaan</th>
                        <th>Status Pengerjaan</th>
                        <th>Keterangan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statustugas.map((tugas, index) => (
                        <tr key={tugas.id}>
                          <td>{tugas.nama}</td>
                          <td>
                            {tugas.status_tugas && tugas.status_tugas[0] && tugas.status_tugas[0].status_pengerjaan
                              ? (
                                <button
                                  onClick={() => {
                                    setSelectedImageUrl(tugas.status_tugas[0].tugas_url);
                                    setSelectedItemIndex(index);
                                    setShowImageOverlay(true);
                                  }}
                                  className="button is-small is-info"
                                >
                                  Lihat hasil pekerjaan
                                </button>
                              )
                              : (
                                tugas.status_tugas && tugas.status_tugas[0] && tugas.status_tugas[0].tugas_url
                                  ? (
                                    <button
                                      onClick={() => {
                                        setSelectedImageUrl(tugas.status_tugas[0].tugas_url);
                                        setSelectedItemIndex(selectedItemIndex);
                                        setShowImageOverlay(true);
                                      }}
                                      className="button is-small is-danger"
                                    >
                                      Lihat Gambar
                                    </button>
                                  )
                                  : "Belum Mengerjakan"
                              )}
                          </td>
                          <td>
                            {tugas.status_tugas ? (
                              tugas.status_tugas[0] && tugas.status_tugas[0].status_pengerjaan
                                ? "Sudah Selesai"
                                : "Belum Selesai"
                            ) : "Belum Selesai"}
                          </td>
                          <td>
                            {tugas.status_tugas ? (
                              tugas.status_tugas[0] ? (
                                tugas.status_tugas[0].status_pengerjaan ? (
                                  tugas.status_tugas[0].keterangan === true ? "Tepat waktu" : "Terlambat"
                                ) : "-"
                              ) : "-"
                            ) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {showImageOverlay && (
                    <ImageOverlay imageUrl={selectedImageUrl} onClose={() => setShowImageOverlay(false)} />
                  )}
                  <button
                    onClick={() => exportPenugasan(idtugas)}
                    className="button is-success"
                    style={{
                      marginTop: 18,
                      float: 'right',
                      display: idtugas ? 'block' : 'none'
                    }}
                  >
                    Export to Excel
                  </button>

                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Modal
        show={showTaskForm}
        onHide={handleCloseTaskForm}
        backdrop="static"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Penugasan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addTugas}>
            <Form.Group controlId="formTaskJudul">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan judul"
                value={formData.judul}
                onChange={(e) => {
                  setFormData({ ...formData, judul: e.target.value });
                  setJudulError('');
                }}
              />
              {judulError && <p style={{ color: 'red', fontSize: '14px' }}>{judulError}</p>}
            </Form.Group>
            <Form.Group controlId="formTaskDeskripsi">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi"
                value={formData.tugas_url}
                onChange={(e) => {
                  setFormData({ ...formData, tugas_url: e.target.value });
                  setDeskripsiError('');
                }}
              />
              {deskripsiError && <p style={{ color: 'red', fontSize: '14px' }}>{deskripsiError}</p>}
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                value={formData.dueDate ? formData.dueDate.slice(0, 16) : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    // const selectedDate = new Date(e.target.value);
                    // const isoDate = selectedDate.toISOString();
                    setFormData({ ...formData, dueDate: e.target.value });
                    setDeadlineError('');
                  }
                }}
              />
              {deadlineError && <p style={{ color: 'red', fontSize: '14px' }}>{deadlineError}</p>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTaskForm}>
            Batal
          </Button>
          <Button variant="primary" onClick={addTugas}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Penugasan;