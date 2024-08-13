const express = require('express');
const router = express.Router();


const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');

const { authMiddleware } = require('../middleware/auth')


router.post('/add', authMiddleware, addToCart);
router.post('/remove',authMiddleware, removeFromCart);
router.get("/get", authMiddleware, getCart);

module.exports = router;