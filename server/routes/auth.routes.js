const {Router} = require('express');
const {login, createUser} = require('../controllers/auth.controller');
const router = Router();

// concatenate with '/api/auth'
router.post('/admin/login', login);
router.post('/admin/create', createUser);

module.exports = router;
