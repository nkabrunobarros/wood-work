async function getAllStock() {
  const stock = [
    {
      id: 11,
      productId: 11,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
    {
      id: 12,
      productId: 12,
      stock: 'Indisponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
    {
      id: 13,
      productId: 13,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
    {
      id: 14,
      productId: 14,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
    {
      id: 15,
      productId: 15,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
    {
      id: 16,
      productId: 16,
      stock: 'Disponível',
      fornecedor: 'Lorem Ipsum',

      quantidade: 20,
    },
  ];
  return stock;
}

async function getStock(id) {
  const allStock = await getAllStock();
  const stock = allStock.find((stock) => stock.id.toString() === id.toString());
  return stock;
}
export { getAllStock, getStock };
