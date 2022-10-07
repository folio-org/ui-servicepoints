import React from 'react';
import PropTypes from 'prop-types';

import ServicePointsModal from '../ServicePointsModal';

export default class ChangeServicePoint extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  constructor() {
    super();
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
