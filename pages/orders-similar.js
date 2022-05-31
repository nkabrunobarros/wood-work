//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import OrdersScreen from '../components/pages/ordersSimilar/orders-similar'

import PropTypes from 'prop-types'

import getProducts from '../components/mock/Products'
import routes from '../navigation/routes'

export async function getServerSideProps (context) {
  const res = getProducts()

  return {
    props: { items: res } // will be passed to the page component as props
  }
}

const OrdersSimilar = ({ items }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])
  //  Breadcrumbs path feed
  const breadcrumbsPath = [
    {
      title: 'Encomendas Similares',
      href: `${routes.private.ordersSimilar}`
    }
  ]

  const panelsInfo = {
    budgeting: 2,
    drawing: 1,
    production: 3,
    concluded: 7
  }
  const tableCols = [
    'nome',
    'numEncomenda',
    'cliente',
    'previsto',
    'realizado',
    'desvio',
    'horasAtuais',
    'previsto2',
    'realizado2',
    'desvio2',
    'ações'
  ]

  function formatNum (val1, val2) {
    console.log(val2)
    const res = val1 - val2

    if(Number.isInteger(res)) return res
    else return res.toFixed(2)
    
  }

  items.map((item, i) => (
    items[i].desvio = formatNum(item.previsto, item.realizado)
  ))
  items.map((item, i) => (
    items[i].desvio2 = formatNum(item.previsto2, item.realizado2)
  ))

  const detailPage = routes.private.order

  const props = {
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
OrdersSimilar.propTypes = {
  items: PropTypes.array,
  orders: PropTypes.array,
  panelsInfo: PropTypes.object,
  tableCols: PropTypes.array,
  breadcrumbsPath: PropTypes.array,
  detailPage: PropTypes.any
}

export default OrdersSimilar
