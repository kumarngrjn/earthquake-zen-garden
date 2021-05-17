import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import sinon from 'sinon';
import '@testing-library/jest-dom/extend-expect';
import TableHeaders from '../../components/TableHeaders';

describe('TableHeaders component', () => {
    const setSortOptionStub = sinon.stub()
    const headers = [
        {key: 'header1', value: 'Header 1'},
        {key: 'header2', value: 'Header 2'},
        {key: 'header3', value: 'Header 3'},
    ]
    const tableHeadersProps = {
        headers,
        sortKey: 'header2',
        isAscending: true,
        setSortOption: setSortOptionStub
    }
    it('test component renders', () => {
        render(<TableHeaders {...tableHeadersProps} />);
        const thElements  = screen.getAllByRole('columnheader');
        expect(thElements).toHaveLength(3);
        for(let i = 0; i< thElements.length; i++){
            expect(thElements[i].textContent).toEqual(headers[i].value);
        } 
        expect(thElements[1].getAttribute('class')).toContain('asc');
    })

    it('test component renders', () => {
        const modifiedTableHeaderProps = Object.assign({}, tableHeadersProps, {isAscending: false})
        render(<TableHeaders {...modifiedTableHeaderProps} />);
        const thElements  = screen.getAllByRole('columnheader');
        expect(thElements).toHaveLength(3);
        for(let i = 0; i< thElements.length; i++){
            expect(thElements[i].textContent).toEqual(tableHeadersProps.headers[i].value);
        } 
        expect(thElements[1].getAttribute('class')).toContain('desc');
    })

    it('clicking on table header should call sort', () => {
        render(<TableHeaders {...tableHeadersProps} />);
        const thElements  = screen.getAllByRole('columnheader');
        fireEvent.click(thElements[0]);
        expect(setSortOptionStub.calledOnce).toBeTruthy;
        expect(setSortOptionStub.getCall(0).args[0]).toEqual(headers[0].key)
    })
})