import React from 'react';
import { render } from 'react-native-testing-library';
import ReviewList from '../app/components/Reviewlist';

describe('<ReviewList />', () => {
  it('passed in the correct data from prop', () => {
    const reviews = [
      {
        id: 1,
        comment: 'The food is very good and the service is excellant',
        user: {
          first_name: 'Yazed',
          last_name: 'Jamal',
        },
      },
    ];

    const { getByTestId } = render(<ReviewList reviews={reviews} />);
    const list = getByTestId('reviewList');
    expect(list.props.data).toEqual(reviews);
  });
});
