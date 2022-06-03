import getKeywords from '../mock/Keywords';
import React from 'react';
import ItsNumber from './ItsNumber';
import hasData from './hasData';
const displayWithStyle = (item, col, index) => {
  const keywords = getKeywords();
  if (!hasData(item)) return <a>nan {item}</a>
  //  Find if the text match's with any of the keywords
  const resError = keywords.errorKeywords.find((keywork) => keywork === item);
  const resSuccess = keywords.successKeywords.find(
    (keywork) => keywork === item
  );
  const resWarning = keywords.warningKeywords.find(
    (keywork) => keywork === item
  );
  if (col) {
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

    if (index === 0) {
      return (
        <a className='link'>
          Nº {displayWithStyle(item[`${col}`])}{' '}
          {ItsNumber(item[`${col}`]) ? 'horas' : null}
        </a>
      );
    }
  }
  
  if (item < 0 && (col === 'desvio' || col === 'desvio2')) return <a className='successBalloon'>{item} horas</a>;
  else if (item > 0 &&(col === 'desvio' || col === 'desvio2')) return <a className='errorBalloon'>{item} horas</a>;
  else if (item === 0 &&(col === 'desvio' || col === 'desvio2')) return <a className='warningBalloon'>{item} horas</a>;
 
 
  if (resError !== undefined)
    //  If match res is something else undefined && case undefined return default text
    return <a className='errorBalloon'>{item} </a>;
  if (resSuccess !== undefined) {
    return <a className='successBalloon'>{item} </a>;
  }
  if (resWarning !== undefined) {
    return <a className='warningBalloon'>{item} </a>;
  }
  return item;
};

export default displayWithStyle;
