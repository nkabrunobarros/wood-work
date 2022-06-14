async function getProducts() {
  const products = [
    {
      id: 11,
      nome: "kichen table",
      category: 851,
      woodType: 11,
      custo: 199,
      hours: 1.5,
      codigo: "PR 55464",
    },
    {
      id: 12,
      nome: "Kitchen counterTop",
      category: 512,
      woodType: 12,
      custo: 323,
      hours: 1,
      codigo: "PR 1232",
    },
    {
      id: 13,
      nome: "door",
      category: 512,
      woodType: 13,
      custo: 551,
      hours: 2,
      codigo: "PR 15723",
    },
    {
      id: 14,
      nome: "wood 500 slab",
      category: 100,
      woodType: 14,
      custo: 23,
      hours: 0.5,
      codigo: "PR 45734",
    },
    {
      id: 15,
      nome: "product a",
      category: 512,
      woodType: 15,
      custo: 421,
      hours: 3,
      codigo: "PR 21422",
    },
    {
      id: 16,
      nome: "product b",
      category: 851,
      woodType: 16,
      custo: 77,
      hours: 4,
      codigo: "PR 21314",
    },
  ];
  return products;
}

async function getProduct(id) {
  const products = await getProducts();
  console.log(products);
  const foundProduct = products.find(
    (element) => element.id.toString() === id.toString()
  );
  return foundProduct;
}

export { getProducts, getProduct };
