const express = require('express');
const imageController = require('../controllers/Image_Controller');
const imageUploader = require('../helpers/image-uploader');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/upload',checkAuth.checkAuth('admin'), imageUploader.upload.single('image'), imageController.upload);

module.exports = router;