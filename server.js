const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080
const routes = require('./router/api')
//Database

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/mern',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',() => {
    console.log('Mongoose is connected!!!')
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
// HTTP request logger
app.use(morgan('tiny'))
app.use('/api',routes)



app.listen(PORT, console.log(`Servido ligado na porta ${PORT}`))