
async function getStock () {
  const stock = [
    {
      numero: 11,
      categoria: 512,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Madeira 500'
    },
    {
      numero: 12,
      categoria: 100,
      stock: 'Indisponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Pregos'
    },
    {
      numero: 13,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Martelos   '
    },
    {
      numero: 14,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Metal 500'
    },
    {
      numero: 15,
      categoria: 100,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      nome: 'Metal 300'
    },
    {
      numero: 16,
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
    const product = res.find((prod) => prod.numero.toString() === id)
    return product
  })
}
export { getStock, getStockById }
