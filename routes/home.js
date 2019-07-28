// routes/home.js
const express = require('express')
const router = express.Router()

// load model
const db = require('../models')
const Todo = db.Todo
const User = db.User

// load auth middleware
const { authenticated } = require('../config/auth')

// 設定首頁路由器
router.get('/', authenticated, (req, res) => {
  res.send('列出全部Todo')
})

module.exports = router