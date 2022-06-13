/* eslint-disable react/prop-types */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../../components/loader/loader'
import StockScreen from '../../../components/pages/stock/stock'
import routes from '../../../navigation/routes'
import { getStock } from '../../../components/mock/Stock'
import { getProduct } from '../../../components/mock/Products'
import hasData from '../../../components/utils/hasData'

export async function getServerSideProps (context) {
  const res = await getStock()
  return {
    props: { allStock: res } // will be passed to the page component as props
  }
}
const Stock = ({ allStock, ...pageProps }) => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const stockId = router.query.Id
  const stock = allStock.find((prod) => prod.id.toString() === stockId.toString())
  const product = getProduct(stock.productId)
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [])

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
    stock
  }
  if (
    hasData(allStock) &&
    hasData(product) &&
    hasData(stock) 
  )
    pageProps.hasFullyLoaded = true;
  return pageProps.hasFullyLoaded && loaded
    ? (
    <StockScreen {...props} />
      )
    : (
    <Loader center={true} />
      )
}
export default Stock
