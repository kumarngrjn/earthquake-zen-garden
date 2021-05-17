import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../components/Header';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Header component', () => {
    it('test component renders with title', () => {
        const history = createMemoryHistory()
        render(<Router history={history}><Header/></Router>);
        expect(screen.queryByDisplayValue('Earthquake Zen Garden')).not.toBeNull;
        expect(screen.queryByDisplayValue('Welcome Sally')).not.toBeNull;
        const image = screen.getByRole('img');
        expect(image.getAttribute('src')).toEqual('https://www.realtor.com/realtor-com.png');
    })
})