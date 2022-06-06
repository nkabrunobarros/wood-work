function getProducts() {
  const products = [
    {
      id: 11,
      nome: 'kichen table',
      category: 851,
      woodType: 11,
      custo: 199,
      hours: 1.5
    },
    {
      id: 12,
      nome: 'Kitchen counterTop',
      category: 512,
      woodType: 12,
      custo: 323,
      hours: 1
    },
    {
      id: 13,
      nome: 'door',
      category: 512,
      woodType: 13,
      custo: 551,
      hours: 2
    },
    {
      id: 14,
      nome: 'wood 500 slab',
      category: 100,
      woodType: 14,
      custo: 23,
      hours: 0.5
    },
    {
      id: 15,
      nome: 'product a',
      category: 512,
      woodType: 15,
      custo: 421,
      hours: 3
    },
    {
      id: 16,
      nome: 'product b',
      category: 851,
      woodType: 16,
      custo: 77,
      hours: 4
    },
  ];
  return products;
}


function getProduct(id) {
  const products = getProducts()
  const foundProduct = products.find(element => element.id.toString() === id.toString())
  return foundProduct;
}

export { getProducts, getProduct };
