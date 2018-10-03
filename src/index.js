import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { coreEvents } from '@folio/stripes/core';
import ServicePointsModal from './ServicePointsModal';
import AccessModal from './AccessModal';

export default class ServicePoints extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => {},
  };

  static checkServicePoints(stripes) {
    return get(stripes, ['user', 'user', 'servicePoints'], []).length > 0;
  }

  static eventHandler(event, stripes, data) {
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint']);
    const spList = get(stripes, ['user', 'user', 'servicePoints'], []);

    if (event === coreEvents.CHANGE_SERVICE_POINT ||
      (event === coreEvents.LOGIN && !curServicePoint && spList.length)) {
      return ServicePoints;
    }

    if (event === coreEvents.SELECT_MODULE &&
      !curServicePoint &&
      data.name && data.name.match(/checkin|checkout/)) {
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
    this.props.onClose();
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
