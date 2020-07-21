import { describe, it, beforeEach } from '@bigtest/mocha';
import { expect } from 'chai';

import React, { Component } from 'react';

import setupApplication from '../helpers/setup-core-application';
import AppInteractor from '../interactors/app';
import AccessModalInteractor from '../interactors/accessModal';

describe('Nav', () => {
  const app = new AppInteractor();
  const modal = new AccessModalInteractor();

  class RequestsApp extends Component {
    render() {
      return (<h1>Hello Stripes!</h1>);
    }
  }

  setupApplication({
    modules: [{
      type: 'app',
      name: '@folio/requests',
      displayName: 'requests.title',
      route: '/requests',
      hasSettings: true,
      module: RequestsApp
    }],
    translations: {
      'requests.title': 'Requests'
    }
  });

  it('shows a requests app button', () => {
    expect(app.nav('Requests').isPresent).to.be.true;
  });
  it('modal not showing', () => {
    expect(modal.present).to.be.false;
  });

  describe('clicking the requests app', () => {
    beforeEach(async () => {
      await app.nav('Requests').click();
    });

    it('navigates to the requests route', function () {
      expect(this.location.pathname).to.equal('/requests');
    });

    it('access modal showing', function () {
      expect(modal.present).to.be.true;
    });



    describe('clicking the modal close button', () => {
      beforeEach(async () => {
        await modal.clickClose();
      });

      it('access modal closed', function () {
        expect(modal.present).to.be.false;
      });


    });
  });
});
