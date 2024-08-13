const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const { addFood, listFood, removeFoodItem } = require('../controllers/foodController');

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), addFood);
router.get('/list', listFood);
router.delete('/remove', removeFoodItem)



module.exports = router;
