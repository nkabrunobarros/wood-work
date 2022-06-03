//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../../components/loader/loader'
import OrdersScreen from '../../components/pages/stock/stock'

import PropTypes from 'prop-types'

import { getCategories } from '../../components/mock/Categories'
import { getStock } from '../../components/mock/Stock'
import routes from '../../navigation/routes'

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

  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Stock',
      href: `${routes.private.internal.stock}`
    }
  ]
  const tableCols = [
    'nome',
    'codigo',
    'fornecedor',
    'categoria',
    'stock',
    'ações'
  ]
  const detailPage = routes.private.internal.stockId
  const props = {
    categories,
    items,
    tableCols,
    breadcrumbsPath,
    detailPage
  }

  return loaded
    ? (
    <OrdersScreen {...props} />
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
  tableCols: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array
}

export default Stock
