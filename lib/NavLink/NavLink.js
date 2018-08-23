import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import ServicePointsModal from '../ServicePointsModal';

class NavLink extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  showModal() {
    this.setState({ open: true });
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const { stripes } = this.props;

    return (
      <NavListItem type="button" onClick={() => this.showModal()}>
        <FormattedMessage id="ui-servicepoints.userDropdown.switchServicePoint" />
        <ServicePointsModal stripes={stripes} open={this.state.open} onClose={() => this.closeModal()} />
      </NavListItem>
    );
  }
}

export default NavLink;
