/**
* Detail - Displays the detail of the selected earthquake
*/

import React, { Fragment, useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import PageTitle from '../components/PageTitle';
import {capitalize} from '../helpers/helpers'
import styles from '../styles/detail.css'

const Detail = () => {
  const history = useHistory();
  const location = useLocation();
  // stores the detail of the earthquake
  const[detail, setDetail] = useState({});
  useEffect(() => {
    // checks if the location object exists 
    if(location && location.state){
      // gets the earthquake data stored in the object
      const data = location.state.data;
      if(data){
        setDetail(data);
      }
      // if data doesnt exist redirect back to the list page
      else{
        history.push('/')
      }
    }
    // if no location object exists redirect back to the lists page
    else{
      history.push('/')
    }
  })
  
  /**
  * renderDetail - renders the individual details of the earthquake
  * @returns the individual detail of earthquake in html
  */
  const renderDetail = () =>{
    // get all the keys that needs to be rendered except id
    const keys = Object.keys(detail).filter(key => key !== 'id');
    // render each key and its value
    return (
      <ul>
      {keys.map(key => {
        return (
          <li key={key} className={styles.detailItem}> 
            <label className={styles.detailItemLabel}>{capitalize(key)}</label>
            <label className={styles.detailValueLabel}>{detail[key]}</label>
          </li>
          )
        })}
        </ul>
        )
      }
      
      // renders the earthquake detail
      return (
        <Fragment>
        {detail && 
          <div>
          <PageTitle title={detail.title} />
          {renderDetail()}
          </div>
        }
        </Fragment>
        )
      }
      
      export default Detail;