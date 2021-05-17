/**
 * Logo - renders the website logo
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = props => {
  const {image} = props;
  return (
    <Link to={'/'}><img src={image} width={'30'} height={'30'} /></Link>
  )
}

Logo.propTypes = {
  image: PropTypes.string
}


export default Logo;