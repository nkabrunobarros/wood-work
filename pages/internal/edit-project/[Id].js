//  Nodes
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

//  Preloader
import Loader from '../../../components/loader/loader';

//  Page Component
import EditProjectScreen from '../../../components/pages/editProject/editProject';

//  Navigation
import routes from '../../../navigation/routes';

//  Services
import * as ClientsActions from '../../api/actions/client';
import * as ProductsActions from '../../api/actions/product';
import * as projectsActions from '../../api/actions/project';

const EditProject = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [project, setproject] = useState();
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const router = useRouter();

  useEffect(() => {
    const getAll = async () => {
      await projectsActions
        .project({ id: router.query.Id })
        .then((res) => setproject(res.data))
        .catch(() => setproject([]));

      await ClientsActions
        .clients()
        .then((res) => setClients(res.data));

      await ProductsActions.products().then((response) => setProducts(response.data)).catch(() => setProducts([]));
    };

    Promise.all([getAll()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Encomendas',
        href: `${routes.private.internal.projects}`,
      },
      {
        title: 'Editar Encomenda',
        href: `${routes.private.internal.project}`,
      },
    ];

    const props = {
      project,
      breadcrumbsPath,
      pageProps,
      clients,
      products
    };

    return <EditProjectScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default EditProject;
