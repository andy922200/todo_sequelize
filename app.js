// app.js
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
//const flash = require('connect-flash')
const app = express()
const port = 3000

//辨別開發環境
/*if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}*/

// connect with database
const db = require('./models')
const Todo = db.Todo
const User = db.User

// template engine setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file & related function initialize
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//app.use(flash())

// use express session
app.use(session({
  secret: 'asdfghjkl',
  resave: 'false',
  saveUninitialized: 'false'
}))

// passport initialize
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// save local variables
app.use((req, res, next) => {
  res.locals.user = req.user
  //res.locals.isAuthenticated = req.isAuthenticated()
  // add flash message variables
  //res.locals.success_msg = req.flash('success_msg')
  //res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// express Listener
app.listen(process.env.PORT || port, () => {
  console.log(`Express is listening on localhost ${port}`)
})

// load router settings
app.use('/', require('./routes/home'))
//app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))
//app.use('/auth', require('./routes/auths'))