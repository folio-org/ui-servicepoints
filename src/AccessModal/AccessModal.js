import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, Row } from '@folio/stripes/components';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { FormattedMessage } from 'react-intl';

class AccessModal extends React.Component {
  static propTypes = {
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
    const { data } = this.props;
    const { displayName } = data;

    return (
      <Modal
        dismissible
        onClose={() => this.closeModal()}
        open={this.state.open}
        label={<FormattedMessage id="ui-servicepoints.accessDenied.title" />}
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
