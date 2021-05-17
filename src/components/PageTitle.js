/**
 * PageTitle - renders title of individual page
 */

import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = props => {
    const {title} = props;
    return(
        <h3 className='page-title'>{title}</h3>
    )
}

PageTitle.propTypes = {
    title: PropTypes.string
}

export default PageTitle

