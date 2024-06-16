const mongoose = require('mongoose')
require('dotenv').config();
const monoUrl = process.env.MONGO_URL;


mongoose.connect(monoUrl)
.then(() => {
    console.log('Connected to database !!!!')
})
.catch((err) => {
    console.log('Failed to connect to MongoDB', err)
})