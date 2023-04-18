//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import StockScreen from '../../components/pages/stocks/stocks';

//  PropTypes

//  Navigation
import { useDispatch } from 'react-redux';
import routes from '../../navigation/routes';
import * as lefctoversActionsRedux from '../../store/actions/leftover';

export const dummyStocks = [
  { id: 'AG L Biscuit Nude 36W 10', warehouse: '4', material: 'AG L Biscuit Nude 36W 10 ', qtd: 2, comp: 400, larg: 338.5, esp: 10 },
  { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 326.5, larg: 184.5, esp: 16 },
  { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 406, larg: 207.5, esp: 16 },
  { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 326.5, larg: 184.5, esp: 16 },
  { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 406, larg: 207.5, esp: 16 },
  { id: 'AG L Marmol Hades 19 CNC', warehouse: '4', material: 'AG L Marmol Hades 19 CNC', qtd: 1, comp: 2400, larg: 926, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 268, larg: 444, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1678, larg: 444, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 400, larg: 283, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 444, larg: 287, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 924, larg: 283, esp: 19 },
  { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 907, larg: 76, esp: 19 },
  { id: 'MDF Folheado Carv 19', warehouse: '4', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19 },
];

const Stock = () => {
  const [loaded, setLoaded] = useState(false);
  const [stocks, setStocks] = useState();
  const [filtersSizes, setFiltersSizes] = useState();
  const dispatch = useDispatch();
  const getLeftovers = (data) => dispatch(lefctoversActionsRedux.leftovers(data));

  //  Data Fetching
  useEffect(() => {
    const getData = async () => {
      await getLeftovers().then((res) => {
        const newArray = [...res.data].map((obj) => {
          const newObj = {};

          Object.keys(obj).forEach((key) => {
            if (typeof obj[key].value !== 'undefined' || typeof obj[key].object !== 'undefined') {
              newObj[key] = obj[key].value;
            } else newObj[key] = obj[key];
          });

          return newObj;
        });

        let realStocks = newArray;

        if (!newArray[0]) {
          realStocks = [
            { id: 'AG L Biscuit Nude 36W 10', warehouse: '4', material: 'AG L Biscuit Nude 36W 10 ', amount: 2, height: 400, width: 338.5, thickness: 10 },
            { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 2, height: 326.5, width: 184.5, thickness: 16 },
            { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 2, height: 406, width: 207.5, thickness: 16 },
            { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 2, height: 326.5, width: 184.5, thickness: 16 },
            { id: 'AG L Biscuit Nude 36W 16 CNC', warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', amount: 2, height: 406, width: 207.5, thickness: 16 },
            { id: 'AG L Marmol Hades 19 CNC', warehouse: '4', material: 'AG L Marmol Hades 19 CNC', amount: 1, height: 2400, width: 926, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 1, height: 2400, width: 566, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 1, height: 1716, width: 466, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 2, height: 268, width: 444, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 1, height: 1678, width: 444, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 2, height: 400, width: 283, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 2, height: 444, width: 287, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 1, height: 924, width: 283, thickness: 19 },
            { id: 'MDF Folheado Carv 19 CNC', warehouse: '4', material: 'MDF Folheado Carv 19 CNC', amount: 1, height: 907, width: 76, thickness: 19 },
            { id: 'MDF Folheado Carv 19', warehouse: '4', material: 'MDF Folheado Carv 19', amount: 1, height: 2394, width: 560, thickness: 19 },
          ];
        }

        setStocks(realStocks);

        setFiltersSizes({
          width: {
            values: [Math.min(...realStocks.map(o => o.width)), Math.max(...realStocks.map(o => o.width))],
            min: Math.min(...realStocks.map(o => o.width)),
            max: Math.max(...realStocks.map(o => o.width))
          },
          thickness: {
            values: [Math.min(...realStocks.map(o => o.thickness)), Math.max(...realStocks.map(o => o.thickness))],
            min: Math.min(...realStocks.map(o => o.thickness)),
            max: Math.max(...realStocks.map(o => o.thickness))
          },
          height: {
            values: [Math.min(...realStocks.map(o => o.height)), Math.max(...realStocks.map(o => o.height))],
            min: Math.min(...realStocks.map(o => o.height)),
            max: Math.max(...realStocks.map(o => o.height))
          },
        });
      });
    };

    Promise.all([getData()]).then(() => setLoaded(true));
  }, []);

  if (loaded) {
    //  Table header
    const headCells = [
      {
        id: 'material',
        label: 'Material',
        width: '20%',
      },
      {
        id: 'amount',
        label: 'Disponivel',
      },
      {
        id: 'height',
        label: 'Comp',
      },
      {
        id: 'width',
        label: 'Largura',
      },
      {
        id: 'thickness',
        label: 'Espessura',
      },
      {
        id: 'warehouse',
        label: 'Armazem',
      },
      // {
      //   id: 'actions',
      //   numeric: true,
      //   label: 'Ações',
      // },
    ];

    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Stock',
        href: `${routes.private.internal.stocks}`,
      },
    ];

    const detailPage = routes.private.internal.stock;

    const props = {
      breadcrumbsPath,
      detailPage,
      headCells,
      stocks,
      filtersSizes
    };

    return <StockScreen {...props} />;
  }

  return <Loader center={true} />;
};

export default Stock;
