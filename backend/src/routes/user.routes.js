const { Router } = require('express');
const { createUser, getUsers, updateUser, deleteUser, login } = require('../controllers/user.controller');

const router = Router();

router.post('/usuarios', createUser);
router.get('/usuarios', getUsers);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);
router.post('/login', login);

module.exports = router;
