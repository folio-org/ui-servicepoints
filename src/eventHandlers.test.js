import { coreEvents } from '@folio/stripes/core';

import AccessModal from './AccessModal';
import ChangeServicePoint from './ChangeServicePoint';
import {
  handleCheckServicePoints,
  handleEvent,
} from './eventHandlers';

describe('handleCheckServicePoints', () => {
  it('returns true if service points are assigned', () => {
    const stripes = {
      okapi: {
        loginData: {
          servicePointsUser: {
            servicePoints: ['a', 'b', 'c']
          }
        }
      }
    };

    expect(handleCheckServicePoints(stripes)).toBe(true);
  });

  it('returns false if service points are missing', () => {
    const stripes = {
      okapi: {
        loginData: {
          servicePointsUser: {
            servicePoints: []
          }
        }
      }
    };

    expect(handleCheckServicePoints(stripes)).toBe(false);
  });
});


describe('handleEvent', () => {
  describe('LOGIN with service points available but unset', () => {
    it('LOGIN, service point unset', () => {
      const stripes = {
        okapi: {
          loginData: {
            servicePointsUser: {
              servicePoints: [{ id: 'a' }, { id: 'b' }],
              defaultServicePointId: null,
            }
          }
        },
        updateUser: jest.fn(),
      };
      const c = handleEvent(coreEvents.LOGIN, stripes, {});
      expect(c).toBe(ChangeServicePoint);
    });
  });

  describe('CHANGE_SERVICE_POINT', () => {
    it('CHANGE_SERVICE_POINT', () => {
      const c = handleEvent(coreEvents.CHANGE_SERVICE_POINT, {}, {});
      expect(c).toBe(ChangeServicePoint);
    });
  });


  describe('SELECT_MODULE', () => {
    const stripes = {
      okapi: {
        currentUser: {
          curServicePoint: { id: '123' },
          servicePoints: ['a', 'b', 'c']
        }
      }
    };

    it('service point is set (checkin) receives null', () => {
      const c = handleEvent(coreEvents.SELECT_MODULE, stripes, { name: 'checkin' });
      expect(c).toBeNull();
    });

    it('service point is set (checkout) receives null', () => {
      const c = handleEvent(coreEvents.SELECT_MODULE, stripes, { name: 'checkout' });
      expect(c).toBeNull();
    });

    it('service point is set (requests) receives null', () => {
      const c = handleEvent(coreEvents.SELECT_MODULE, stripes, { name: 'requests' });
      expect(c).toBeNull();
    });

    it('service point is missing receives AccessModal', () => {
      const config = {
        metadata: {
          requests: {
            subscribesTo: ['servicepoints'],
          },
        },
        okapi: {
          currentUser: {
            curServicePoint: null,
          }
        }
      };
      const c = handleEvent(coreEvents.SELECT_MODULE, config, { name: 'requests' });
      expect(c).toBe(AccessModal);
    });

    it('service point is not required receives null', () => {
      const c = handleEvent(coreEvents.SELECT_MODULE, {}, { name: 'monkey' });
      expect(c).toBeNull();
    });
  });
});



// export const handleEvent = (event, stripes, data) => {
//   console.log('ServicePoints.eventHandler')
//   let curServicePoint = get(stripes, ['okapi', 'currentUser', 'curServicePoint']);
//   let servicePoints = get(stripes, ['okapi', 'currentUser', 'servicePoints'], []);

//   // on login, parse the login response for service point info
//   // if curServicePoint is already set, we must be reloading an existing session
//   // in wich case we don't need to parse that response
//   if (event === coreEvents.LOGIN && !curServicePoint) {
//     // handleLoginWithoutServicePoint
//     servicePoints = get(stripes, ['okapi', 'loginData', 'servicePointsUser', 'servicePoints'], []);
//     const loginDefaultSPId = get(stripes, ['okapi', 'loginData', 'servicePointsUser', 'defaultServicePointId']);
//     curServicePoint = (!loginDefaultSPId && servicePoints.length === 1) ?
//       servicePoints[0] :
//       servicePoints.find(sp => sp.id === loginDefaultSPId);

//     // persist to storage
//     updateUser(stripes.store, {
//       curServicePoint,
//       servicePoints,
//     });

//     stripes.updateUser({
//       curServicePoint,
//       servicePoints,
//     });
//   }

//   // show the "change service point modal" when
//   // 1. the CHANGE_SERVICE_POINT event fires (duh)
//   // 2. on login if the user has SPs but not a current SP
//   if (event === coreEvents.CHANGE_SERVICE_POINT ||
//     (event === coreEvents.LOGIN && !curServicePoint && servicePoints.length)) {
//     return ChangeServicePoint;
//   }

//   // changing apps when
//   if (event === coreEvents.SELECT_MODULE &&
//     !curServicePoint &&
//     data.name && data.name.match(/checkin|checkout|requests/)) {
//     return AccessModal;
//   }

//   return null;
// };
