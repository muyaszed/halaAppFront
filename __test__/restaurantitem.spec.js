import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import RestaurantItem from '../app/components/Restaurantitem';

describe('</RestaurantItem>', () => {
  jest.useFakeTimers();
  const handlePressItem = jest.fn();
  const item = {
    key: 1,
    name: 'Sushi Toyyiba',
    location: 'Johor Bahru',
    category: 'Japanese',
  };
  const { getByTestId } = render(<RestaurantItem item={item} pressItem={handlePressItem} />);
  const name = getByTestId('restaurantTitle');
  it('Render restaurant detail', () => {
    expect(name.props.children).toBe('Sushi Toyyiba');
  });

  it('calls the handle function correctly when touchable area is pressed', () => {
    const title = getByTestId('restaurantTitle');
    fireEvent.press(title);
    expect(handlePressItem).toBeCalledWith(item);
  });
});
