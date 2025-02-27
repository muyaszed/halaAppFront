import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import NewRestaurantForm from '../app/components/Newrestaurantform';

describe('<NewRestaurantForm />', () => {
  jest.useFakeTimers();
  const handleAdd = jest.fn();
  const item = {
    name: 'Sushi Toyyiba',
    location: 'Johor Bahru',
    category: 'Japanese',
  };
  const { getByTestId } = render(<NewRestaurantForm onAdd={handleAdd} />);

  const restaurantNameInput = getByTestId('restaurantNameInputText');
  const restaurantCategoryInput = getByTestId('restaurantCategoryInputText');
  const restaurantLocationInput = getByTestId('restaurantLocationInputText');
  const addButton = getByTestId('addNewRestaurantButton');

  fireEvent.changeText(restaurantNameInput, item.name);
  fireEvent.changeText(restaurantLocationInput, item.location);
  fireEvent.changeText(restaurantCategoryInput, item.category);
  fireEvent.press(addButton);

  it('calls the onAdd handler with the entered data', () => {
    expect(handleAdd).toHaveBeenCalledWith(item);
  });

  it('clears the input text when data is submited', () => {
    expect(restaurantNameInput.props.value).toEqual('');
    expect(restaurantLocationInput.props.value).toEqual('');
    expect(restaurantCategoryInput.props.value).toEqual('');
  });
});
