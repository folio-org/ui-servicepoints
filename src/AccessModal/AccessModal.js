import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, Row } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

/**
 * Show an access-denied modal, e.g. when user visits an app
 * where a ServicePoint is required but one has not been configured.
 */
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
        data-test-access-modal
        dismissible
        onClose={() => this.closeModal()}
        open={this.state.open}
        label={<FormattedMessage id="ui-servicepoints.accessDenied.title" />}
      >
        <p><FormattedMessage id="ui-servicepoints.accessDenied.message" values={{ displayName }} /></p>
        <Col xs={12}>
          <Row end="xs">
            <Button data-test-access-modal-close buttonStyle="primary" onClick={() => this.closeModal()}>
              <FormattedMessage id="ui-servicepoints.accessDenied.close" />
            </Button>
          </Row>
        </Col>
      </Modal>
    );
  }
}

export default AccessModal;
