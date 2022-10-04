/* eslint-disable no-fallthrough */
import React from "react";
import displayWithStyle from "./displayTextWithStyle";

const FilterItem = (data, item, col) => {
  if (Object.keys(data).length !== 0) {
    const col2 = col.split('.')

    switch (Object.keys(col.split('.')).length) {
      case 1: {
        switch (col2[0]) {
          case 'order_prod': {
            switch (item.status) {
              case 'Em orçamentação' || 'Em desenho':return <a className="errorBalloon">Não Iniciada</a>;
              case 'Em Produção':return <a className="warningBalloon">Iniciada</a>;
              default: return <a className="successBalloon">Terminada</a>;
            }
          }

          case 'order_dispatch': {
            switch (item.status) {
              case 'Concluida': return <a className="successBalloon">Entregue</a>;
              default: return <a className="errorBalloon">Não</a>;
            }
          }

          case "desvio" || "desvio2": {
    
            if (item[`${col}`] < 0 && (col === "desvio" || col === "desvio2")) return <a className="successBalloon">{item[`${col}`]} horas</a>;
            else if (item[`${col}`] > 0 && (col === "desvio" || col === "desvio2")) return <a className="errorBalloon">{item[`${col}`]} horas</a>;
            else if (
              Math.ceil(item[`${col}`]) === 0 &&
              (col === "desvio" || col === "desvio2")
            ) return <a className="warningBalloon">{item[`${col}`]} horas</a>;
    
            break;
          }

          case "stock": {
            if (item[col2[0]] > 0) return <a className="successBalloon">Disponivel</a>
            else return <a className="errorBalloon">Indisponivel</a>
          }

          case "amount": {
            if (item[col2[0]] > 0) return <a className="successBalloon">Disponivel</a>
            else return <a className="errorBalloon">Indisponivel</a>
          }

          default: {
   
            if (['id', 'giveName', 'numero', 'nome', 'name', 'custo'].find(ele => ele === col2[0])) return <a className="link">{item[col2[0]]}</a>
            else return <a>{item[col2[0]]}</a>
          }
        }
      }

      case 2: {
        switch (col2[1]) {
          case 'name': return <a className="link" >{item[col2[0]][col2[1]]}</a>

          default: return <a>{item[col2[0]][col2[1]]}</a>
      }
    }

      case 3: return <a>{item[col2[0]][col2[1]][col2[2]]}</a>
      case 4: return <a>{item[col2[0]][col2[1]][col2[2]][col2[3]]}</a>
      default: return <a>{displayWithStyle(item[col], col)}</a>;
    }
  }
  else if (col === undefined) {
    return <a>{displayWithStyle(item, col)}</a>;
  }

}

export { FilterItem };
