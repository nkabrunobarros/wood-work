import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import PackingScreen from '../../components/pages/packing/packing';
import routes from '../../navigation/routes';
import * as modulesActionsRedux from '../../store/actions/module';

const Packing = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getModules = (data) => dispatch(modulesActionsRedux.modules(data));

  useEffect(() => {
    const getData = async () => {
      await getModules().then((res) => console.log(res));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Embalamentos',
        href: `${routes.private.internal.packing}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      pageProps,
      modules: reduxState.modules.data,

    };

    return <PackingScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Packing;
