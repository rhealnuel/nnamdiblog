const express = require('express');
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const helmet = require('helmet')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 6000

app.use(express.json());


app.use('/api/', userRoute)
app.use('/api/', postRoute)

// Use helmet to secure your app and set CSP headers
app.use(helmet());

// Customize CSP with your own directives
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'none'"], // Disallow everything by default
    scriptSrc: ["'self'", "https://vercel.live"], // Allow scripts from 'self' and 'https://vercel.live'
    objectSrc: ["'none'"], // Disallow object tags
    styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (if needed)
    // Add more directives as required
  } 
}));




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
