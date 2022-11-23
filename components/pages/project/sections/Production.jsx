//  PropTypes
import { Eye } from "lucide-react";
import PropTypes from 'prop-types';
import React from 'react';
import AdvancedTable from "../../../advancedTable/AdvancedTable";
import PrimaryBtn from "../../../buttons/primaryBtn";

const Production = (props) => {
    const { pageProps, productionDetail, headCellsProductionDetail, headCellsUpperProductionDetail, open } = props;

    return open && <>
       <div id='pad'>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <a className='headerTitle'>Produção</a>
                <div style={{ marginLeft: 'auto' }}>
                  <PrimaryBtn
                    icon={
                      <Eye
                        strokeWidth={pageProps.globalVars.iconStrokeWidth}
                        size={pageProps.globalVars.iconSize}
                      />
                    }
                    text='Ver detalhes'
                  />
                </div>
              </div>
            </div>
            <AdvancedTable
              noPagination
              rows={productionDetail}
              headCells={headCellsProductionDetail}
              headCellsUpper={headCellsUpperProductionDetail}
            />
        </>;
};

Production.propTypes = {
    pageProps: PropTypes.any,
    order: PropTypes.object,
    open: PropTypes.bool,
    productionDetail: PropTypes.array,
    headCellsProductionDetail: PropTypes.array,
    headCellsUpperProductionDetail: PropTypes.array

};

export default Production;