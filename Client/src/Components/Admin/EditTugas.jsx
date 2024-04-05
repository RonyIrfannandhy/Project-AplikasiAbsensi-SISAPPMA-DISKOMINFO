import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { axiosJWTadmin } from "../../config/axiosJWT";
import { toast } from "react-toastify";


const EditTugas = ({ tugasId, handleCloseModal, showEditTugasModal, updateTugasData }) => {
    const [tugasData, setTugasData] = useState({
        judul: "",
        tugas_url: "",
        dueDate: new Date().toISOString().slice(0, 16),
    });

    useEffect(() => {
        if (tugasId) {
            axiosJWTadmin
                .get(`http://localhost:3000/admin/tugas-by-id/${tugasId}`)
                .then((response) => {
                    const tugas = response.data.tugas;
                    // Format the date string to match the expected format
                    const formattedDueDate = new Date(tugas.dueDate).toISOString().slice(0, 16);
                    setTugasData({
                        judul: tugas.judul,
                        tugas_url: tugas.tugas_url,
                        dueDate: formattedDueDate,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [tugasId]);

    const handleUpdateTugas = async (e) => {
        e.preventDefault();
        try {
            await axiosJWTadmin.patch(
                `http://localhost:3000/admin/tugas/${tugasId}/edit`, 
                tugasData
            );
            updateTugasData(tugasData);
            handleCloseModal();
            showSuccessNotification("Keterangan tugas berhasil diubah.");
        } catch (error) {
            showErrorNotification("Gagal mengubah keterangan tugas.");
            console.error(error);
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
        <Modal
            show={showEditTugasModal}
            onHide={handleCloseModal}
            backdrop="static"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
            dialogClassName="modal-dialog-centered"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Tugas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateTugas}>
                    <Form.Group controlId="judul">
                        <Form.Label>Judul</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan judul"
                            value={tugasData.judul}
                            onChange={(e) => setTugasData({ ...tugasData, judul: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="tugas_url">
                        <Form.Label>Tugas URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan tugas URL"
                            value={tugasData.tugas_url}
                            onChange={(e) => setTugasData({ ...tugasData, tugas_url: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="dueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={tugasData.dueDate} 
                            onChange={(e) => setTugasData({ ...tugasData, dueDate: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={handleUpdateTugas}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTugas;