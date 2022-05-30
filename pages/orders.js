//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import OrdersScreen from '../components/pages/orders/orders'

import PropTypes from 'prop-types'

import { getCategories } from '../components/mock/Categories'
import getOrders from '../components/mock/Orders'
import routes from '../navigation/routes'

export async function getServerSideProps (context) {
  const res = await getCategories()

  return {
    props: { categories: res } // will be passed to the page component as props
  }
}

const Orders = ({ categories }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.orders}`
    }
  ]
  const items = getOrders()

  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7
  }
  const tableCols = [
    'numero',
    'categoria',
    'stock',
    'produção',
    'em distribuição',
    'ações'
  ]

  const detailPage = routes.private.order

  const props = {
    categories,
    items,
    panelsInfo,
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
Orders.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.any
}

export default Orders
