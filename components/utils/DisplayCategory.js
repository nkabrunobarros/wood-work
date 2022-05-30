import { getCategories } from '../mock/Categories'

const getCategory = (categoryId) => {
  const { find } = require('lodash')
  const categories = getCategories()
  const category = find(categories, { id: categoryId })
  return `${category.title}[${category.id}]`
}
export default getCategory