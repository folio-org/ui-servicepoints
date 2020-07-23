import { describe, it, beforeEach } from '@bigtest/mocha';
import { expect } from 'chai';
import setupApplication from '../helpers/setup-core-application';
import AppInteractor from '../interactors/app';
import ServicePointsModalInteractor from '../interactors/servicePointsModal';

describe('ServicePointsModal', () => {
  const app = new AppInteractor();
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

  describe('clicking on nav menu btn', () => {
    beforeEach(async () => {
      await app.clickOnMenuDropdown();
    });

    it('profile button present', function () {
      expect(app.profileNav.isPresent).to.be.true;
    });

    describe('clicking the switch service points menu option', () => {
      beforeEach(async () => {
        await app.profileNav.clickOnSwitchServicePointBtn();
      });

      it('service points modal showing', function () {
        expect(modal.present).to.be.true;
      });
    });
  });
});
