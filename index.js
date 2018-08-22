import React from 'react';
import PropTypes from 'prop-types';
import events from '@folio/stripes-core/src/events';

export default class ServicePoints extends React.Component {

  static eventHandler(event, stripes, data = {}) {
    // TODO finalize this
    if (event === events.LOGIN) {
      return ServicePoints;
    }
  }

  render() {
    return (<div></div>);
  }
}
