/**
 * Image - component to render images. 
 */


import React from 'react';
import PropTypes from 'prop-types';

const Image = props => {
  const {source, title, width, height } = props;
  return(
    <img src={source} alt={title} width={width} height={height} loading={'lazy'} />
  )
}

Image.propTypes = {
  source: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image;