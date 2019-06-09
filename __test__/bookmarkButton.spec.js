import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

describe('<BookmarkButton />', () => {
    const { getByTestId, debug } = render( <BookmarkButton bookmarked />);
    const buttonWrapper = getByTestId('buttonWrapper');

    it('renders correct icon'. () => {
        debug();
    })

    // it('renders title bookmark when bookmarked is false', () => {
    //     const title = buttonWrapper.props.children
    //     expect()
    // });

    // it('renders title unbookmark when bookmarked is true', () => {

    // })

    // it('calls handle function when button is pressed', () => {

    // })
});