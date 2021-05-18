/**
* List - Displays the list of earthquakes in the past hour
*/
import React, { useEffect, useState } from 'react';
import TableHeaders from '../components/TableHeaders';
import data from '../data.json';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { compareDateAsc, compareDateDesc, compareNumberAsc, compareNumberDesc, compareStringsAsc, compareStringsDesc } from '../helpers/helpers';
import styles from '../styles/list.css'

const List = () => {
  // the list that needs to be displayed
  const [lists, setLists] = useState([]);
  // the table headers
  const tableHeaders = [
    {key: 'title', value: 'Title'},
    {key: 'magnitude', value: 'Magnitude'},
    {key: 'time', value: 'Time'}
  ]
  // default sort is date descending
  const [sortKey, setSortKey] = useState('time');
  const [isAscending, setIsAscending] = useState(false);
  
  /**
  * runs on page
  * sets the initial earthquake listed sorted by date in descending order
  */
  useEffect(()=>{
    // checks if the data exists 
    if(data && data.features && data.features.length > 0){
      // creates a mapped array with only the necessary properties
      const mappedData = data.features.map(item => {return {
        id: item.id,
        title:  item.properties.title,
        magnitude: item.properties.mag,
        time: format(item.properties.time, 'MMM dd yyyy, hh:mm a'),
        status: item.properties.status,
        tsunami: item.properties.tsunami,
        type: item.properties.type,
      }});
      // sort the lists
      const sortedList = sortLists(mappedData, sortKey, isAscending);
      setLists(sortedList);
    }
    else {
      setLists([]);
    }
  },[])
  
  /**
  * setSortOption - set the sort key , isAscending and the list sorted by the new key
  * @param {string} option - the table header the list is being currently sorted on
  */
  const setSortOption = option => {
    // if the sorted key is already the current sortkey , toggle isAscending flag and sort the list
    if(sortKey === option){
      const sortedList = sortLists(lists, sortKey, !isAscending);
      setIsAscending(!isAscending);
      setLists(sortedList);
    }
    // if the sorted key is not the newly selected option, set the sortKey and set isAscending to true
    else {
      const sortedList = sortLists(lists, option, true);
      setSortKey(option);
      setIsAscending(true);
      setLists(sortedList);
    }
  }
  
  /**
  * sortLists - sort the earthquake list that needs to be displayed
  * @param {array} lists - array of objects of the earthquake list that needs to be sorted
  * @param {string} sortKey - the key by which the list is to be sorted
  * @param {boolean} isAscending - whether the list is to be sorted in ascending or descending options
  * @returns the sorted lists 
  */
  const sortLists = (lists, sortKey , isAscending) => {
    // get the property  that needs to be sorted and the index of the item in list and store it in an arraay
    const mapped = lists.map((item, i) => {
      return { i, value: item[sortKey] };
    })
    
    // based on sortkey and is ascending call the respective sort method
    switch(sortKey){
      case 'title': 
        if(isAscending){
          mapped.sort(compareStringsAsc);
        }
        else{
          mapped.sort(compareStringsDesc);
        }
        break;
      case 'magnitude': 
        if(isAscending){
          mapped.sort(compareNumberAsc);
        }
        else{
          mapped.sort(compareNumberDesc);
        }
        break;
      case 'time': 
        if(isAscending){
          mapped.sort(compareDateAsc);
        }
        else{
          mapped.sort(compareDateDesc);
        }
        break;
      default:
        if(isAscending){
          mapped.sort(compareDateAsc);
        }
        else{
          mapped.sort(compareDateDesc);
        }
        break;
      
    }
    // remap the sorted mapped array to the original list and return the sorted list
    const result = mapped.map(item => lists[item.i]);
    return result;
  }
  
  
  const tableHeaderProps = {
    headers: tableHeaders,
    sortKey,
    isAscending,
    setSortOption
  }
  
  return (
    <main>
      <PageTitle title={'USGS All Earthquakes, Past Hour'} />
      {lists.length > 0 && 
        <table>
          <thead>
            <TableHeaders {...tableHeaderProps}  />
          </thead>
          <tbody>
            {lists && lists.length > 0 && lists.map(item => {return (
              <tr key={item.id}>
                <td className={styles.tdTitle}><Link to={{pathname:'/detail/'+item.id, state: {data: item}}}>{item.title}</Link></td>
                <td className={styles.tdMagnitude}>{item.magnitude}</td>
                <td className={styles.tdTitle}>{item.time}</td>
              </tr>
            )}
            )}
          </tbody>
        </table>
      }
      {lists.length === 0 && <span>No earthquakes in the past hour.</span>}
    </main>
  )
}
    
export default List;