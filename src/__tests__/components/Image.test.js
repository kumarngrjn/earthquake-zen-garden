import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Image from '../../components/Image';

describe('Image component', () => {
    it('test component renders with image', () => {
        const imageProps = {
            source: 'http://a.com',
            width: 30,
            height: 30,
            title: 'dummy'
        }
        render(<Image {...imageProps}/>);
        const image = screen.getByRole('img');
        expect(image.getAttribute('src')).toEqual(imageProps.source);
        expect(image.getAttribute('width')).toEqual(''+imageProps.width);
        expect(image.getAttribute('height')).toEqual(''+imageProps.height);
        expect(image.getAttribute('alt')).toEqual(imageProps.title);
    })
})