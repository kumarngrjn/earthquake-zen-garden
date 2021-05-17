/**
* TableHeaders - renders the headers of table 
*/

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/tableHeaders.css'
import classnames from 'classnames'

const TableHeaders = props => {
  const {headers, sortKey, isAscending, setSortOption} = props;
  return(
    <tr>
      {headers.map(header => {
        const sortDirection = header.key === sortKey ? (isAscending ? styles.asc: styles.desc): ''
        const tabelHeaderClasses = classnames(styles.tableHeaderItem,sortDirection )
        return (
          <th key={header.key} className={tabelHeaderClasses} onClick={() => setSortOption(header.key)}>{header.value}</th>
        )}
      )}
    </tr>
  )
}
      
TableHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })),
  sortKey: PropTypes.string,
  isAscending: PropTypes.bool,
  setSortOption: PropTypes.func
}

export default TableHeaders;