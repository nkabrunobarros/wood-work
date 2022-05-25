import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import PropTypes from 'prop-types'

import styles from '../../styles/components/pagination.module.css'
const Pagination = ({ items }) => {
  const PaginateItemsPerPage = (array, pageSize, pageNumber) => {
    return array.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
  }
  const showPagesBtns = () => {
    const pageNumber = Object.keys(items).length
    for (let index = 0; index < pageNumber; index++) {
      <div>{index + 1}</div>
    }
  }
  const handleChangePage = (action) => {
    if (Number.isInteger(action)) {
      setCurrentPageNum(action)
      setPageNum(action)
    } else {
      if (action === 'up') {
        if ((pageNum + 1) * entries <= Object.keys(items).length) {
          setPageNum(pageNum + 1)
          setCurrentPageNum(pageNum + 1)
        }
      } else if (pageNum - 1 >= 0) {
        setPageNum(pageNum - 1)
        setCurrentPageNum(pageNum - 1)
      }
    }
  }
  //  Current page number
  const [currentPageNum, setCurrentPageNum] = useState(0)
  //  Initial page being shown
  const [pageNum, setPageNum] = useState(0)
  //  Amount of entries
  const [entries, setEntries] = useState(5)

  //  Array with the users being shown
  const itemsPerPage = PaginateItemsPerPage(items, entries, pageNum)
  //  Calculate num of buttons
  const numTabs = Math.ceil(Object.keys(items).length / entries)

  return (
    <div className="splitContainer" style={{ alignItems: 'center', paddingBottom: '1rem' }}>
    <div className="split"></div>
    <div>
      <select className={styles.entriesInput} type="number" value={entries} onChange={(e) => setEntries(e.target.value)}>
        <option value={Object.keys(items).length}>All</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
    </div>
    <div className="spacer"></div>
    {itemsPerPage === entries ? <div>Showing {entries} entries</div> : <div>Showing {Object.keys(itemsPerPage).length} entries</div>}

    <div className="spacer"></div>
    <div style={{ display: 'flex' }}>
      <a className={styles.paginationContainer}>
        <div>
          <ChevronsLeft onClick={() => handleChangePage(0)} />
        </div>
      </a>
      <a className={styles.paginationContainer}>
        <div>
          <ChevronLeft onClick={() => handleChangePage('minus')} />
        </div>
      </a>
      <div className="spacer"></div>
      <div className={styles.paginationContainer}>
        {showPagesBtns()}
        {[...Array(numTabs)].map((x, i) => (
          <>
            {currentPageNum === i
              ? (
              <div onClick={() => handleChangePage(i)} style={{ background: 'var(--greenHover)', color: 'white' }}>
                {i + 1}
              </div>
                )
              : (
              <div onClick={() => handleChangePage(i)}>{i + 1}</div>
                )}
          </>
        ))}
      </div>
      <div className="spacer"></div>
      <a className={styles.paginationContainer}>
        <div>
          <ChevronRight onClick={() => handleChangePage('up')} />
        </div>
      </a>
      <a className={styles.paginationContainer}>
        <div>
          <ChevronsRight onClick={() => handleChangePage(numTabs - 1)} />
        </div>
      </a>
    </div>
  </div>
  )
}
Pagination.propTypes = {
  items: PropTypes.any
}
export default Pagination
