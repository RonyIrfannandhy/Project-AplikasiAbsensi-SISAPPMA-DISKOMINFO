import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { axiosJWTadmin } from "../../config/axiosJWT";
import { toast } from "react-toastify";

const EditUser = ({
    userId,
    handleCloseModal,
    showEditUserModal,
    updateUserData,
}) => {
    const [userData, setUserData] = useState({
        nama: '',
        asal_univ: '',
        asal_jurusan: '',
        no_telp: '',
        tanggal_mulai: new Date(),
        tanggal_selesai: new Date(),
        username: '',
        password: '',
    });

    useEffect(() => {
        if (userId) {
            axiosJWTadmin
                .get(`http://localhost:3000/admin/peserta/${userId}`)
                .then((response) => {
                    setUserData(response.data.peserta_magang);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [userId]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axiosJWTadmin.patch(
                `http://localhost:3000/admin/peserta/${userId}/edit`,
                userData
            );
            updateUserData(userData);
            handleCloseModal();
            showSuccessNotification("User updated successfully.");
        } catch (error) {
            showErrorNotification("Failed to update user.");
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
            show={showEditUserModal}
            onHide={handleCloseModal}
            backdrop="static"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}
            dialogClassName="modal-dialog-centered"
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateUser}>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan nama"
                            value={userData.nama}
                            onChange={(e) =>
                                setUserData({ ...userData, nama: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserAsalUniv">
                        <Form.Label>Asal Universitas</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan asal universitas"
                            value={userData.asal_univ}
                            onChange={(e) =>
                                setUserData({ ...userData, asal_univ: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserAsalJurusan">
                        <Form.Label>Asal Jurusan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan asal jurusan"
                            value={userData.asal_jurusan}
                            onChange={(e) =>
                                setUserData({ ...userData, asal_jurusan: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserNoTelp">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan nomor telepon"
                            value={userData.no_telp}
                            onChange={(e) =>
                                setUserData({ ...userData, no_telp: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserTanggalMulai">
                        <Form.Label>Tanggal Mulai</Form.Label>
                        <Form.Control
                            type="date"
                            value={userData.tanggal_mulai}
                            onChange={(e) =>
                                setUserData({ ...userData, tanggal_mulai: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserTanggalSelesai">
                        <Form.Label>Tanggal Selesai</Form.Label>
                        <Form.Control
                            type="date"
                            value={userData.tanggal_selesai}
                            onChange={(e) =>
                                setUserData({ ...userData, tanggal_selesai: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Masukkan username"
                            value={userData.username}
                            onChange={(e) =>
                                setUserData({ ...userData, username: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Masukkan password"
                            onChange={(e) => {
                                setUserData({ ...userData, password: e.target.value });
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type="submit" onClick={handleUpdateUser}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUser;