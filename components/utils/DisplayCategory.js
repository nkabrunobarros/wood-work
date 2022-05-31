import { getCategories } from '../mock/Categories'

const getCategory = (categoryId) => {
  const { find } = require('lodash')
  console.log(categoryId)
  const categories = getCategories()
  console.log(categories)
  const category = find(categories, { id: categoryId.toString() })
  return `${category.title}[${category.id}]`
}
export default getCategory
