import React from 'react';
import { render } from 'react-native-testing-library';

import RestaurantList from '../app/components/Restaurantlist';

describe('RestaurantList', () => {
    it('componentDidMount fetch data', () => {
        const spy = jest.spyOn(<RestaurantList />, 'componentDidMount');
        
        expect(spy).toHaveBeenCalled();
    })
})