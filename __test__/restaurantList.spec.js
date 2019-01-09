import React from 'react';
import { render, shallow } from 'react-native-testing-library';

import RestaurantList from '../app/components/Restaurantlist';

describe('RestaurantList', () => {
    it('componentDidMount fetch data', () => {
        
        const spy = jest.spyOn(RestaurantList.prototype, 'componentDidMount');
        render(<RestaurantList />);
        expect(spy).toHaveBeenCalledTimes(1);
    })
})