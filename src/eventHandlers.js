import { coreEvents, updateUser } from '@folio/stripes/core';

import AccessModal from './AccessModal';
import ChangeServicePoint from './ChangeServicePoint';

/**
 * handleCheckServicePoints
 * return true if servicePoints is a non-empty array
 *
 * @param {object} stripes
 * @returns {boolean}
 */
export const handleCheckServicePoints = (stripes) => {
  return (stripes?.okapi?.loginData?.servicePointsUser?.servicePoints ?? []).length > 0;
};


/**
 *
 * @param {string} event an event as defined by @folio/stripes/core/coreEvents
 * @param {object} stripes
 * @param {object} data
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
    updateUser(stripes.store, {
      curServicePoint,
      servicePoints,
    });
  }

  // show the "change service point modal" when
  // 1. the CHANGE_SERVICE_POINT event fires (duh)
  // 2. on login if the user has SPs but not a current SP
  if (event === coreEvents.CHANGE_SERVICE_POINT ||
    (event === coreEvents.LOGIN && !curServicePoint && servicePoints.length)) {
    return ChangeServicePoint;
  }

  // changing apps when
  if (event === coreEvents.SELECT_MODULE &&
    !curServicePoint &&
    data.name && data.name.match(/checkin|checkout|requests/)) {
    return AccessModal;
  }

  return null;
};
