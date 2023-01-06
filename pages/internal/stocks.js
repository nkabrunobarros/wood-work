//  Nodes
import React, { useEffect, useState } from 'react';

//  Custom Components
import Loader from '../../components/loader/loader';

//  Page Component
import StockScreen from '../../components/pages/stocks/stocks';

//  PropTypes
import PropTypes from 'prop-types';

//  Navigation
import routes from '../../navigation/routes';

const Stock = () => {
  const [loaded, setLoaded] = useState(false);
  const [stocks, setStocks] = useState();
  const [filtersSizes, setFiltersSizes] = useState();

  //  Data Fetching
  useEffect(() => {
    const getData = async () => {
      const dummyStocks = [
        { warehouse: '4', material: 'AG L Biscuit Nude 36W 10 ', qtd: 2, comp: 400, larg: 338.5, esp: 10 },
        { warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 326.5, larg: 184.5, esp: 16 },
        { warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 406, larg: 207.5, esp: 16 },
        { warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 326.5, larg: 184.5, esp: 16 },
        { warehouse: '4', material: 'AG L Biscuit Nude 36W 16 CNC', qtd: 2, comp: 406, larg: 207.5, esp: 16 },
        { warehouse: '4', material: 'AG L Marmol Hades 19 CNC', qtd: 1, comp: 2400, larg: 926, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 2400, larg: 566, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1716, larg: 466, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 268, larg: 444, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 1678, larg: 444, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 400, larg: 283, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 2, comp: 444, larg: 287, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 924, larg: 283, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19 CNC', qtd: 1, comp: 907, larg: 76, esp: 19 },
        { warehouse: '4', material: 'MDF Folheado Carv 19', qtd: 1, comp: 2394, larg: 560, esp: 19 },
        { warehouse: '4', material: 'HDF 19 ', qtd: 24, comp: 540, larg: 70, esp: 19 },
      ];

      setStocks(dummyStocks);

      setFiltersSizes({
        larg: {
          values: [Math.min(...dummyStocks.map(o => o.larg)), Math.max(...dummyStocks.map(o => o.larg))],
          min: Math.min(...dummyStocks.map(o => o.larg)),
          max: Math.max(...dummyStocks.map(o => o.larg))
        },
        esp: {
          values: [Math.min(...dummyStocks.map(o => o.esp)), Math.max(...dummyStocks.map(o => o.esp))],
          min: Math.min(...dummyStocks.map(o => o.esp)),
          max: Math.max(...dummyStocks.map(o => o.esp))
        },
        comp: {
          values: [Math.min(...dummyStocks.map(o => o.comp)), Math.max(...dummyStocks.map(o => o.comp))],
          min: Math.min(...dummyStocks.map(o => o.comp)),
          max: Math.max(...dummyStocks.map(o => o.comp))
        },
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
        id: 'qtd',
        label: 'Disponivel',
      },
      {
        id: 'comp',
        label: 'Comp',
      },
      {
        id: 'larg',
        label: 'Largura',
      },
      {
        id: 'esp',
        label: 'Espessura',
      },
      {
        id: 'warehouse',
        label: 'Armazem',
      },
      {
        id: 'actions',
        numeric: true,
        label: 'Ações',
      },
    ];

    //  Breadcrumbs path feed
    const breadcrumbsPath = [
      {
        title: 'Stock',
        href: `${routes.private.internal.stocks}`,
      },
    ];

    const detailPage = routes.private.internal.stockId;

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

Stock.propTypes = {
  categories: PropTypes.array,
  orders: PropTypes.array,
  detailPage: PropTypes.any,
  allStock: PropTypes.array,
  headCells: PropTypes.array,
  products: PropTypes.array,
};

export default Stock;
