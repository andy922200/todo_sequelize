// routes/user.js
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

// load database
const db = require('../models')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})
// 登入檢查
router.post('/login', (req, res, next) => {
  if ((!req.body.email) || (!req.body.password)) {
    req.flash('warning_msg', '請檢查欄位是否空白')
  }
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
  req.flash('warning_msg', 'Email 或密碼錯誤，請重新輸入')
})
// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []
  if (!name || !email || !password || !password2) {
    errors.push({ message: "請確認已填寫所有選項" })
  }
  if (password !== password2) {
    errors.push({ message: "密碼輸入不一致" })
  }
  if (errors.length > 0) {
    res.render('register', { name, email, errors })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        errors.push({ message: "這個 Email 已被註冊" })
        res.render('register', { name, email, password, password2, errors })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})
// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router