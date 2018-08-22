import React from 'react';
import PropTypes from 'prop-types';
import events from '@folio/stripes-core/src/events';
import { get } from 'lodash';

import ServicePointModal from './ServicePointModal';

export default class ServicePoints extends React.Component {
  static eventHandler(event, stripes, data = {}) {
    const { user } = stripes;

    if (event === events.LOGIN && !get(user, ['user', 'curServicePoint'])) {
      return ServicePoints;
    }
  }

  render() {
    const { stripes } = this.props;
    const servicePoints = get(stripes, ['user', 'user', 'servicePoints'], []);
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint']);

    return (
      <ServicePointModal
        open={!curServicePoint}
        stripes={stripes}
        servicePoints={servicePoints}
      />
    );
  }
}
