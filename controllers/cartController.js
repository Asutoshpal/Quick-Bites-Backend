const User = require('../models/userModel');

exports.addToCart = async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData });
        
        res.json({
            success: true,
            messaage: req.body.itemId
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Error"
        })
    }
}
exports.removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);

        let cartData = await userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({
            success: true,
            message: "removed From Cart"
        })
    }
    catch (error) {
        res.json({
            success: false,
            message: error.messaage
        })
    }
}

exports.getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);

        let cartData = await userData.cartData;

        res.json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log(error);
        res, json({
            success: false,
            message: 'error'
        })
    }
}