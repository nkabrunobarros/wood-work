//  Nodes
import React, { useEffect, useState } from 'react';

import MachineScreen from '../../../components/pages/machine/machine';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Loader from '../../../components/loader/loader';
import routes from '../../../navigation/routes';
import * as machineActionsRedux from '../../../store/actions/machine';
import PropTypes from 'prop-types';

const Machine = ({ pageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const [machine, setMachine] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const getMachine = (data) => dispatch(machineActionsRedux.machine(data));

  useEffect(() => {
    async function load () {
      await getMachine(router.query.Id).then((res) => setMachine(res.data));
    }

    load().then(() => setLoaded(true));
  }, []);

  if (loaded) {
    const breadcrumbsPath = [
      {
        title: 'Máquinas',
        href: `${routes.private.internal.machines}`,
      },
      {
        title: machine.name.value,
        href: `${routes.private.internal.profile}${machine.id}`,
      },
    ];

    const props = {
      breadcrumbsPath,
      pageProps,
      machine,
    };

    return <MachineScreen {...props} />;
  }

  return <Loader center={true} />;
};

Machine.propTypes = {
  pageProps: PropTypes.any,
};

export default Machine;
