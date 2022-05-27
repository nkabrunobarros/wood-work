//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import OrdersScreen from '../components/pages/orders/orders'

import PropTypes from 'prop-types'

import getKeywords from '../components/mock/Keywords'
import getCategories from '../components/mock/Categories'
import getOrders from '../components/mock/Orders'

//  Page Component

const Orders = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  const categories = getCategories()

  const orders = getOrders()

  //  Keywords for styling text

  const keywords = getKeywords()
  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7
  }
  const props = {
    categories,
    orders,
    panelsInfo,
    keywords
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
  panelsInfo: PropTypes.object
}

export default Orders
