const express = require('express');
const accountController = require('../controllers/Account_Controller')

const router = express.Router();

router.post("/login", accountController.login);
router.delete("/logout", accountController.logout);
router.get("/token", accountController.refreshToken);
module.exports = router;