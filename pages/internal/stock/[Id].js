/* eslint-disable react/prop-types */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../../components/loader/loader'
import StockScreen from '../../../components/pages/stock/stock'
import routes from '../../../navigation/routes'
import { getStock } from '../../../components/mock/Stock'
import { getProduct } from '../../../components/mock/Products'
import hasData from '../../../components/utils/hasData'
import categoryService from '../../../services/categories/category-service'

export async function getServerSideProps (context) {
  const res = await getStock()
  return {
    props: { allStock: res } // will be passed to the page component as props
  }
}
const Stock = ({ allStock, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false)
  const [product, setProduct] = useState({})
  const [categories, setCategories] = useState()
  const router = useRouter()
  const stockId = router.query.Id
  const stock = allStock.find((prod) => prod.id.toString() === stockId.toString())
  
  useEffect(() => {
    const getProd = async () => {
      const productRes = await getProduct(stock.productId)
      const categoriesRes = await categoryService.getAllCategories()
      setProduct(productRes)
      setCategories(categoriesRes.data.data)
    }
    getProd();
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [])
  const data = {
    categories
  }
  const breadcrumbsPath = [
    {
      title: 'Stock',
      href: `${routes.private.internal.stocks}`
    },
    {
      title: `${product.nome}`,
      href: `${routes.private.internal.stockId}`
    }
  ]
  const props = {
    product,
    breadcrumbsPath,
    stock,
    data
  }
  if (
    hasData(allStock) &&
    hasData(product) &&
    hasData(data) &&
    hasData(stock) 
  )
    pageProps.hasFullyLoaded = true;
    // return true
    return pageProps.hasFullyLoaded && loaded
      ? (
      <StockScreen {...props} />
        )
      : (
      <Loader center={true} />
        )
}
export default Stock
