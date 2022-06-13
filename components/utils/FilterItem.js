import { getClient } from '../mock/Clients';
import { getProduct } from '../mock/Products';
import displayWithStyle from './displayTextWithStyle';
import React from 'react';
import { Edit, Eye, Trash } from 'lucide-react';
import hasData from './hasData';
import DisplayCategory from '../../components/utils/DisplayCategory';

function FilterItem(item, col, index) {
  if (!hasData(item)) return <a>Nan</a>;
  if (item[`${col}`] < 0 && (col === 'desvio' || col === 'desvio2')) {
    return <a className='successBalloon'>{item[`${col}`]} horas</a>;
  } else if (item[`${col}`] > 0 && (col === 'desvio' || col === 'desvio2')) {
    return <a className='errorBalloon'>{item[`${col}`]} horas</a>;
  } else if (
    Math.ceil(item[`${col}`]) === 0 &&
    (col === 'desvio' || col === 'desvio2')
  ) {
    return <a className='warningBalloon'>{item[`${col}`]} horas</a>;
  }

  switch (col) {
    case 'productId': {
      const prod = getProduct(item);

      return <a className='link'>{prod.nome}</a>;
    }
    case 'numero': {

      return <a className='link'>{item}</a>;
    }
    case 'custo': {
      return <a>{item}</a>;
    }

    case 'cliente': {
      const client = getClient(item);
      return <a>{client.nome}</a>;
    }
    case 'categoria':
      return <a>{DisplayCategory(item)}</a>;
    case 'ações':
      return <Eye strokeWidth="1" className='link' />;
    case 'actions':
      return (
        <>
          <Edit strokeWidth="1" stroke='var(--primary)' />
          <Trash strokeWidth="1" stroke='var(--primary)' />
        </>
      );
    default:
      return <a>{displayWithStyle(item, col)} </a>;
  }
}
export { FilterItem };
