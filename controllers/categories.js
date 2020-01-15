const init = db => {
  const category = require('../models/category')(db)
  const product = require('../models/product')(db)
  
  const getCategories = async (req, res) => {
    const cat = await category.getCategoryById(req.params.id)
    const products = await product.getProductsByCategoryId(req.params.id, req.query)
    res.render('category', { products, category: cat })
  }
  
  const adminGetCategories = async (req, res) => {
    const categories = await category.getCategories()
    res.render('admin/categories/index', { categories })
  }
  
  const adminCreateCategory = async (req, res) => {
    if (req.method === 'GET') {
      res.render('admin/categories/create', { errors: [], form: {} })
    } else {
      try {
        await category.create(req.body)
        res.redirect('/admin/categorias')
      } catch (err) {
        res.render('admin/categories/create', { errors: err.errors.fields, form: req.body })
      }
    }
  }
  
  const adminRemoveCategory = async (req, res) => {
    await category.remove(req.params.id)
    res.redirect('/admin/categorias')
  }
  
  const adminEditCategory = async (req, res) => {
    if (req.method === 'GET') {
      const cat = await category.getCategoryById(req.params.id)
      res.render('admin/categories/update', { errors: [], form: cat[0] })
    } else {
      try {
        await category.update(req.params.id, req.body)
        res.redirect('/admin/categorias')
      } catch (err) {
        res.render('admin/categories/update', { errors: err.errors.fields, form: req.body })
      }
    }
  }
  return {
    getCategories,
    adminGetCategories,
    adminCreateCategory,
    adminEditCategory,
    adminRemoveCategory
  }
}

module.exports = init