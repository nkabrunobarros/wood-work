import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/loader'
import OrderScreen from '../../components/pages/order/order'

const Order = () => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const orderId = router.query.orderId

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const props = {
    orderId
  }
  return loaded ? <OrderScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Order
