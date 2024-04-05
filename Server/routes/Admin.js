//Admin routes
const express = require('express');
const adminController = require('../controllers/Admin_Controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const imageUploader = require('../helpers/image-uploader')

const router = express.Router();

router.get("/show-admin-id/:id", checkAuthMiddleware.checkAuth('admin'), adminController.showAdminById);
router.get("/show-admin", checkAuthMiddleware.checkAuth('admin'), adminController.showAdmin);
router.post("/add-admin", checkAuthMiddleware.checkAuth('admin'), adminController.addAdmin);
router.patch("/edit-admin/:id", checkAuthMiddleware.checkAuth('admin'), adminController.editAdmin);
router.delete("/admin/:id/delete", checkAuthMiddleware.checkAuth('admin'), adminController.deleteAdmin);
router.get("/export-admin", checkAuthMiddleware.checkAuth('admin'), adminController.exportAdmin);

router.get("/peserta",  checkAuthMiddleware.checkAuth('admin'), adminController.showPesertaAll);
router.get("/peserta-aktif",  checkAuthMiddleware.checkAuth('admin'), adminController.showPesertaAktifAll);
router.get("/peserta-alumni", checkAuthMiddleware.checkAuth('admin'), adminController.showPesertaAlumniAll);
router.get("/peserta-calon", checkAuthMiddleware.checkAuth('admin'), adminController.showCalonPesertaAll);
router.get("/peserta/:id",  checkAuthMiddleware.checkAuth('admin'),adminController.showPeserta); 
router.post("/peserta/add", checkAuthMiddleware.checkAuth('admin'), adminController.addPeserta);
router.patch("/peserta/:id/edit", checkAuthMiddleware.checkAuth('admin'), adminController.editPeserta);
router.delete("/peserta/:id/delete", checkAuthMiddleware.checkAuth('admin'), adminController.deletePeserta);
router.get("/export-peserta",  checkAuthMiddleware.checkAuth('admin'), adminController.exportPeserta);
router.get("/export-peserta-aktif",  checkAuthMiddleware.checkAuth('admin'), adminController.exportPesertaAktif);
router.get("/export-peserta-alumni", checkAuthMiddleware.checkAuth('admin'), adminController.exportPesertaAlumni);
router.get("/export-peserta-calon", checkAuthMiddleware.checkAuth('admin'), adminController.exportCalonPeserta);
router.get("/peserta/:id/presensi",checkAuthMiddleware.checkAuth('admin'), adminController.showPresensiPeserta);
router.get("/export-presensi-peserta/:id", checkAuthMiddleware.checkAuth('admin'), adminController.exportPresensiPerPeserta);

router.get("/presensi", checkAuthMiddleware.checkAuth('admin'), adminController.showPresensiPerDay);
router.get("/presensi/negatif", checkAuthMiddleware.checkAuth('admin'), adminController.showPresensiBelum);
router.get("/presensi/:id", checkAuthMiddleware.checkAuth('admin'), adminController.showPresensiPerPeserta);
router.get("/export-presensi", checkAuthMiddleware.checkAuth('admin'), adminController.exportPresensiPerTanggal);


router.get("/tugas", checkAuthMiddleware.checkAuth('admin'), adminController.showTugasAll);
router.get("/tugas-by-id/:id", checkAuthMiddleware.checkAuth('admin'), adminController.showTugasById);
router.post("/tugas/add", checkAuthMiddleware.checkAuth('admin'), adminController.addTugas);
router.patch("/tugas/:id/edit", checkAuthMiddleware.checkAuth('admin'), adminController.editTugas);
router.get("/tugas/:id", checkAuthMiddleware.checkAuth('admin'), adminController.showTugasStatusByTugas);
router.delete("/tugas/:id/delete", checkAuthMiddleware.checkAuth('admin'), adminController.deleteTugas);
router.get("/tugas/:id/export-tugas", checkAuthMiddleware.checkAuth('admin'), adminController.exportStatusTugas);

module.exports = router;