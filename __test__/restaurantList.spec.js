import React from 'react';
import { render, shallow } from 'react-native-testing-library';

import RestaurantList from '../app/components/Restaurantlist';

describe('RestaurantList', () => {
    //test componentDidMount cycle
    // it('componentDidMount fetch data', () => {
        
    //     const spy = jest.spyOn(RestaurantList.prototype, 'componentDidMount');
    //     render(<RestaurantList />);
    //     expect(spy).toHaveBeenCalledTimes(1);
    // })

    it('passed in the correct data from prop', () => {
        const data = {
            name: 'Tumes',
            location: 'Johor'
        }
        const { getByTestId } = render(<RestaurantList data={data}/>);
        const list = getByTestId('restaurantList');
        expect(list.props.data).toEqual(data);
    })
})