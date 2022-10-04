//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import PropTypes from 'prop-types';

import {
  Box, Card,
  CardContent, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { PackageCheck } from 'lucide-react';
import CustomBreadcrumbs from '../../breadcrumbs';
// import Chart from 'react-apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


// const MyDataGrid = dynamic(() => import('../../datagrid/DataGrid'), { ssr: false })


const OrdersScreen = ({ ...props }) => {
  const { breadcrumbsPath, ordersGraph, ordersDonut } = props;

  const options = {
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    }
  };

  const options2 = {
    series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }

    },
    title: {
      text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return (
    <Grid component='main'>
      <CssBaseline />
      {/* Breadcrumbs */}
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container p={2}>
        <Grid item md={3} p={1}>
          <Card sx={{ background: 'var(--primary-gradient)' }}>
            <CardContent>
              <Grid container>
                <Grid id='align' md={4} item>
                  <PackageCheck size={40} color='white' />
                </Grid>
                <Grid id='align' md={8} item>
                  <Typography sx={{ color: 'var(--white)' }}>Text will be here</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} p={1}>
          <Card sx={{ background: 'var(--green-gradient)' }}>
            <CardContent>
              <Grid container>
                <Grid id='align' md={4} item>
                  <PackageCheck size={40} color='white' />
                </Grid>
                <Grid id='align' md={8} item>
                  <Typography sx={{ color: 'var(--white)' }}>Text will be here</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} p={1}>
          <Card sx={{ background: 'var(--orange-gradient)' }}>
            <CardContent>
              <Grid container>
                <Grid id='align' md={4} item>
                  <PackageCheck size={40} color='white' />
                </Grid>
                <Grid id='align' md={8} item>
                  <Typography sx={{ color: 'var(--white)' }}>Text will be here</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} p={1}>
          <Card sx={{ background: 'var(--primary-dark-gradient)' }}>
            <CardContent>
              <Grid container>
                <Grid id='align' md={4} item>
                  <PackageCheck size={40} color='white' />
                </Grid>
                <Grid id='align' md={8} item>
                  <Typography sx={{ color: 'var(--white)' }}>Text will be here</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container p={2} md={12}>
        <Grid container item md={4} p={2}>
          <Card sx={{ width: '100%' }}>
            <Box sx={{ paddingLeft: '1rem' }}>
              <Typography sx={{ color: 'var(--primary)' }}>Encomendas</Typography>
            </Box>
            <CardContent>
              <Chart options={ordersGraph.options} series={ordersGraph.series} style={{ width: '100%' }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid container item md={4} p={2}>
          <Chart options={options} series={options.series} style={{ width: '100%' }} />
        </Grid>
        <Grid container item md={4} p={2}>
          <Chart options={options2} series={options2.series} style={{ width: '100%' }} />
        </Grid>
        <Grid container item md={4} p={2}>
          <Chart options={ordersDonut} type='donut' series={ordersDonut.series} style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

OrdersScreen.propTypes = {
  ordersDonut: PropTypes.any,
  ordersGraph: PropTypes.any,
  breadcrumbsPath: PropTypes.array,
};

export default OrdersScreen;
