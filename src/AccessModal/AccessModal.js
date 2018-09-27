import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import SafeHTMLMessage from '@folio/react-intl-safe-html';

class AccessModal extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    data: PropTypes.object,
  };

  constructor() {
    super();
    this.state = { open: true };
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const { stripes, data } = this.props;
    const { displayName } = data;

    return (
      <Modal
        dismissible
        onClose={() => this.closeModal()}
        open={this.state.open}
        label={stripes.intl.formatMessage({ id: 'ui-servicepoints.accessDenied.title' })}
      >
        <p><SafeHTMLMessage id="ui-servicepoints.accessDenied.message" values={{ displayName }} /></p>
        <Col xs={12}>
          <Row end="xs">
            <Button buttonStyle="primary" onClick={() => this.closeModal()}>
              <SafeHTMLMessage id="ui-servicepoints.accessDenied.close" />
            </Button>
          </Row>
        </Col>
      </Modal>
    );
  }
}

export default AccessModal;
