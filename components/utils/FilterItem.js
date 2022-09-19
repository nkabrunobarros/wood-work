import { Edit, Eye, Trash } from "lucide-react";
import React from "react";
import displayWithStyle from "./displayTextWithStyle";

const FilterItem = (data, item, col) => {
  if (Object.keys(data).length !== 0) {
    const col2 = col.split('.')

    switch (col) {
      case "product.name": {
        return <a className="link">{item[col2[0]][col2[1]]}</a>;
      }

      case "product.code": {
        return <a>{item[col2[0]][col2[1]]}</a>;
      }

      case "product.category": {
        return <a>{item[col2[0]][col2[1]].name}</a>;
      }


      case "numero": {
        return <a className="link">{item[col2[0]]}</a>;
      }

      case "custo": {
        return <a>{item[col2[0]][col2[1]]}</a>;
      }

      case "order_prod": {
        switch (item.status) {
          case 'Em orçamentação' || 'Em desenho':
            return <a className="errorBalloon">Não Iniciada</a>;

          case 'Em Produção':
            return <a className="warningBalloon">Iniciada</a>;

          default:
            return <a className="successBalloon">Terminada</a>;
        }

      }
  
      case "order_dispatch": {
        switch (item.status) {
          case 'Concluida':
            return <a className="successBalloon">Entregue</a>;

          default:
            return <a className="errorBalloon">Nao</a>;
        }

      }

      case "cliente": {
        const client = data.clients.find(client => client.id.toString() === item.toString())

        return client ? client.name : 'Nan';
      }

      case "amount": {
        if (item[col2[0]] > 0) return <a className="successBalloon">Disponivel</a>
        else return <a className="errorBalloon">Indisponivel</a>

      }


      case "category.name":
        {
          return item.product.categoryId
          // return <a>{item[col2[0]][col2[1]]}</a>;
        }

      case "ações":
        return <Eye strokeWidth="1" className="link" />;
      case "actions":
        return (
          <>
            <Edit strokeWidth="1" stroke="var(--primary)" />
            <Trash strokeWidth="1" stroke="var(--primary)" />
          </>
        );

      case "desvio" || "desvio2": {

        if (item[`${col}`] < 0 && (col === "desvio" || col === "desvio2")) return <a className="successBalloon">{item[`${col}`]} horas</a>;
        else if (item[`${col}`] > 0 && (col === "desvio" || col === "desvio2")) return <a className="errorBalloon">{item[`${col}`]} horas</a>;
        else if (
          Math.ceil(item[`${col}`]) === 0 &&
          (col === "desvio" || col === "desvio2")
        ) return <a className="warningBalloon">{item[`${col}`]} horas</a>;

        break;
      }

      default:
        return <a>{displayWithStyle(item[col], col)}</a>;
    }
  }
  else if (col === undefined) {
    return <a>{displayWithStyle(item, col)}</a>;
  }

}

export { FilterItem };
