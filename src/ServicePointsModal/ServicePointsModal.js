import React from 'react';
import { sortBy } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button, Col, Modal, Row } from '@folio/stripes/components';
import { updateUser } from '@folio/stripes/core';

/**
 * Show a modal with buttons for each available service-point,
 */
class ServicePointsModal extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  setCurrentServicePoint(servicePoint) {
    const { stripes, onClose } = this.props;

    // persist to storage
    updateUser(stripes.store, { curServicePoint: servicePoint });

    // rerender root
    stripes.updateUser({ curServicePoint: servicePoint });

    if (onClose) {
      onClose();
    }
  }

  render() {
    const { stripes, open, onClose } = this.props;
    const servicePoints = stripes?.user?.user?.servicePoints ?? [];
    const curServicePoint = stripes?.user?.user?.curServicePoint ?? {};

    return (
      <Modal
        data-test-servicepoints-modal
        open={open}
        onClose={onClose}
        closeOnBackgroundClick
        dismissible
        label={<FormattedMessage id="ui-servicepoints.selectServicePoint" />}
      >
        <Col xs={12}>
          <Row>
            {
              sortBy(servicePoints, ['name']).map((sp, index) => (
                <Button
                  buttonStyle={(curServicePoint.id === sp.id) ? 'primary' : 'default'}
                  key={sp.id}
                  id={`service-point-btn-${index}`}
                  fullWidth
                  onClick={() => this.setCurrentServicePoint(sp)}
                >
                  {sp.name}
                </Button>
              ))
            }
          </Row>
        </Col>
      </Modal>
    );
  }
}

export default ServicePointsModal;
