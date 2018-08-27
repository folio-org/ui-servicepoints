import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import coreEvents from '@folio/stripes-core/src/events';
import events from './events';
import ServicePointsModal from './lib/ServicePointsModal';
import AccessModal from './lib/AccessModal';

export default class ServicePoints extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  static eventHandler(event, stripes, data) {
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint']);

    if (event === events.CHANGE_SERVICE_POINT ||
      (event === coreEvents.LOGIN && !curServicePoint)) {
      return ServicePoints;
    }

    if (event === coreEvents.SELECT_MODULE && data.name && data.name.match(/checkin|checkout/)) {
      return AccessModal;
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <ServicePointsModal
        open={this.state.open}
        stripes={this.props.stripes}
        onClose={() => this.closeModal()}
      />
    );
  }
}
