const slug = require('../utils/slug')
const Joi = require('@hapi/joi')
const validation = require('../utils/validation')

const createSchema = Joi.object({
  category: Joi.string().min(5).max(245).required(),
  description: Joi.string().min(5).required()
})

const getCategories = (db) => async () => {
  const categories = await db('categories').select('*')
  const categoriesWithSlug = categories.map((category) => {
    const newCategory = { ...category, slug: slug(category.category) }
    return newCategory
  })
  return categoriesWithSlug
}

const getCategoryById = (db) => async (id) => (await db('categories').select('*').where('id', id))

const create = (db) => async (category) => {
  const value = validation.validate(createSchema, category)
  await db('categories').insert(value)
  return true
}

const remove = (db) => async (id) => {
  await db('categories').where({ id }).del()
}

const update = (db) => async (id, category) => {
  const value = validation.validate(createSchema, category)
  await db('categories').where({ id }).update(value)
  return true
}

module.exports = {
  getCategories,
  getCategoryById,
  create,
  remove,
  update
}