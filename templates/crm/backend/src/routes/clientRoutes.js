const express = require('express');
const { getAllClients, createClient } = require('../controllers/clientController');

const router = express.Router();

router.get('/', getAllClients);
router.post('/', createClient);

module.exports = router;
