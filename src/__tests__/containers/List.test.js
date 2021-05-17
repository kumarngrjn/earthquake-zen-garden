import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import List from '../../containers/List';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import data from '../../data.json';
import { format } from 'date-fns';
import {cloneDeep} from 'lodash';

describe('List component', () => {
    const listItems = cloneDeep(data.features)
    const mappedListItems = listItems.map(item =>{return {
        title:  item.properties.title,
        magnitude: item.properties.mag,
        time: format(item.properties.time, 'MMM dd yyyy, hh:mm a')
    }})
    it('test component renders with all list items', () => {
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        expect(screen.getByRole('heading',{level: 3}).textContent).toEqual('USGS All Earthquakes, Past Hour');
        const tbody = screen.getAllByRole('rowgroup');
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, mappedListItems); 
    })

    it('test sort by title ascending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => {
            const uppercaseA = a.title.toUpperCase()
            const uppercaseB = b.title.toUpperCase()
            if (uppercaseA > uppercaseB) {
                return 1;
            }
            if (uppercaseA < uppercaseB) {
                return -1;
            }
            return 0;
        })
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[0]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })

    it('test sort by title descending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => {
            const uppercaseA = a.title.toUpperCase()
            const uppercaseB = b.title.toUpperCase()
            if (uppercaseA > uppercaseB) {
                return -1;
            }
            if (uppercaseA < uppercaseB) {
                return 1;
            }
            return 0;
        })
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[0]);
        fireEvent.click(th[0]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })

    it('test sort by magnitude ascending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => a.magnitude - b.magnitude)
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[1]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })

    it('test sort by magnitude descending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => b.magnitude - a.magnitude)
        
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[1]);
        fireEvent.click(th[1]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })

    it('test sort by date ascending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => {
            const dateTimeA = new Date(a.time);
            const dateTimeB = new Date(b.time);
            return dateTimeA - dateTimeB;
        })
        //const mappedListItems
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[2]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })

    it('test sort by date descending', () =>{
        const listItems = mappedListItems.slice()
        listItems.sort((a,b) => {
            const dateTimeA = new Date(a.time);
            const dateTimeB = new Date(b.time);
            return dateTimeB - dateTimeA;
        })
        //const mappedListItems
        const history = createMemoryHistory();
        render(<Router history={history}><List /></Router>);
        let tbody = screen.getAllByRole('rowgroup');
        const th = within(tbody[0]).getAllByRole('columnheader')
        fireEvent.click(th[2]);
        fireEvent.click(th[2]);
        const rows = within(tbody[1]).getAllByRole('row');
        expect(rows).toHaveLength(data.features.length);
        validateListData(rows, listItems); 
    })
})

function validateListData(currentData, expectedData){
    for(let i = 0; i<currentData.length; i++){
        const rowData = within(currentData[i]).getAllByRole('cell')
        expect(rowData.length).toEqual(3);
        expect(rowData[0].textContent).toEqual(expectedData[i].title)
        expect(rowData[1].textContent).toEqual(''+expectedData[i].magnitude)
        expect(rowData[2].textContent).toEqual(expectedData[i].time);
    } 
}