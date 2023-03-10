import { Grid } from '@mui/material';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/layout/navbar/navbar';
import AuthData from '../../lib/AuthData';
import * as budgetsActionsRedux from '../../store/actions/budget';
import * as clientsActionsRedux from '../../store/actions/client';
import * as expeditionsActionsRedux from '../../store/actions/expedition';
import * as projectsActionsRedux from '../../store/actions/project';

const Test = () => {
  const dispatch = useDispatch();
  const getProjects = (data) => dispatch(projectsActionsRedux.projects(data));
  const getBudgets = (data) => dispatch(budgetsActionsRedux.budgets(data));
  const getClients = (data) => dispatch(clientsActionsRedux.clients(data));
  const getExpeditions = (data) => dispatch(expeditionsActionsRedux.expeditions(data));
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState();
  const [expeditions, setExpeditions] = useState();
  const [budgets, setBudgets] = useState();
  const [clients, setClients] = useState();

  async function fetchData (dispatch) {
    let errors = false;

    try {
      AuthData(dispatch);
      await getProjects().then((res) => setProjects(res.data));
      await getExpeditions().then((res) => setExpeditions(res.data));
      await getBudgets().then((res) => setBudgets(res.data));
      await getClients().then((res) => setClients(res.data));
    } catch (err) { errors = true; }

    return !errors;
  }

  useEffect(() => {
    async function loadData () {
      setLoaded(await fetchData(dispatch));
    }

    loadData();
  }, []);

  console.log(expeditions);
  console.log(budgets);
  console.log(clients);

  if (loaded) {
    return <>
      <Navbar />
      <Grid container>
        <Grid container md={12} sm={12} xs={12}></Grid>
        {projects.map((proj) => {
          return <Grid key={proj.id} container md={12} sm={12} xs={12}
            sx={{ border: '1px solid', p: 1 }}
            onClick={() => Router.push('/internal/test2/' + proj.id)}>{proj.id}</Grid>;
        })}
      </Grid>
    </>;
  }

  return 'loading';

  // return <Test />;
};

export default Test;
