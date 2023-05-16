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
  { id: 'AGLBiscuitNude36W10', warehouse: '4', material: 'AG L Biscuit Nude 36W 10 ', amount: 2, height: 400, width: 338.5, thickness: 10, Espessura: 10 },
  {
    id: 'AG_LBiscuitNude36W16CNC',
    warehouse: '4',
    material: 'AG L Biscuit Nude 36W 16 CNC',
    amount: 2,
    qtd: 2,
    height: 326.5,
    Comprimento: 326.5,
    comp: 326.5,
    width: 184.5,
    larg: 184.5,
    Largura: 184.5,
    thickness: 16,
    esp: 16,
    Espessura: 16
  },
  {
    id: 'AG_LBiscuitNude36W16CNC1',
    warehouse: '4',
    material: 'AG L Biscuit Nude 36W 16 CNC',
    amount: 2,
    qtd: 2,
    height: 406,
    Comprimento: 406,
    comp: 406,
    width: 207.5,
    larg: 207.5,
    Largura: 207.5,
    thickness: 16,
    esp: 16,
    Espessura: 16
  },
  {
    id: 'AG_LBiscuitNude36W16CNC2',
    warehouse: '4',
    material: 'AG L Biscuit Nude 36W 16 CNC',
    amount: 2,
    qtd: 2,
    height: 326.5,
    Comprimento: 326.5,
    comp: 326.5,
    width: 184.5,
    larg: 184.5,
    Largura: 184.5,
    thickness: 16,
    esp: 16,
    Espessura: 16
  },
  {
    id: 'AG_LBiscuitNude36W16CNC3',
    warehouse: '4',
    material: 'AG L Biscuit Nude 36W 16 CNC',
    amount: 2,
    qtd: 2,
    height: 406,
    Comprimento: 406,
    comp: 406,
    width: 207.5,
    larg: 207.5,
    Largura: 207.5,
    thickness: 16,
    esp: 16,
    Espessura: 16
  },
  {
    id: 'AG_LMarmolHades19CNC',
    warehouse: '4',
    material: 'AG L Marmol Hades 19 CNC',
    amount: 0,
    qtd: 0,
    height: 2400,
    Comprimento: 2400,
    comp: 2400,
    width: 926,
    larg: 926,
    Largura: 926,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 1,
    qtd: 1,
    height: 2400,
    Comprimento: 2400,
    comp: 2400,
    width: 566,
    larg: 566,
    Largura: 566,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC1',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 1,
    height: 1716,
    Comprimento: 1716,
    width: 466,
    Largura: 466,
    thickness: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC2',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 2,
    qtd: 2,
    height: 268,
    Comprimento: 268,
    comp: 268,
    width: 444,
    larg: 444,
    Largura: 444,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC3',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 1,
    height: 1678,
    Comprimento: 1678,
    width: 444,
    Largura: 444,
    thickness: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC4',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 2,
    qtd: 2,
    height: 444,
    Comprimento: 444,
    comp: 444,
    width: 287,
    larg: 287,
    Largura: 287,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC5',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 2,
    qtd: 2,
    height: 444,
    Comprimento: 444,
    comp: 444,
    width: 287,
    larg: 287,
    Largura: 287,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC6',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 1,
    qtd: 1,
    height: 924,
    Comprimento: 924,
    comp: 924,
    width: 283,
    larg: 283,
    Largura: 283,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19CNC7',
    warehouse: '4',
    material: 'MDF Folheado Carv 19 CNC',
    amount: 1,
    qtd:

      1,
    height: 907,
    Comprimento: 907,
    comp: 907,
    width: 76,
    larg: 76,
    Largura: 76,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
  {
    id: 'MDFFolheadoCarv19',
    warehouse: '4',
    material: 'MDF Folheado Carv 19',
    amount: 1,
    qtd: 1,
    height: 2394,
    Comprimento: 2394,
    comp: 2394,
    width: 560,
    larg: 560,
    Largura: 560,
    thickness: 19,
    esp: 19,
    Espessura: 19
  },
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
          realStocks = dummyStocks;
        }

        setStocks(realStocks);

        setFiltersSizes({
          Largura: {
            values: [Math.min(...realStocks.map(o => o.width)), Math.max(...realStocks.map(o => o.width))],
            min: Math.min(...realStocks.map(o => o.width)),
            max: Math.max(...realStocks.map(o => o.width))
          },
          Espessura: {
            values: [Math.min(...realStocks.map(o => o.thickness)), Math.max(...realStocks.map(o => o.thickness))],
            min: Math.min(...realStocks.map(o => o.thickness)),
            max: Math.max(...realStocks.map(o => o.thickness))
          },
          Comprimento: {
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
        show: true,
      },
      {
        id: 'amount',
        label: 'Disponivel',
        show: true,
      },
      {
        id: 'Comprimento',
        label: 'Comprimento',
        show: true,
      },
      {
        id: 'Largura',
        label: 'Largura',
        show: true,
      },
      {
        id: 'Espessura',
        label: 'Espessura',
        show: true,
      },
      {
        id: 'warehouse',
        label: 'Armazem',
        show: true,
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
