/**
* Header - the header that is displayed across pages
*/
import React from 'react';
import {site, profile} from '../data';
import Logo from './Logo';
import styles from '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  
  // renders the logo, title and the profile
  return(
    <header>
      <Logo image={site.logoImage}/>
      <h1 className={styles.headerTitle}>{site.title}</h1>
      {profile &&
        <h3><Link to={{pathname: '/profile', state: {data: profile}}}>{'Welcome '+profile.firstName}</Link></h3>
      }
    </header>
  )
    
}
  
  
export default Header;