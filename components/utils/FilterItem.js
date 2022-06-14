import displayWithStyle from "./displayTextWithStyle";
import React from "react";
import { Edit, Eye, Trash } from "lucide-react";
import hasData from "./hasData";

const FilterItem = (data, item, col, index) =>  {
  if (Object.keys(data).length !== 0)
  {
    if (!hasData(item)) return <a>Nan</a>;
    if (item[`${col}`] < 0 && (col === "desvio" || col === "desvio2")) {
      return <a className="successBalloon">{item[`${col}`]} horas</a>;
    } else if (item[`${col}`] > 0 && (col === "desvio" || col === "desvio2")) {
      return <a className="errorBalloon">{item[`${col}`]} horas</a>;
    } else if (
      Math.ceil(item[`${col}`]) === 0 &&
      (col === "desvio" || col === "desvio2")
    ) {
      return <a className="warningBalloon">{item[`${col}`]} horas</a>;
    }
  
    switch (col) {
      case "productId": {
        const prod = data.products.find(prod => prod.id.toString() === item.toString())
        return <a className="link">{prod.nome}</a>;
      }
      case "numero": {
        return <a className="link">{item}</a>;
      }
      case "custo": {
        return <a>{item}</a>;
      }
      case "cliente": {
        const client = data.clients.find(client => client.id.toString() === item.toString())
        return <a>{client.nome}</a>;
      }
      case "categoria":
        {
          const category = data.categories.find(category => category.id.toString() === item.toString())
          return `${category.title}[${category.id}]`
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
      default:
        return <a>{displayWithStyle(item, col)}</a>;
    }
  }
  else if(col === undefined) {
    return <a>{displayWithStyle(item, col)}</a>;
  }
 
}
export { FilterItem };
