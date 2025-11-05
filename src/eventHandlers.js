import { coreEvents, updateUser } from '@folio/stripes/core';

import AccessModal from './AccessModal';
import ChangeServicePoint from './ChangeServicePoint';

/**
 * handleCheckServicePoints
 * return true if servicePoints is a non-empty array
 *
 * NOTE: This function is invoked by index::checkServicePoints, as specified
 * in package.json::stripes.links.userDropdown, which is called before
 * coreEvents.LOGIN is fired, meaning the stripes object passed in here
 * is in its initial form as instantiated by stripes core, prior to being
 * decorated by any other event handlers, including `handleEvent` defined here.
 *
 * @param {object} stripes
 * @returns {boolean}
 */
export const handleCheckServicePoints = (stripes) => {
  return (stripes?.okapi?.loginData?.servicePointsUser?.servicePoints ?? []).length > 0;
};

/**
 * servicePointIsRequired
 * @param {object} stripes
 * @param {object} data { displayName, name, module}
 * @returns {boolean}
 */
export const servicePointIsRequired = (stripes, data) => {
  // :( legacy: hard-coded list of app-names the require service points
  if (data.name && ['checkin', 'checkout', 'requests'].includes(data.name)) {
    return true;
  }

  // :) search for modules defining stripes.actsAs[..., 'servicePointsConsumer']
  // and return true if one matches the destination module
  for (const mod of stripes.modules.servicepointsConsumer || []) {
    if (mod.module === data.module) {
      return true;
    }
  }

  return false;
};

/**
 * handleEvent
 * @param {string} event an event as defined by @folio/stripes/core/coreEvents
 * @param {object} stripes
 * @param {object} data { displayName, name, module}
 *
 * @returns null, or a Component in order to prevent the event from propagating
 */
export const handleEvent = (event, stripes, data) => {
  let curServicePoint = stripes?.okapi?.currentUser?.curServicePoint;
  let servicePoints = stripes?.okapi?.currentUser?.servicePoints ?? [];

  // on login, parse the login response for service point info
  // if curServicePoint is already set, we must be reloading an existing session
  // in wich case we don't need to parse that response
  if (event === coreEvents.LOGIN && !curServicePoint) {
    // handleLoginWithoutServicePoint
    servicePoints = stripes?.okapi?.loginData?.servicePointsUser?.servicePoints ?? [];
    const loginDefaultSPId = stripes?.okapi?.loginData?.servicePointsUser?.defaultServicePointId;
    curServicePoint = (!loginDefaultSPId && servicePoints.length === 1) ?
      servicePoints[0] :
      servicePoints.find(sp => sp.id === loginDefaultSPId);

    // persist to storage and dispatch, causing root and stripes to re-render
    // TODO: updateUser is async; can/should it be awaited here?
    updateUser(stripes.store, {
      curServicePoint,
      servicePoints,
    });
  }

  // show the "change service point modal" for either of these conditions:
  // 1. the CHANGE_SERVICE_POINT event fires (duh)
  // 2. on login if the user has SPs but not a current SP
  if (event === coreEvents.CHANGE_SERVICE_POINT ||
    (event === coreEvents.LOGIN && !curServicePoint && servicePoints.length)) {
    return ChangeServicePoint;
  }

  // show the "access denied modal" when all these conditions are true:
  // 1. the SELECT_MODULE event fires
  // 2. the user does not have a current SP
  // 3. the destination module requires an SP
  if (event === coreEvents.SELECT_MODULE &&
    !curServicePoint &&
    servicePointIsRequired(stripes, data)) {
    return AccessModal;
  }

  return null;
};
