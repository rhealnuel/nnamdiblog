const express = require('express');
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 6000

app.use(express.json());


app.use('/api/', userRoute)
app.use('/api/', postRoute)




//database
mongoose.
connect(MONGO_URL)
.then(() =>{
    console.log('connected to mongodb')

    app.listen(PORT, () => {
        console.log(`app running at port ${PORT}`)
    })
}).catch((error) =>{
    console.log(error)
})
