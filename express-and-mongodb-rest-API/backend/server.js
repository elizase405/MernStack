const express = require("express")
const colors = require('colors')
const path = require("path")
const dotenv = require("dotenv").config(path.join(__dirname, '.env'))
const { errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db')
//const port = process.env.PORT || 3000

connectDB() //use mongodb online database

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/goals", require("./routes/goalRoutes"))

app.use(errorHandler)

app.listen(port=2000, ()=>{
    console.log(`server started on port ${port}`)
})
