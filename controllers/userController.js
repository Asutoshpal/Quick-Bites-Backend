const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator'); 

require('dotenv').config();

//Login

exports.userLogin = async (req, res) => {

    const createToken =  (id) => {
         return jwt.sign({id}, process.env.JWT_SECRETE)
    }
    
    try {


        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "enter the required details"
            })
        }
        
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.json({
                success: false,
                message: "User not exists, please register"
            })
        }
        console.log(user.password);

        //check the password
        if (await !bcrypt.compare(password, user.password)) {
            return res.json({
                success: false,
                message: "password mis-matched"
            })
        }

        //if all the things are ok then genrate a token
        const token = createToken(user._id);

        res.json({
            success: true,
            message:"Login sucessful",
            token
        })
        
    } catch (error) {
        console.error(error);

        return res.json({
            success: false,
            message: error.mesage
        })
        
    }
}

//register

exports.userRegister = async (req, res) => {
    const createToken =  (id) => {
         return jwt.sign({id}, process.env.JWT_SECRETE)
    }

    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
           return res.json({
                success: false,
                message: "user already exists"
            })
        }

        //validate the email format and Strong password

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message:"please enter a valid email" 
            })
        }

        //email is valid and now check for password

        if (password.length < 8) {
            return res.json({
                succeess: false,
                mesage: "please enter Strong password"
            })
        }

        //encrypt the password(hashing)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create the new user
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword          
        })

        //save the user
        const token = createToken(user._id);

        res.json({
            success: true,
            message: "registration Successful",
            token
        })

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
