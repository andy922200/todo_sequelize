// routes/user.js
const express = require('express')
const router = express.Router()

// load database
const db = require('../models')
const Todo = db.Todo
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 登入檢查
router.post('/login', (req, res) => {
  res.send('login')
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
router.post('/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect('/'))
})
// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router