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
              case 'em desenho': return <a className="errorBalloon">Não Iniciada</a>;
              case 'em orçamentação': return <a className="errorBalloon">Não Iniciada</a>;
              case 'em produção': return <Tooltip title={`${item.status}`}><a className="warningBalloon">Iniciada</a></Tooltip>;
              default: return <a className="successBalloon">Terminada</a>;
            }
          }

          case 'startAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
          case 'endAt': return moment(item[col2[0]]).locale('pt').format('DD MMMM YYYY');
          case 'order_dispatch':
            if (item.order.status.toLowerCase() === 'concluida') return <a className="successBalloon">Entregue</a>;
            else return <a className="errorBalloon">Não</a>;


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

          case "stock": if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><a className="successBalloon">Disponivel</a></Tooltip>;
          else return <a className="errorBalloon">Indisponivel</a>;


          case "amount": if (item[col2[0]] > 0) return <Tooltip title={`${item[col2[0]]} unidade(s)`}><a className="successBalloon">Disponivel</a></Tooltip>;
          else return <a className="errorBalloon">Indisponivel</a>;


          default: if (['id', 'giveName', 'numero', 'nome', 'name', 'custo'].find(ele => ele === col2[0])) return <Typography color="link.main" className="link" >{item[col2[0]]}</Typography>;
          else return <a>{item[col2[0]]}</a>;

        }
      }

      case 2: {
        switch (col2[1]) {
          case 'name': return <Typography color="link.main" className="link" >{item[col2[0]][col2[1]]}</Typography>;

          default: {
            return item[col2[0]] && item[col2[0]][col2[1]] ? <a>{item[col2[0]][col2[1]]}</a> : <a>Nan</a>;
          }
        }
      }

      case 3: {

        switch (col2[2]) {
          case 'name': return <Typography>{item[col2[0]][col2[1]][col2[2]]}{' '} [{item.product.category.code}]</Typography>;

          default: {
            return item[col2[0]] && item[col2[0]][col2[1]][col2[2]] ? <a>{item[col2[0]][col2[1]][col2[2]]}</a> : <a>Nan</a>;
          }
        }

      }

      case 4: return <a>{item[col2[0]][col2[1]][col2[2]][col2[3]]}</a>;
      default: return <a>{displayWithStyle(item[col], col)}</a>;
    }
  }
  else if (col === undefined) {
    return <a>{displayWithStyle(item, col)}</a>;
  }

};

export { FilterItem };
