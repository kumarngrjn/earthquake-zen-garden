import React from 'react';
import {render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Detail from '../../containers/Detail';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import sinon from 'sinon';

describe('Detail component', () => {
    const data = {
        title: 'EarthQuake 1',
        magnitude: '1',
        time: 'Apr 13 2018, 03:25 PM',
        status: 'automatic',
        tsunami: 0,
        type: 'earthquake'
    }

    it('test component renders with no detail info - redirected back', () => {
        const history = createMemoryHistory()
        history.push = sinon.stub()
        render(<Router history={history}><Detail/></Router>);
        expect(history.push.calledOnce).toBeTruthy;
        expect(history.push.getCall(0).args[0]).toEqual('/');
    })

    it('test component renders with detail', () => {
        let history = createMemoryHistory()
        history = {
            ...history,
            location: {
                state: {data}
            }
        }
        render(<Router history={history}><Detail/></Router>);
        expect(screen.getByRole('heading',{level: 3}).textContent).toEqual(data.title);
        const detailItems = screen.getAllByRole('listitem');
        expect(detailItems).toHaveLength(6);
        expect(within(detailItems[0]).queryByDisplayValue(data.title)).not.toBeNull
        expect(within(detailItems[1]).queryByDisplayValue(data.magnitude)).not.toBeNull
        expect(within(detailItems[2]).queryByDisplayValue(data.time)).not.toBeNull
        expect(within(detailItems[3]).queryByDisplayValue(data.status)).not.toBeNull
        expect(within(detailItems[4]).queryByDisplayValue(data.tsunami)).not.toBeNull
        expect(within(detailItems[5]).queryByDisplayValue(data.type)).not.toBeNull
        
    })
})