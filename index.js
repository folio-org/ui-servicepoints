import React from 'react';
import PropTypes from 'prop-types';
import events from '@folio/stripes-core/src/events';
import { get } from 'lodash';

import ServicePointsModal from './lib/ServicePointsModal';

export default class ServicePoints extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  static eventHandler(event, stripes) {
    const { user } = stripes;

    if (event === events.LOGIN && !get(user, ['user', 'curServicePoint'])) {
      return ServicePoints;
    }

    return null;
  }

  render() {
    const { stripes } = this.props;
    const servicePoints = get(stripes, ['user', 'user', 'servicePoints'], []);
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint']);

    return (
      <ServicePointsModal
        open={!curServicePoint}
        stripes={stripes}
        servicePoints={servicePoints}
      />
    );
  }
}
