const Food = require('../models/foodModel');
const fs = require('fs');
//add new food aitem in db
exports.addFood = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // File name from multer
        const image_filename = req.file.filename;

        // Create new food item
        const food = new Food({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        // Save food item to the database
        await food.save();

        res.status(200).json({
            success: true,
            message: "Food added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//all food list
exports.listFood = async (req, res) => {
    try {

        const foods = await Food.find({});
        res.json({
            success: true, 
            data: foods
        })
         
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
     }
}

exports.removeFoodItem = async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            res.json({
                success: false,
                message: "cant find the image"
            })
        }
        const food = await Food.findByIdAndDelete(id);
        console.log(food.image);
        fs.unlink(`./uploads/${food.image}`, () => { });

        res.json({
            success: true,
            message: "food data is deleted"
        });

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "file system prob"
        })
       }
}
