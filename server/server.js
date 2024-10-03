const express = require("express")
const env = require("dotenv")
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cloudinary = require("cloudinary").v2

//route
const product = require('./routes/product.route')
const user = require('./routes/user.route')
const category = require('./routes/category.route')
const cart = require('./routes/cart.route')

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

env.config()

cloudinary.config({ 
    cloud_name: `${process.env.CLOUD_NAME}`, 
    api_key: `${process.env.CLOUD_API}`, 
    api_secret: `${process.env.CLOUD_SECRET}` 
});


app.use("/api", product)
app.use("/api", user)
app.use("/api", category)
app.use("/api", cart)


app.listen(process.env.PORT ,() =>{
    console.log(`Server running on port ${process.env.PORT}`)
})