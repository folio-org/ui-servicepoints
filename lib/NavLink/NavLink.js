import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import NavListItem from '@folio/stripes-components/lib/NavListItem';
import ServicePointsModal from '../ServicePointsModal';

class NavLink extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {
      caption: 'ui-servicepoints.userDropdown.switchServicePoint'
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  showModal() {
    this.setState({ open: true });
    const { data } = this.props;

    if (data.onClick) {
      data.onClick();
    }
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const { data, stripes } = this.props;

    return (
      <NavListItem type="button" onClick={() => this.showModal()}>
        <FormattedMessage id={data.caption} />
        <ServicePointsModal stripes={stripes} open={this.state.open} onClose={() => this.closeModal()} />
      </NavListItem>
    );
  }
}

export default NavLink;
