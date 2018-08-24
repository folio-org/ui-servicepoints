import React from 'react';
import PropTypes from 'prop-types';
import ServicePointsModal from '../ServicePointsModal';

class NavLink extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

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
        stripes={this.props.stripes}
        open={this.state.open}
        onClose={() => this.closeModal()}
      />
    );
  }
}

export default NavLink;
