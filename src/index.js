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
   * This function will return true if the user is affiliated with one or more
   * services points, i.e. if it is possible to switch the currently-assigned
   * service point.
   *
   * Returning true means the userDropdown should include a "Switch service points"
   * entry that, when clicked, will fire a CHANGE_SERVICE_POINT event.
   *
   * Returning false means no entries will be added to the userDropdown.
   *
   * @param {object} stripes
   * @returns {boolean} true to show a "switch service points" menu item
   */
  static checkServicePoints(stripes) {
    return handleCheckServicePoints(stripes);
  }

  /**
   * eventHandler
   * package.json::stripes.handlerName event handler
   *
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
