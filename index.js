const path = require('path')
const express = require('express')
const knex = require('knex')

const category = require('./models/category')

const home = require('./routes/home')
const categories = require('./routes/categories')
const products = require('./routes/products')

const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'devshop'
  }
})

db.on('query', (query) => {
  console.log('SQL:', query.sql)
})

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(async (req, res, next) => {
  const categories = await category.getCategories(db)()
  res.locals = {
    categories
  }
  next()
})

app.use(home())
app.use(categories(db))
app.use(products(db))

app.listen(port, (err) => {
  if (err) {
    console.log('Erro ao iniciar o servidor:', port)
  } else {
    console.log('Server running on:', port)
  }
})