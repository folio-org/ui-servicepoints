import { describe, it, beforeEach } from '@bigtest/mocha';
import { expect } from 'chai';

import React, { Component } from 'react';

import setupApplication from '../helpers/setup-core-application';
import AppInteractor from '../interactors/app';

describe('Nav', () => {
  const app = new AppInteractor();

  class RequestsApp extends Component {
    render() {
      return (<h1>Hello Stripes!</h1>);
    }
  }

  setupApplication({
    modules: [{
      type: 'app',
      name: '@folio/Requests',
      displayName: 'requests.title',
      route: '/requests',
      hasSettings: true,
      module: RequestsApp
    }],
    translations: {
      'requests.title': 'Requests'
    }
  });

  it('shows a settings button', () => {
    expect(app.nav('Settings').isPresent).to.be.true;
  });

  it('shows a requests app button', () => {
    expect(app.nav('Requests').isPresent).to.be.true;
  });

  describe('clicking settings', () => {
    beforeEach(async () => {
      await app.nav('Settings').click();
    });

    it('navigates to /settings', function () {
      expect(this.location.pathname).to.equal('/settings');
    });
  });

  describe('clicking the requests app', () => {
    beforeEach(async () => {
      await app.nav('Requests').click();
    });

    it('navigates to the requests route', function () {
      expect(this.location.pathname).to.equal('/requests');
    });
  });
});
