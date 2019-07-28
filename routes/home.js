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
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user is not found.")
      return Todo.findAll({
        where: { UserId: req.user.id }
      })
    })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router