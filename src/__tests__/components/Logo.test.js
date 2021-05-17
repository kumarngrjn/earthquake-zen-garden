import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Logo from '../../components/Logo';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('Logo component', () => {
    it('test component renders with image', () => {
        const history = createMemoryHistory()
        const imageProps = {
            image: 'http://a.com'
        }
        render(<Router history={history}><Logo {...imageProps}/></Router>);
        const image = screen.getByRole('img');
        expect(image.getAttribute('src')).toEqual('http://a.com');
    })
})