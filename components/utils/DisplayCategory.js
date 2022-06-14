import { getCategories } from '../mock/Categories'

import { find } from 'lodash'
const getCategory = (categoryId) => {
  const categories = getCategories()
  const category = find(categories, { id: categoryId.toString() })
  return `${category.title}[${category.id}]`
}
export default getCategory
