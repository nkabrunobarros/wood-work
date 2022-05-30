/* eslint-disable react/prop-types */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/loader'
import StockScreen from '../../components/pages/stock/stock'
import routes from '../../navigation/routes'
import { getStock } from '../../components/mock/Stock'

export async function getServerSideProps (context) {
  const res = await getStock()
  return {
    props: { allStock: res } // will be passed to the page component as props
  }
}
const Stock = ({ allStock }) => {
  console.log(allStock)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const stockId = router.query.Id
  const product = allStock.find((prod) => prod.numero.toString() === stockId.toString())
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const breadcrumbsPath = [
    {
      title: 'Stock',
      href: `${routes.private.stock}`
    },
    {
      title: `${product.nome}`,
      href: `${routes.private.stockId}`
    }
  ]
  const props = {
    product,
    breadcrumbsPath
  }
  return loaded
    ? (
    <StockScreen {...props} />
      )
    : (
    <div>
      <Loader center={true} />
    </div>
      )
}
export default Stock
