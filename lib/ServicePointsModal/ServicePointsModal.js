import React from 'react';
import { sortBy, get } from 'lodash';
import PropTypes from 'prop-types';
import { setCurServicePoint } from '@folio/stripes-core/src/loginServices';
import Modal from '@folio/stripes-components/lib/Modal';
import Button from '@folio/stripes-components/lib/Button';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

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

  onClose() {
    this.props.onClose();
  }

  render() {
    const { stripes, open, onClose } = this.props;
    const servicePoints = get(stripes, ['user', 'user', 'servicePoints'], []);
    const curServicePoint = get(stripes, ['user', 'user', 'curServicePoint'], {});

    return (
      <Modal open={open} onClose={onClose} closeOnBackgroundClick dismissible label={stripes.intl.formatMessage({ id: 'ui-servicepoints.selectServicePoint' })}>
        <Col xs={12}>
          <Row>
            {
              sortBy(servicePoints, ['name']).map((sp, index) => (
                <Button
                  buttonStyle={(curServicePoint.id === sp.id) ? 'primary' : 'default'}
                  key={sp.id}
                  id={`service-point-btn-${index}`}
                  arial-label={sp.name}
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
