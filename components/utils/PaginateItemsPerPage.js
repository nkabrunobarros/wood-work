const PaginateItemsPerPage = (array, pageSize, pageNumber) => {
  const output = Object.keys(array).sort((a, b) => b - a)
  const arrayLenght = parseInt(output[0]) + 1
  const data = {
    array: array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize),
    showingMin: pageNumber * pageSize + 1,
    showingMax:
        pageNumber * pageSize + pageSize < arrayLenght
          ? pageNumber * pageSize + pageSize
          : arrayLenght
  }
  return data
}

export default PaginateItemsPerPage
