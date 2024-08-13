const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async(req, res, next) => {
  const { token } = req.headers;
        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorised login Again"
            })
        }
        
    try {

     const token_decode = jwt.verify(token, process.env.JWT_SECRETE);


        req.body.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
