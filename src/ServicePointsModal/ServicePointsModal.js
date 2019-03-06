import React from 'react';
import { sortBy, get } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { setCurServicePoint } from '@folio/stripes/core';
import { Button, Col, Modal, Row } from '@folio/stripes/components';

class ServicePointsModal extends React.Component {
  static propTypes = {
    stripes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  setCurrentServicePoint(servicePoint) {
    const { stripes: { store }, onClose } = this.props;
    setCurServicePoint(store, servicePoint);
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { stripes, open, onClose } = this.props;
    const servicePoints = get(stripes, ['user', 'user', 'servicePoints'], []);
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint'], {});

    return (
      <Modal
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
                  aria-label={sp.name}
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
