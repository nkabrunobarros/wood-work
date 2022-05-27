import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/loader'
import OrderScreen from '../../components/pages/order/order'
import routes from '../../navigation/routes'

const Order = () => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const orderId = router.query.orderId

  const docs = [
    {
      id: Math.random(),
      name: 'Desenho 1',
      data: '11/03/2022'
    },
    {
      id: Math.random(),
      name: 'Maquete 1',
      data: '11/03/2022'
    },
    {
      id: Math.random(),
      name: 'Desenho 2',
      data: '11/03/2022'
    },
    {
      id: Math.random(),
      name: 'Maquete 1',
      data: '11/03/2022'
    }
  ]

  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.orders}`
    },
    {
      title: `Encomenda Nº${orderId}`,
      href: `${routes.private.profile}`
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const props = {
    orderId,
    docs,
    breadcrumbsPath
  }
  return loaded ? <OrderScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Order
