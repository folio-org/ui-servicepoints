import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AccessModal from './AccessModal';

describe('AccessModal', () => {
  test('modal is present', async () => {
    render(<AccessModal data={{ displayName: 'thunder-chicken' }} />);
    expect(screen.getByText('ui-servicepoints.accessDenied.title')).toBeInTheDocument();
  });

  test('modal closes', async () => {
    render(<AccessModal data={{ displayName: 'thunder-chicken' }} />);

    userEvent.click(screen.getByText('ui-servicepoints.accessDenied.close'));

    await waitForElementToBeRemoved(() => screen.queryByText('ui-servicepoints.accessDenied.title'));
  });
});
