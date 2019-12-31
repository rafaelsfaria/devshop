const path = require('path')
const express = require('express')
const knex = require('knex')
const slug = require('./utils/slug')
const category = require('./models/category')
const product = require('./models/product')

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

app.get('/', async (req, res) => {
  res.render('home')
})

app.get('/categoria/:id/:slug', async (req, res) => {
  const cat = await category.getCategoryById(db)(req.params.id)
  const products = await product.getProductsByCategoryId(db)(req.params.id)
  res.render('category', { products, category: cat })
})

app.get('/produto/:id/:slug', async (req, res) => {
  const prod = await product.getProductById(db)(req.params.id)
  res.render('product-details', { product: prod })
})

app.listen(port, (err) => {
  if (err) {
    console.log('Erro ao iniciar o servidor:', port)
  } else {
    console.log('Server running on:', port)
  }
})