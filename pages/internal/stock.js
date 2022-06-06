//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../../components/loader/loader'
import StockScreen from '../../components/pages/stocks/stocks'

import PropTypes from 'prop-types'

import { getCategories } from '../../components/mock/Categories'
import { getStock } from '../../components/mock/Stock'
import routes from '../../navigation/routes'
import { getProduct } from '../../components/mock/Products'

//  Page Component
export async function getServerSideProps (context) {
  const res = await getStock()
  const res2 = await getCategories()

  return {
    props: { allStock: res, allCategories: res2 } // will be passed to the page component as props
  }
}

const Stock = ({ allStock, allCategories }) => {
  const [loaded, setLoaded] = useState(false)
  const categories = allCategories
  const items = allStock
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  items.forEach((item, i) => {
    const prod = getProduct(item.productId)
    items[i].categoria = prod.category
  })


  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Stock',
      href: `${routes.private.internal.stock}`
    }
  ]
  const detailPage = routes.private.internal.stockId
  const props = {
    categories,
    items,
    breadcrumbsPath,
    detailPage
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
Stock.propTypes = {
  categories: PropTypes.array,
  allCategories: PropTypes.array,
  orders: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array
}

export default Stock
