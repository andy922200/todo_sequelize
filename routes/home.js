// routes/home.js
const express = require('express')
const router = express.Router()

// 設定首頁路由器
router.get('/', (req, res) => {
  return res.render('index')
})

module.exports = router