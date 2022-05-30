// Node modules
import React from 'react'
// Styles
import styles from '../../styles/components/customTable.module.css'

import PropTypes from 'prop-types'
import { Code } from 'lucide-react'

const CustomTable = ({ columns, children }) => (
  <table className={styles.table}>
    <thead style={{ borderTop: '2px solid var(--grayEdges)', borderBottom: '2px solid var(--grayEdges)' }}>
      {columns.map((col, i) => (
        <th key={i}>
          <a style={{ display: 'flex', alignItems: 'center' }}>
            <a style={{ flex: 1 }}>{col.toUpperCase()}</a>
            {col.toLowerCase() === 'ações' || col.toLowerCase() === ''
              ? null
              : (
              <a id="align" style={{ maxWidth: '150px' }}>
                <Code style={{ height: '14px', width: '14px', transform: 'rotate(-90deg)' }} />
              </a>
                )}
          </a>
        </th>
      ))}
    </thead>
    <tbody>{children}</tbody>
  </table>
)
CustomTable.propTypes = {
  columns: PropTypes.string,
  children: PropTypes.any
}
export default CustomTable
