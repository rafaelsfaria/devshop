const category = require('../models/category')
const product = require('../models/product')

const getCategories = db => async (req, res) => {
  const cat = await category.getCategoryById(db)(req.params.id)
  const products = await product.getProductsByCategoryId(db)(req.params.id)
  res.render('category', { products, category: cat })
}

const adminGetCategories = db => async (req, res) => {
  const categories = await category.getCategories(db)()
  res.render('admin/categories/index', { categories })
}

const adminCreateCategory = db => async (req, res) => {
  if (req.method === 'GET') {
    res.render('admin/categories/create', { errors: [], form: {} })
  } else {
    try {
      await category.create(db)(req.body)
      res.redirect('/admin/categorias')
    } catch (err) {
      res.render('admin/categories/create', { errors: err.errors.fields, form: req.body })
    }
  }
}

const adminRemoveCategory = db => async (req, res) => {
  await category.remove(db)(req.params.id)
  res.redirect('/admin/categorias')
}

const adminEditCategory = db => async (req, res) => {
  if (req.method === 'GET') {
    const cat = await category.getCategoryById(db)(req.params.id)
    res.render('admin/categories/update', { errors: [], form: cat[0] })
  } else {
    try {
      await category.update(db)(req.params.id, req.body)
      res.redirect('/admin/categorias')
    } catch (err) {
      res.render('admin/categories/update', { errors: err.errors.fields, form: req.body })
    }
  }
}

module.exports = {
  getCategories,
  adminGetCategories,
  adminCreateCategory,
  adminEditCategory,
  adminRemoveCategory
}