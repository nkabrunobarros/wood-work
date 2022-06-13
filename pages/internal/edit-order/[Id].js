/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Loader from '../../../components/loader/loader';
import EditOrderScreen from '../../../components/pages/editOrder/editOrder';
import routes from '../../../navigation/routes';
import { getOrders } from '../../../components/mock/Orders';

export async function getServerSideProps(context) {
  const res = await getOrders();
  return {
    props: { orders: res }, // will be passed to the page component as props
  };
}
const EditOrder = ({ orders }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const orderId = router.query.Id;
  const order = orders.find(
    (order) => order.id.toString() === orderId.toString()
  );

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, []);

  const breadcrumbsPath = [
    {
      title: 'Encomendas',
      href: `${routes.private.internal.orders}`,
    },
    {
      title: `Editar Encomenda`,
      href: `${routes.private.internal.order}`,
    },
  ];
  const props = {
    order,
    breadcrumbsPath,
  };
  return loaded ? (
    <EditOrderScreen {...props} />
  ) : (
    <Loader center={true} />
  );
};
export default EditOrder;
