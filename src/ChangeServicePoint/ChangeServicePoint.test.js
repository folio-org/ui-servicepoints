import React from 'react';
import { render, screen } from '@folio/jest-config-stripes/testing-library/react';

import ChangeServicePoint from './ChangeServicePoint';

describe('ChangeServicePoint', () => {
  test('modal is present', async () => {
    render(<ChangeServicePoint />);
    expect(screen.getByText('ui-servicepoints.selectServicePoint')).toBeInTheDocument();
  });
});
