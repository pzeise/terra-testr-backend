require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_FRONT_END_PROD
    : process.env.REACT_APP_FRONT_END_DEV,
    credentials: true
}))

//for cookies
app.use(function(req, res, next) {
    res.header({
        "Access-Control-Allow-Origin": process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_FRONT_END_PROD
            : process.env.REACT_APP_FRONT_END_DEV,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, *"
    })
    next()
})
app.use(cookieParser())

//Controllers 
const answerControllers = require('./controllers/answerControllers')
const userControllers = require('./controllers/userControllers')


app.use('/answer', answerControllers)
app.use('/user', userControllers)
app.use('/node_modules', express.static(__dirname + '/node_modules'))


app.get('/', (req, res) => {
    res.send('<h1>We in bois</h1>')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Terra Testr Back End running on port ${port}`)
})