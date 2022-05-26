//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import HomeScreen from '../components/pages/home/home'

import PropTypes from 'prop-types'

//  Page Component

const Home = () => {
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
      stock: true,
      production: 'Não Iniciada',
      distribution: 'Não'
    },
    {
      id: 56598,
      category: 128,
      stock: false,
      production: 'Iniciada',
      distribution: 'Em Curso'
    },
    {
      id: 1274721,
      category: 851,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 12312,
      category: 512,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 153434,
      category: 128,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 434353,
      category: 512,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 2456245,
      category: 851,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 221441,
      category: 851,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    },
    {
      id: 432535,
      category: 512,
      stock: true,
      production: 'Terminada',
      distribution: 'Entregue'
    }
  ]

  const props = {
    categories,
    orders
  }

  return loaded ? <HomeScreen { ...props } /> : <div> <Loader center={true} /></div>
}
Home.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array
}

export default Home
