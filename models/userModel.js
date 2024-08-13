const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {} // default cart is an empt obj
    }
}, { minimize: false })  //added to create cart data entry without any data

module.exports = mongoose.models.user || mongoose.model("user", userSchema);

