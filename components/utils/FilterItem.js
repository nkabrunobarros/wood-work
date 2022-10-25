/* eslint-disable no-fallthrough */
import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import displayWithStyle from "./displayTextWithStyle";

export function calcDesvio(desvio) {
  if (desvio < 0) return <Typography className="successBalloon">{desvio} horas</Typography>;
  else if (desvio > 0) return <Typography className="errorBalloon">{desvio} horas</Typography>;
  else if (Math.ceil(desvio) === 0) return <Typography className="warningBalloon">{desvio} horas</Typography>;
}

const FilterItem = (data, item, col) => {
  if (Object.keys(data).length !== 0) {
    const col2 = col.split('.');

    switch (Object.keys(col.split('.')).length) {
      case 1: {
        switch (col2[0]) {
          case 'order_prod': {

            switch (item.order.status.toLowerCase()) {
              case 'em desenho': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
              case 'em orçamentação': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
              case 'em produção': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
              default: return <Typography variant='md' className="successBalloon">Terminada</Typography>;
            }
          }

          case 'order_prod_2': {

            switch (item.status.toLowerCase()) {
              case 'em desenho': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
              case 'em orçamentação': return <Typography variant='md' className="errorBalloon">Não Iniciada</Typography>;
              case 'em produção': return <Tooltip title={`${item.status}`}><Typography variant='md' className="warningBalloon">Iniciada</Typography></Tooltip>;
              default: return <Typography variant='md' className="successBalloon">Terminada</Typography>;
            }
          }

          case 'startAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
          case 'endAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
          case 'order_dispatch':
            if (item.order.status.toLowerCase() === 'concluida') return <Typography variant='md' className="successBalloon">Entregue</Typography>;
            else return <Typography variant='md' className="errorBalloon">Não</Typography>;

          case 'order_dispatch_2':
            if (item.status.toLowerCase() === 'concluida') return <Typography variant='md' className="successBalloon">Entregue</Typography>;
            else return <Typography variant='md' className="errorBalloon">Não</Typography>;


          case "desvio2": return calcDesvio(item[`${col}`]);
          case "desvio": return calcDesvio(item[`${col}`]);

          case "ord_amount": {

            return <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            </Box>;

          }

          case "stock": if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><Typography variant='md' className="successBalloon">Disponivel</Typography></Tooltip>;
          else return <Typography variant='md' className="errorBalloon">Indisponivel</Typography>;


          case "amount": if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><Typography variant='md' className="successBalloon">Disponivel</Typography></Tooltip>;
          else return <Typography variant='md' className="errorBalloon">Indisponivel</Typography>;


          default: if (['id', 'giveName', 'numero', 'nome', 'name', 'custo'].find(ele => ele === col2[0])) return <Typography color="link.main" className="link" >{item[col2[0]]}</Typography>;
          else return <Typography variant='md'>{item[col2[0]]}</Typography>;

        }
      }

      case 2: {
        switch (col2[1]) {
          case 'name': return <Typography color="link.main" className="link" >{item[col2[0]][col2[1]]}</Typography>;

          default: {
            return item[col2[0]] && item[col2[0]][col2[1]] ? <Typography variant='md'>{item[col2[0]][col2[1]]}</Typography> : <Typography variant='md'>Nan</Typography>;
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

      case 4: return <Typography variant='md'>{item[col2[0]][col2[1]][col2[2]][col2[3]]}</Typography>;
      default: return <Typography variant='md'>{displayWithStyle(item[col], col)}</Typography>;
    }
  }
  else if (col === undefined) {
    return <Typography variant='md'>{displayWithStyle(item, col)}</Typography>;
  }

};

export { FilterItem };
