import React from 'react';
import { render } from 'react-native-testing-library';

import ReviewItem from '../app/components/Reviewitem';

describe('<ReviewItem />', () => {
  const item = {
    user: {
      first_name: 'Yazed',
      last_name: 'Jamal',
    },
    comment: 'The food is very good and the service is excellant',
  };
  const { getByTestId } = render(<ReviewItem item={item} />);

  it('Render review detail', () => {
    const avatar = getByTestId('userReviewAvatar');
    const comment = getByTestId('userReviewComment');
    expect(avatar.props.label).toBe('YJ');
    expect(comment.props.children).toBe(item.comment);
  });
});
