//  Nodes
import React, { useEffect, useState } from 'react'

//  Preloader
import Loader from '../components/loader/loader'
import ProfileScreen from '../components/pages/profile/profile'

//  Page Component

const Profile = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1500)
  }, [])

  const user = {
    id: Math.random(),
    name: 'Bruno Barros',
    email: 'bruno.barros@nka.pt',
    permission: 'Administrador',
    status: 'Ativo',
    cellphone: '939921227',
    phoneCode: '+351',
    phone: '258258258',
    address: 'Rua do quintal, Nº 47',
    country: 'Portugal'
  }
  const props = {
    user
  }

  return loaded ? <ProfileScreen {...props} /> : <div> <Loader center={true} /></div>
}
export default Profile
