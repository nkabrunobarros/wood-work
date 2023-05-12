import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader/loader';
import NewPackagingScreen from '../../../components/pages/newPacking/newPacking';
import routes from '../../../navigation/routes';
import * as modulesActionsRedux from '../../../store/actions/module';
import * as parsActionsRedux from '../../../store/actions/part';
import * as projectsActionsRedux from '../../../store/actions/project';

const NewPackaging = ({ ...pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [project, setProject] = useState(false);
  const [parts, setParts] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const getModules = (data) => dispatch(modulesActionsRedux.modules(data));
  const getProject = (data) => dispatch(projectsActionsRedux.project(data));
  const getParts = (data) => dispatch(parsActionsRedux.parts(data));

  useEffect(() => {
    const getData = async () => {
      await getProject(router.query.Id).then((res) => setProject(res.data));
      await getParts({ belongsTo: router.query.Id }).then((res) => setParts(res.data));
      await getModules().then((res) => console.log(res));
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Embalamentos',
        href: `${routes.private.internal.packingList}`,
      },
      {
        title: `Embalamentos Projeto ${project.name?.value}`,
        href: `${routes.private.internal.packingList}`,
      },
      {
        title: 'Novo embalamento',
        href: `${routes.private.internal.NewPackaging}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      pageProps,
      modules: reduxState.modules.data,
      parts,
      project
    };

    return <NewPackagingScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default NewPackaging;
