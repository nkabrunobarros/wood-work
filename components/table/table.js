// Node modules
import React from 'react';
// Styles
import styles from '../../styles/components/customTable.module.css';

import PropTypes from 'prop-types';
import { Code } from 'lucide-react';

const CustomTable = ({
  columns,
  children,
  doubleHeader,
  doubleHeaderSizes,
  fullBorders,
}) => {
  const style = {
    borderTop: '2px solid var(--grayEdges)',
    borderBottom: '2px solid var(--grayEdges)',
  };
  const styleSideBorder = {
    borderLeft: '2px solid var(--grayEdges)',
    borderRight: '2px solid var(--grayEdges)',
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          {doubleHeader ? (
            <tr style={style} >
              {doubleHeader.map((col, i) => (
                <>
                  {doubleHeaderSizes[i] === 1 ? (
                    <th 
                      style={styleSideBorder}
                      key={i}
                      colSpan={doubleHeaderSizes[i]}
                    >
                      {col}
                    </th>
                  ) : (
                    <th key={i} colSpan={doubleHeaderSizes[i]}>
                      {col}
                    </th>
                  )}
                </>
              ))}
            </tr>
          ) : null}
          <tr></tr>
          {columns.map((col, i) => (
            <>
              {fullBorders ? (
                <>
                  {fullBorders.find((element) => element === i) !==
                  undefined ? (
                    <th
                      key={i}
                      style={{ border: '2px solid var(--grayEdges)' }}
                    >
                      <div
                        className='black'
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <a style={{ flex: 1 }}>{col.toUpperCase()}</a>
                        {col.toLowerCase() === 'ações' ||
                        col.toLowerCase() === '' ? null : (
                          <>
                            {doubleHeader ? null : (
                              <a id='align' style={{ maxWidth: '150px' }}>
                                <Code
                                  style={{
                                    height: '14px',
                                    width: '14px',
                                    transform: 'rotate(-90deg)',
                                  }}
                                />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  ) : (
                    <th key={i} style={style}>
                      <div
                        className='black'
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <a style={{ flex: 1 }}>{col.toUpperCase()}</a>
                        {col.toLowerCase() === 'ações' ||
                        col.toLowerCase() === '' ? null : (
                          <>
                            {doubleHeader ? null : (
                              <a id='align' style={{ maxWidth: '150px' }}>
                                <Code
                                  style={{
                                    height: '14px',
                                    width: '14px',
                                    transform: 'rotate(-90deg)',
                                  }}
                                />
                              </a>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                  )}
                </>
              ) : 
              <th key={i} style={style}>
              <div
                className='black'
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <a style={{ flex: 1 }}>{col.toUpperCase()}</a>
                {col.toLowerCase() === 'ações' ||
                col.toLowerCase() === '' ? null : (
                  <>
                    {doubleHeader ? null : (
                      <a id='align' style={{ maxWidth: '150px' }}>
                        <Code
                          style={{
                            height: '14px',
                            width: '14px',
                            transform: 'rotate(-90deg)',
                          }}
                        />
                      </a>
                    )}
                  </>
                )}
              </div>
            </th>}
            </>
          ))}
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};
CustomTable.propTypes = {
  columns: PropTypes.array,
  doubleHeader: PropTypes.array,
  doubleHeaderSizes: PropTypes.array,
  children: PropTypes.any,
  fullBorders: PropTypes.array,
};
export default CustomTable;
