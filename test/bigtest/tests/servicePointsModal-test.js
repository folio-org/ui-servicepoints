import { describe, it, beforeEach } from '@bigtest/mocha';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import setupApplication from '../helpers/setup-core-application';
import ServicePointsModalInteractor from '../interactors/servicePointsModal';
import ServicePoints from '../../../src/index';



describe('Service Point Modal Test', () => {
  const modal = new ServicePointsModalInteractor();
  class DummyApp extends Component {
    static propTypes = {
      stripes: PropTypes.object,
    };

    render() {
      return (<ServicePoints stripes={this.props.stripes} />);
    }
  }

  setupApplication({
    modules: [{
      type: 'app',
      name: '@folio/dummy',
      displayName: 'dummy.title',
      route: '/dummy',
      hasSettings: true,
      module: DummyApp
    }],
    translations: {
      'dummy.title': 'Dummy App'
    },
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
        name : 'Circ Desk 3',
        code : 'cd3',
        discoveryDisplayName : 'Circulation Desk -- Front Entrance',
      }]
    },
  });

  // visiting the servicepoints module will automatically pop-up the select service points module.

  beforeEach(async function () {
    this.visit('/dummy');
  });
  it('servicepoint menu is showing', () => {
    expect(modal.visible).to.equal(true);
  });

  it('has a primary button, indicating a pre-set default servicepoint', () => {
    expect(modal.buttons.presentDefault).to.equal(true);
  });
  it('has two secondary buttons', () => {
    expect(modal.buttons.changeServicePoint().length).to.be.equal(2);
  });
  describe('clicking on one of the non-primary buttons', () => {
    beforeEach(async () => {
      await modal.buttons.changeServicePoint(0).click();
    });
    it('Modal should vanish when a button is clicked', () => {
      expect(modal.present).to.equal(false);
    });
  });
});
