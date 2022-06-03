
async function getStock () {
  const stock = [
    {
      productId: 11,
      categoria: 512,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Madeira 500'
    },
    {
      productId: 12,
      categoria: 100,
      stock: 'Indisponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Pregos'
    },
    {
      productId: 13,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Martelos   '
    },
    {
      productId: 14,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Metal 500'
    },
    {
      productId: 15,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Metal 300'
    },
    {
      productId: 16,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Metal 200'
    }
  ]
  return stock
}

async function getStockById (id) {
  await getStock().then((res) => {
    const product = res.find((prod) => prod.productId.toString() === id)
    return product
  })
}
export { getStock, getStockById }
