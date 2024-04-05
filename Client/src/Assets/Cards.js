import './card.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { axiosJWTuser } from '../config/axiosJWT';
import axios from 'axios';
import jwt_decode from "jwt-decode"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';

const Cards = ({ data,setData }) => {

  function formatDueDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return 'Tenggat: ' + day + '-' + month + "-" + year + ' pada ' + hours + ':' + minutes + ':' + seconds;
  }

  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [file, setFile] = useState()

  const showSuccessNotification = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  function hadleFile(event) {
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  }
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); setSelectedTaskID(null); };
  const handleShow = (taskID) => { setSelectedTaskID(taskID); setShow(true); }

  const cancelFile = async () => {
    try {
      await axios.get('http://localhost:3000/account/token', {
        headers: {
          'role': "peserta_magang"
        },
      });
      handleClose()
    } catch (error) {
      handleClose()
    }
  }

  const uploadFile = async () => {
    try {
      const ambilid = await axios.get('http://localhost:3000/account/token', {
        headers: {
          'role': "peserta_magang"
        },
      });
      const decoded = jwt_decode(ambilid.data.token);

      const formData = new FormData();
      formData.append('image', file);
      const response = await axiosJWTuser.patch(`http://localhost:3000/user/tugas/${decoded.userId}/submit/${selectedTaskID}`, formData);
      console.log('Server Response:', response.data);

      //untuk refresh kartu setelah pengumpulan
      const updatedResponse = await axiosJWTuser.get(`http://localhost:3000/user/tugas-list/${decoded.userId}`);
      setData(updatedResponse.data.tugas);

      showSuccessNotification("Berhasil Submit Gambar");
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      window.alert("Gagal Submit Gambar");
      handleClose();
    }
  }

  // Fungsi untuk memisahkan warna tugas berdasarkan deadline
  const getCardColor = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const tomorrow = new Date(currentDate.getTime() + oneDay);

    if (taskDueDate < currentDate) {
      // Deadline has passed
      return "#FF0000"; // Red
    } else if (
      taskDueDate.getDate() === currentDate.getDate() &&
      taskDueDate.getMonth() === currentDate.getMonth() &&
      taskDueDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Deadline is today
      if (taskDueDate.getTime() < currentDate.getTime()) {
        // The time just passed
        return "#FF0000"; // Red
      } else {
        return "#FF5722"; // Orange
      }
    } else if (
      taskDueDate <= new Date(tomorrow.getTime() + 7 * oneDay)
    ) {
      // Deadline within the next 7 days from tomorrow
      return "#FFC300"; // Yellow
    } else {
      // Deadline beyond the next 7 days from tomorrow
      return "#85C1E9"; // Blue
    }
  };

  
  const getFooterText = (keterangan, dueDate) => {
    if (keterangan === true) {
      return "Submitted";
    } else if (keterangan === false) {
      return "Submitted Late";
    } else {
      return formatDueDate(dueDate);
    }
  };

  const cardColor = getCardColor(data.tugas.dueDate);
  const footer = getFooterText(data.status_tugas.keterangan, data.tugas.dueDate);


  console.log("Data: ", data);
  return (
    <div className="card" style={{ cursor: "pointer" }} onClick={() => handleShow(data.tugas.id)} c >
      <h2
        className="card-body"
        style={{ backgroundColor: cardColor }}
      >
        {data.tugas.judul}
      </h2>
      <p
          className='paragraph'
        >
          {data.tugas.tugas_url}
      </p>
      <div className="deadline">{footer}</div>


      <Modal show={show} onHide={handleClose} centered={true} style={{ zIndex: 1050 }} >
        <Modal.Header>
          <Modal.Title>Submit Tugas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input type='file' name='image' accept="image/jpeg, image/png" onChange={hadleFile} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelFile}>
            Cancel
          </Button>
          <Button variant="primary" onClick={uploadFile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer />
    </div>
  );
};

export default Cards;