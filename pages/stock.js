//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import OrdersScreen from '../components/pages/orders/orders'

import PropTypes from 'prop-types'

import getCategories from '../components/mock/Categories'
import { getStock } from '../components/mock/Stock'
import routes from '../navigation/routes'

//  Page Component

const Stock = () => {
  const [loaded, setLoaded] = useState(false)
  const [items, setItems] = useState()
  useEffect(() => {
    const getData = async () => {
      const res = await getStock()
      setItems(res)
    }
    getData()
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  const categories = getCategories()

  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Stock',
      href: `${routes.private.stock}`
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
  const detailPage = routes.private.stockId

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
  orders: PropTypes.array,
  tableCols: PropTypes.array,
  detailPage: PropTypes.any
}

export default Stock
