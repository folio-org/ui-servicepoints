import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import ServicePointsModal from '../ServicePointsModal';

class NavLink extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  showModal() {
    this.setState({ open: true });
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
