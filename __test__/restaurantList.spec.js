import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import RestaurantList from '../app/components/Restaurantlist';

describe('RestaurantList', () => {
  const data = {
    name: 'Tumes',
    location: 'Johor',
  };

  const { getByTestId } = render(<RestaurantList data={data} pressItem={() => {}} />);

  it('passed in the correct data from prop', () => {
    const list = getByTestId('restaurantList');
    expect(list.props.data).toEqual(data);
  });
});
