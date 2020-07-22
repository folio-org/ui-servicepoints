import { describe, it, beforeEach } from '@bigtest/mocha';
import { expect } from 'chai';
import setupApplication from '../helpers/setup-core-application';
import ProfileInteractor from '../interactors/app';
import ServicePointsModalInteractor from '../interactors/servicePointsModal';

describe('Nav', () => {
  const app = new ProfileInteractor();
  const modal = new ServicePointsModalInteractor();

  setupApplication({
    currentUser: {
      curServicePoint: { id: '1', name: 'Online' },
      servicePoints:[{
        id : '1',
        name : 'Online',
        code : 'Online',
        discoveryDisplayName : 'Online',
      }, {
        id : '2',
        name : 'Circ Desk 2',
        code : 'cd2',
        discoveryDisplayName : 'Circulation Desk -- Back Entrance',
      }, {
        id : '3',
        name : 'Circ Desk 1',
        code : 'cd1',
        discoveryDisplayName : 'Circulation Desk -- Hallway',
      }]
    },
  });


  it('service points modal is closed', function () {
    expect(modal.present).to.be.false;
  });
  it('profile button present', function () {
    expect(app.present).to.be.true;
  });

  describe('clicking the switch service points menu option', () => {
    beforeEach(async () => {
      await app.nav();
    });

    it('service points modal showing', function () {
      expect(modal.present).to.be.true;
    });
  });
});
