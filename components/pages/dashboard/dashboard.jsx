/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
//  Nodes
import CssBaseline from '@mui/material/CssBaseline';
// import "nka-gantt-task-react/dist/index.css";
import {
  Box, Card,
  CardContent, Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { AreaChart, Datepicker } from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { PackageCheck } from 'lucide-react';
import React from 'react';
import CustomBreadcrumbs from '../../breadcrumbs';
// import Chart from 'react-apexcharts';
import dynamic from 'next/dynamic';
// import { Gantt } from 'nka-gantt-task-react';
import TransferList from '../../transferList/transferList';

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
          return '$ ' + val + ' thousands';
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
        return val + '%';
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      }
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
          return val + '%';
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

  // const [uploadedFiles, setUploadedFiles] = useState();

  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   setUploadedFiles(acceptedFiles);
  //   alert("Hello! I am an alert box!!");
  // }, []);

  // const [activeRow, setActiveRow] = useState(1);

  // const Row = ({ data }) => {
  //   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  //   return (
  //     <Grid {...getRootProps()} sx={{ borderColor: uploadedFiles && 'var(--green)', color: uploadedFiles && 'var(--green)' }}>
  //       <Grid  {...getRootProps()} onClick={() => setActiveRow(activeRow !== data.index && data.index)} container md={12} p={1} sx={{ minHeight: '50px', cursor: 'pointer', background: isDragActive ? 'lightblue' : 'purple' }}  >
  //         <Grid md={6}>
  //           {!isDragActive ? data.name : 'Drop files here'}
  //         </Grid>
  //         <Grid md={6}>
  //           {data.createdAt}
  //         </Grid>
  //         <Grid md={12}>
  //           <Collapse in={data.active}>
  //             {data.files.map((file, i) => (
  //               <Grid key={100 + i} container md={12} sx={{ minHeight: '50px', background: 'lightblue' }}>

  //                 <Grid md={6}>
  //                   {file}
  //                 </Grid>
  //                 <Grid md={6}>
  //                   {file}
  //                 </Grid>
  //               </Grid>
  //             ))}
  //           </Collapse>
  //         </Grid>

  //       </Grid>
  //       <input {...getInputProps()} type='file' hidden multiple webkitdirectory="" onChange={(e) => console.log(e.target.files)} />
  //     </Grid>

  //   );
  // };

  // const tasks = [
  //   {
  //     start: new Date(2020, 1, 1),
  //     end: new Date(2020, 1, 3),
  //     name: 'Fazer isto',
  //     id: 'Task 0',
  //     type: 'task',
  //     progress: 45,
  //     isDisabled: true,
  //     styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
  //   },
  //   {
  //     start: new Date(2020, 1, 3),
  //     end: new Date(2020, 1, 7),
  //     name: 'Fazer aquilo',
  //     id: 'Task 1',
  //     type: 'task',
  //     progress: 90,
  //     isDisabled: false,
  //     styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
  //   },
  // ];
  const chartdata = [
    {
      date: 'Jan 22',
      SemiAnalysis: 2890,
      'The Pragmatic Engineer': 2338,
    },
    {
      date: 'Feb 22',
      SemiAnalysis: 2756,
      'The Pragmatic Engineer': 2103,
    },
    {
      date: 'Mar 22',
      SemiAnalysis: 3322,
      'The Pragmatic Engineer': 2194,
    },
    {
      date: 'Apr 22',
      SemiAnalysis: 3470,
      'The Pragmatic Engineer': 2108,
    },
    {
      date: 'May 22',
      SemiAnalysis: 3475,
      'The Pragmatic Engineer': 1812,
    },
    {
      date: 'Jun 22',
      SemiAnalysis: 3129,
      'The Pragmatic Engineer': 1726,
    },
  ];

  const dataFormatter = (number) => {
    return '$ ' + Intl.NumberFormat('us').format(number).toString();
  };

  return (
    <Grid component='main'>
      {/* Breadcrumbs */}
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Grid container md={12}>
        <Grid container md={6}>
          <Card fullWidth sx={{ width: '100%' }}>
            <h5>Area Chart lib</h5>
            <AreaChart
              data={chartdata}
              categories={['SemiAnalysis', 'The Pragmatic Engineer']}
              dataKey="date"
              height="h-72"
              colors={['indigo', 'cyan']}
              valueFormatter={dataFormatter}
              marginTop="mt-4"
            />
          </Card>

          {/* <Box>
            <Grid container>
              {[...Array(2)].map((x, i) => <Row key={i} data={{ name: `folder ${i + 1}`, createdAt: `${i + 1}/03/2022`, files: ['1', '2'], active: i === activeRow, index: i }} />)}
            </Grid>
          </Box> */}
        </Grid>
        <Grid container md={6}>
          <Card fullWidth sx={{ width: '100%' }}>

            <h5>Datepicker</h5>
            <Datepicker
              placeholder="Escolher..."
              enableRelativeDates={true}
              color="var(--primary)"
              handleSelect={(startDate, endDate) => console.log(startDate, endDate)}
            />
          </Card>
        </Grid>
        <Grid container md={12} p={2}>
          <Grid item md={12}>
            <h5>Cards</h5>
          </Grid>
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
        <Grid container md={4}>
          <TransferList />
        </Grid>
      </Grid>

    </Grid>
  );
};

export default OrdersScreen;
