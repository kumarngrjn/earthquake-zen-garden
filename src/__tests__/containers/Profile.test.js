import React from 'react';
import {render, screen, within} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../../containers/Profile';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import sinon from 'sinon';

describe('Profile component', () => {
    const data = {
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        email: 'test@user.com',
        bio: 'lorem ipsum',
        avatarImage: 'http://a.com'
    }

    it('test component renders with no detail info - redirected back', () => {
        const history = createMemoryHistory()
        history.push = sinon.stub()
        render(<Router history={history}><Profile/></Router>);
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
        render(<Router history={history}><Profile/></Router>);
        expect(screen.getByRole('heading',{level: 3}).textContent).toEqual('Profile');
        const image = screen.getByRole('img');
        expect(image.getAttribute('src')).toEqual(data.avatarImage);
        const detailItems = screen.getAllByRole('listitem');
        expect(detailItems).toHaveLength(5);
        expect(within(detailItems[0]).queryByDisplayValue(data.firstName)).not.toBeNull
        expect(within(detailItems[1]).queryByDisplayValue(data.lastName)).not.toBeNull
        expect(within(detailItems[2]).queryByDisplayValue(data.phone)).not.toBeNull
        expect(within(detailItems[3]).queryByDisplayValue(data.email)).not.toBeNull
        expect(within(detailItems[4]).queryByDisplayValue(data.bio)).not.toBeNull
        
    })
})