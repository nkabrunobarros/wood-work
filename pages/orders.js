//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import OrdersScreen from '../components/pages/orders/orders'

import PropTypes from 'prop-types'

//  Page Component

const Orders = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  const categories = [
    {
      id: 512,
      title: 'Armário'
    },
    {
      id: 128,
      title: 'Mesa'
    },
    {
      id: 851,
      title: 'Madeira'
    }
  ]

  const orders = [
    {
      id: 1574523,
      category: 512,
      stock: 'Disponível',
      production: 'Não Iniciada',
      distribution: 'Não'
    },
    {
      id: 56598,
      category: 128,
      stock: 'Indisponível',
      production: 'Iniciada',
      distribution: 'Em Curso'
    },
    {
      id: 1274721,
      category: 851,
      stock: 'Disponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 12312,
      category: 512,
      stock: 'Disponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 153434,
      category: 128,
      stock: 'Disponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 434353,
      category: 512,
      stock: 'Indisponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 2456245,
      category: 851,
      stock: 'Disponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 221441,
      category: 851,
      stock: 'Indisponível',
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 432535,
      category: 512,
      stock: 'Disponível',
      production: 'Terminada',
      distribution: 'Entregue'
    }
  ]

  //  Keywords for styling text
  const keywords = {
    errorKeywords: ['Não', 'Não Iniciada', 'Indisponível', 'Indisponível'],
    successKeywords: ['Entregue', 'Terminada', 'Disponível'],
    warningKeywords: ['Iniciada', 'Em Curso']
  }

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
      {' '}
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
