const mongoose = require('mongoose');

require('dotenv').config();

const connectDb =  async () => {
    // mongoose.connect(process.env.DATABASE_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
// })
    await mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
          console.log("Db connected sucessfully")
        })
        .catch((error) => {
            console.error(error);
            console.log("error in Db connect")
    })
}
module.exports = connectDb;