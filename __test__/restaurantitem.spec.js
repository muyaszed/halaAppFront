import React from 'react';
import { render, shallow } from 'react-native-testing-library';

import RestaurantItem from '../app/components/Restaurantitem';

describe('</RestaurantItem>', () => {
   
    const item = {
        key: 1,
        name: 'Sushi Toyyiba',
        location: 'Johor Bahru',
        category: 'Japanese' 
    }
    it('Render restaurant detail', () => {
        const { getByTestId } = render(<RestaurantItem item={item} />);
        const name = getByTestId('restaurantTitle');
        expect(name.props.children).toBe("Sushi Toyyiba");
    })
    
})