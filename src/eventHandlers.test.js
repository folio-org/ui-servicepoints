import { coreEvents } from '@folio/stripes/core';

import AccessModal from './AccessModal';
import ChangeServicePoint from './ChangeServicePoint';
import {
  handleCheckServicePoints,
  handleEvent,
  servicePointIsRequired
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

describe('servicePointIsRequired', () => {
  describe('returns true for legacy applications', () => {
    it('checkin', () => {
      expect(servicePointIsRequired({}, { name: 'checkin' })).toBe(true);
    });

    it('checkout', () => {
      expect(servicePointIsRequired({}, { name: 'checkout' })).toBe(true);
    });

    it('requests', () => {
      expect(servicePointIsRequired({}, { name: 'requests' })).toBe(true);
    });
  });

  it('returns true for applications of type "servicepointsConsumer"', () => {
    const stripes = {
      modules: {
        servicepointsConsumer: [{ module: 'foo' }]
      }
    };
    const data = { module: 'foo' };
    expect(servicePointIsRequired(stripes, data)).toBe(true);
  });

  it('returns false for applications without type "servicepointsConsumer"', () => {
    const stripes = {
      modules: {
        servicepointsConsumer: [{ module: 'foo' }]
      }
    };
    const data = { module: 'bar' };
    expect(servicePointIsRequired(stripes, data)).toBe(true);
  });
});
