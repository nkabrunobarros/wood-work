async function getCategories () {
  const categories = [
    {
      id: '512',
      title: 'Armário'
    },
    {
      id: '128',
      title: 'Mesa'
    },
    {
      id: '851',
      title: 'Madeira'
    },
    {
      id: '100',
      title: 'Variados'
    }
  ]
  return categories
}
async function getCategory(id) {
  const categories = await getCategories();
  const foundCategory = categories.find(
    (element) => element.id.toString() === id.toString()
  );

  return foundCategory;
}
export { getCategories, getCategory }