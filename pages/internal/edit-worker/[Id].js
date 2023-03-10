//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//  Custom Components
import Loader from '../../../components/loader/loader';

//  Page Component
import EditWorkerScreen from '../../../components/pages/editWorker/editWorker';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as workersActionsRedux from '../../../store/actions/worker';

const EditWorker = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const countries = [];
  const profiles = [];
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getWorker = (data) => dispatch(workersActionsRedux.worker(data));

  useEffect(() => {
    const getData = async () => {
      !reduxState.workers.data && await getWorker(router.query.Id);
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded && reduxState.workers.displayedWorker) {
    const breadcrumbsPath = [
      {
        title: 'Utilizadores',
        href: `${routes.private.internal.workers}`,
      },
      {
        title: `${reduxState.workers.displayedWorker.givenName.value + ' ' + reduxState.workers.displayedWorker.familyName.value}`,
        href: `${routes.private.internal.worker}${reduxState.workers.displayedWorker.id}`,
      },
      {
        title: 'Editar Utilizador',
        href: `${routes.private.internal.editWorker}`,
      },
    ];

    console.log(pageProps);

    const props = {
      breadcrumbsPath,
      user: reduxState.workers.displayedWorker,
      pageProps,
      countries,
      profiles,
    };

    return loaded && <EditWorkerScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditWorker;
