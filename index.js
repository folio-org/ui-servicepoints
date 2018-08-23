import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import coreEvents from '@folio/stripes-core/src/events';
import events from './events';
import ServicePointsModal from './lib/ServicePointsModal';
import NavLink from './lib/NavLink';

export default class ServicePoints extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  static eventHandler(event, stripes) {
    if (event === coreEvents.LOGIN && !get(stripes, ['user', 'user', 'curServicePoint'])) {
      return ServicePoints;
    }

    if (event === events.CHANGE_SERVICE_POINT) {
      return NavLink;
    }

    return null;
  }

  render() {
    const { stripes } = this.props;
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint']);

    return (
      <ServicePointsModal open={!curServicePoint} stripes={stripes} />
    );
  }
}
