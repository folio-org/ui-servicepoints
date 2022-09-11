import React from 'react';

import {
  handleCheckServicePoints,
  handleEvent
} from './eventHandlers';
import ChangeServicePoint from './ChangeServicePoint';

export default class ServicePoints extends React.Component {
  /**
   * checkServicePoints
   * package.json::stripes.links.userDropdown event handler
   *
   * Note that this function is called before coreEvents.LOGIN is fired,
   * meaning the stripes object here is in its initial form, as instantiated
   * by stripes-core prior to being decorated by any other event handlers.
   *
   * @param {object} stripes
   * @returns {boolean} true if
   */
  static checkServicePoints(stripes) {
    return handleCheckServicePoints(stripes);
  }

  /**
   * eventHandler
   * package.json::stripes.handlerName event handler
   * @param {string} event
   * @param {object} stripes
   * @param {} data
   *
   * @returns null, or a Component in order to prevent the event from propagating
   */
  static eventHandler(event, stripes, data) {
    return handleEvent(event, stripes, data) ?? null;
  }

  render() {
    return <ChangeServicePoint />;
  }
}
