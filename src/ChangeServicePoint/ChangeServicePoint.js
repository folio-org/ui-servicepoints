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
    const { onClose } = this.props;
    
    this.setState({ open: false });

    if (onClose) {
      onClose();
    }
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
