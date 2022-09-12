import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { updateUser } from '@folio/stripes/core';

import ServicePointsModal from './ServicePointsModal';

describe('ServicePointsModal', () => {
  const stripes = {
    user: {
      user: {
        servicePoints: [{ name: 'alpha', id: 'a' }, { name: 'beta', id: 'b' }],
        curServicePoint: { name: 'alpha', id: 'a' },
      }
    },
    store: {},
  };

  test('modal is present', async () => {
    render(<ServicePointsModal stripes={stripes} open />);
    expect(screen.getByText('ui-servicepoints.selectServicePoint')).toBeInTheDocument();
  });

  test('service points are listed', async () => {
    render(<ServicePointsModal stripes={stripes} open />);
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();
  });

  test.skip('current service point is selected', async () => {
    render(<ServicePointsModal stripes={stripes} open />);
    expect(screen.getByText('alpha')).toHaveAttribute('class', 'primary');
  });

  test('choosing a service point selects it', async () => {
    const onClose = jest.fn();
    render(<ServicePointsModal stripes={stripes} open onClose={onClose} />);

    await userEvent.click(screen.getByText('beta'));

    expect(updateUser).toHaveBeenCalledWith(stripes.store, { curServicePoint: { name: 'beta', id: 'b' } });
    expect(onClose).toHaveBeenCalled();
  });

  test('modal closes', async () => {
    render(<ServicePointsModal stripes={stripes} />);
    expect(screen.queryByText('ui-servicepoints.selectServicePoint')).not.toBeInTheDocument();
  });
});
