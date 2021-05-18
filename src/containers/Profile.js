/**
* Detail - Displays the profile information of loggedin user
*/

import React, { Fragment, useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import PageTitle from '../components/PageTitle';
import {capitalize} from '../helpers/helpers'
import styles from '../styles/profile.css'

const Profile = () => {
  const history = useHistory();
  const location = useLocation();
  // stores the detail of the profile
  const[profile, setProfile] = useState({});
  useEffect(() => {
    // checks if the location object exists 
    if(location && location.state){
      const data = location.state.data;
      if(data){
        setProfile(data);
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
  * renderDetail - renders the individual details of the profile
  * @returns the individual detail of profile in html
  */
  const renderDetail = () =>{
    // get all the keys that needs to be rendered except avatarImage since it needs to be rendered separately
    const keys = Object.keys(profile).filter(key => key !== 'avatarImage');
    return (
      <div className={styles.detailWrapper}>
        <div className={styles.profileAvatar}>
          <img src={profile['avatarImage']} alt={'profile picture'} width={200} heighr={200} loading={'lazy'} />
        </div>
        <ul>
          {keys.map(key => {
            return (
              <li key={key} className={styles.detailItem}> 
                <label className={styles.detailItemLabel}>{capitalize(key)}</label>
                <label className={styles.detailValueLabel}>{profile[key]}</label>
              </li>
              )
            })}
        </ul>
      </div>
    )
  }
      
  //renders the profile detail
  return (
    <Fragment>
    {profile && 
      <div>
        <PageTitle title={'Profile'} />
        {renderDetail()}
      </div>
    }
    </Fragment>
  )
}
  
export default Profile;