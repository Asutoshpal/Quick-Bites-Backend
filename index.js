const express = require('express');
const app = express();
const fs = require('fs');

const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors()); //using this we can access backend from frontend

//conncect db
const connectDb = require('./config/dbConnect');
connectDb();


const foodRoute = require('./routes/foodRoute');
app.use("/api/food", foodRoute);
const userRoter = require('./routes/userRoute');
app.use('/api/user/', userRoter);
const cartRouter = require('./routes/cartRoute');
app.use('/api/cart', cartRouter);

//uploadfolder append on endpoint
app.use("/images", express.static('uploads'));


app.get('/', (req, res) => {
    res.send("<h1>Hii Buddy </h1>");
})

app.listen(PORT, () => {
     console.log(`Server started on port ${PORT}`)
});