async function getStock() {
  const stock = [
    {
      id: 11,
      productId: 11,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
    {
      id: 12,
      productId: 12,
      stock: 'Indisponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
    {
      id: 13,
      productId: 13,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
    {
      id: 14,
      productId: 14,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
    {
      id: 15,
      productId: 15,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
    {
      id: 16,
      productId: 16,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',
      codigo: 'PR 15723',
      quantidade: 20,
    },
  ];
  return stock;
}

async function getStockById(id) {
  await getStock().then((res) => {
    const product = res.find((prod) => prod.productId.toString() === id);
    return product;
  });
}
export { getStock, getStockById };
