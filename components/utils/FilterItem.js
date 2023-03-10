/* eslint-disable consistent-return */
/* eslint-disable no-fallthrough */
import { Box, LinearProgress, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { categories } from '../../pages/internal/new-project';
import displayWithStyle from './displayTextWithStyle';

export function calcDesvio (desvio) {
  if (desvio < 0) return <Typography className="successBalloon">{desvio} horas</Typography>;
  else if (desvio > 0) return <Typography className="errorBalloon">{desvio} horas</Typography>;
  else if (Math.ceil(desvio) === 0) return <Typography className="warningBalloon">{desvio} horas</Typography>;

  return true;
}

const FilterItem = (data, item, col) => {
  // eslint-disable-next-line no-constant-condition
  if (Object.keys(data).length !== 0 || true) {
    const col2 = col.split('.');

    switch (Object.keys(col.split('.')).length) {
    case 1: {
      switch (col2[0]) {
      case 'order_prod': {
        switch (item.order.status.toLowerCase()) {
        case 'em desenho': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'em orçamentação': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'em produção': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
        default: return <Typography variant='md' className="successBalloon">Terminado</Typography>;
        }
      }

      case 'order_prod_2': {
        switch (item.status.toLowerCase()) {
        case 'em desenho': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'em orçamentação': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'em produção': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
        default: return <Typography variant='md' className="successBalloon">Terminado</Typography>;
        }
      }

      case 'startAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
      case 'endAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
      case 'order_dispatch':
        if (item.order.status.toLowerCase() === 'concluida') return <Typography variant='md' className="successBalloon">Entregue</Typography>;

        return <Typography variant='md' className="errorBalloon">Não</Typography>;

      case 'order_dispatch_2':
        if (item.status.toLowerCase() === 'concluida') return <Typography variant='md' className="successBalloon">Entregue</Typography>;

        return <Typography variant='md' className="errorBalloon">Não</Typography>;

      case 'desvio2': return calcDesvio(item[`${col}`]);
      case 'desvio': return calcDesvio(item[`${col}`]);

      case 'ord_amount': {
        return Number.isInteger(item.amount)
          ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">0</Typography>
            </Box>
            <Tooltip title={`${((item.completed - 0) * 100) / (item.amount - 0)} %`}>
              <Box sx={{ width: '100%', padding: '0.5rem' }}>
                <LinearProgress variant="determinate" value={((item.completed - 0) * 100) / (item.amount - 0)} />
              </Box>
            </Tooltip>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{item.amount}</Typography>
            </Box>
          </Box>
          : 'nah';
      }

      case 'ord_amount_proj': {
        return item.amount?.value !== '' && item.status.value !== 'waiting budget' && item.status.value !== 'waiting adjudication'
          ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">0</Typography>
            </Box>
            <Tooltip title={`${((item.completed - 0) * 100) / (item.amount - 0)} %`}>
              <Box sx={{ width: '100%', padding: '0.5rem' }}>
                <LinearProgress variant="determinate" value={((item.completed - 0) * 100) / (item.amount.value - 0)} />
              </Box>
            </Tooltip>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{item.amount.value}</Typography>
            </Box>
          </Box>
          : item.amount.value || '';
      }

      case 'Estado': {
        switch (item?.Estado?.toLowerCase()) {
        case 'waiting budget': return <Typography variant='md' className="blankBalloon">Espera orçamento</Typography>;
        case 'waiting adjudication': return <Typography variant='md' className="infoBalloon">Espera adjudicação</Typography>;
        case 'working': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
        case 'drawing': return <Typography variant='md' className="successBalloon">Em desenho</Typography>;
        case 'production': return <Typography variant='md' className="warningBalloon">Em produção</Typography>;
        case 'testing': return <Typography variant='md' className="infoBalloon">Em montagem</Typography>;
        case 'transport': return <Typography variant='md' className="alertBalloon">Em transporte</Typography>;
        case 'finished': return <Typography variant='md' className="successBalloon">Terminado</Typography>;
        case 'canceled': return <Typography variant='md' className="errorBalloon">Cancelado</Typography>;
        }
      }

      case 'stock': if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><Typography variant='md' className="successBalloon">Disponivel</Typography></Tooltip>;

      case 'amount': if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><Typography variant='md' className="successBalloon">Disponivel</Typography></Tooltip>;

      default: if (['giveName', 'nome', 'name', 'custo'].find(ele => ele === col2[0])) return <Typography variant='md' color="link.main" className="link" >{item[col2[0]]}</Typography>;

        return <Typography variant='md'>{item[col2[0]]} </Typography>;
      }
    }

    case 2: {
      switch (col) {
      case 'orderBy.object': return <Typography variant="md">
        {data?.clients?.find(ele => ele.id === item?.orderBy?.object)?.givenName?.value}
      </Typography>;
      case 'belongsTo.object': return <Typography variant="md">{item[col2[0]][col2[1]].replace('urn:ngsi-ld:Owner:', '')}</Typography>;
      case 'category.value': return <Typography variant="md">{categories.find(c => c.id === item[col2[0]][col2[1]])?.label || item[col2[0]][col2[1]]}</Typography>;

      case 'status.value': {
        switch (item.status.value.toLowerCase()) {
        case 'waiting': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'working': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
        case 'waiting adjudication': return <Typography variant='md' className="infoBalloon">Espera adjudicação</Typography>;
        case 'waiting budget': return <Typography variant='md' className="blankBalloon">Espera orçamento</Typography>;
        case 'production': return <Typography variant='md' className="warningBalloon">Em produção</Typography>;

        default: return <Typography variant='md' className="successBalloon">Terminado</Typography>;
        }
      }

      case 'statusClient.value': {
        switch (item?.statusClient?.value.toLowerCase()) {
        case 'waiting budget': return <Typography variant='md' className="blankBalloon">Espera orçamento</Typography>;
        case 'waiting adjudication': return <Typography variant='md' className="infoBalloon">Espera adjudicação</Typography>;
        case 'waiting': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
        case 'working': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
        case 'drawing': return <Typography variant='md' className="successBalloon">Em desenho</Typography>;
        case 'production': return <Typography variant='md' className="warningBalloon">Em produção</Typography>;
        case 'testing': return <Typography variant='md' className="infoBalloon">Em montagem</Typography>;
        case 'transport': return <Typography variant='md' className="alertBalloon">Em transporte</Typography>;
        case 'finished': return <Typography variant='md' className="successBalloon">Terminado</Typography>;
        }
      }

      default: {
        return item[col2[0]] && item[col2[0]][col2[1]] ? <Typography variant='md'>{item[col2[0]][col2[1]]}</Typography> : <Typography variant='md'></Typography>;
      }
      }
    }

    case 3: {
      switch (col2[2]) {
      case 'name': return <Typography>{item[col2[0]][col2[1]][col2[2]]}{' '} [{item.product.category.code}]</Typography>;

      default: {
        return item[col2[0]] && item[col2[0]][col2[1]][col2[2]] ? <Typography variant='md'>{item[col2[0]][col2[1]][col2[2]]}</Typography> : <Typography variant='md'>Nan</Typography>;
      }
      }
    }

    case 4: {
      if (col === 'expedition.object.deliveryFlag.value') {
        if (item.expedition.object?.deliveryFlag.value === 0 && item.expedition?.object.expeditionTime?.value) return <Tooltip title={'Expedida dia ' + item.expedition.object.expeditionTime?.value || ''}><Typography variant='md' className="warningBalloon">Em curso</Typography></Tooltip>;
        else if (item.expedition.object?.deliveryFlag.value === 1) return <Typography variant='md' className="successBalloon">Entrege</Typography>;

        return <Typography variant='md' className="errorBalloon">Não</Typography>;
      }

      return <Typography variant='md'>{item[col2[0]][col2[1]][col2[2]][col2[3]]}</Typography>;
    }

    default: return <Typography variant='md'>{displayWithStyle(item[col], col)}</Typography>;
    }
  } else if (col === undefined) {
    return <Typography variant='md'>{displayWithStyle(item, col)}</Typography>;
  }
};

export { FilterItem };
