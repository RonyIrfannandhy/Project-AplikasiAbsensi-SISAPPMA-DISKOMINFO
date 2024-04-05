const express = require('express');
const userController = require('../controllers/User_Controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const imageUploader = require('../helpers/image-uploader');

const router = express.Router();

router.get("/tugas-list/:id", checkAuthMiddleware.checkAuth('peserta_magang'), userController.showTugasList);
router.patch("/tugas/:id/submit/:tid", checkAuthMiddleware.checkAuth('peserta_magang'), imageUploader.upload.single('image'), (req, res) =>{
    if (!req.file) {
        return res.status(400).json({
          message: 'No file uploaded',
        });
      }

      const uploadedFileUrl = req.file.path;
      userController.doTugas(req,res,uploadedFileUrl);
}); //cek token
router.get('/presensi/:id', checkAuthMiddleware.checkAuth('peserta_magang'), userController.showPresensi); //cek token
router.patch('/presensi/:id/up', checkAuthMiddleware.checkAuth('peserta_magang'), imageUploader.upload.single('image'), (req, res) =>{
    if (!req.file) {
        return res.status(400).json({
          message: 'No file uploaded',
        });
      }

      const uploadedFileUrl = req.file.path;
      userController.doPresensi(req,res,uploadedFileUrl); //cek token
});
router.patch('/peserta/:id/edit', checkAuthMiddleware.checkAuth('peserta_magang'), userController.editPassword); //cek token

module.exports = router;