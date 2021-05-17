import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageTitle from '../../components/PageTitle';


describe('PageTitle component', () => {
    it('test component renders with title', () => {
        render(<PageTitle title='hello' />);
        expect(screen.queryByDisplayValue('hello')).not.toBeNull;
    })
})