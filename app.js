const init = (db) => {
  const path = require('path')
  const express = require('express')
  const session = require('express-session')
  const app = express()

  const category = require('./models/category')
  const routes = require('./routes')
  
  app.set('view engine', 'ejs')
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(session({
    secret: 'MyDevShop',
    name: 'sessionId'
  }))

  // middleware
  app.use(async (req, res, next) => {
    const categories = await category.getCategories(db)()
    const { user } = req.session
    res.locals = {
      categories,
      user
    }
    next()
  })
  
  app.use(routes(db))
  return app
}

module.exports = init