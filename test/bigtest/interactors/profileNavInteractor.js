import { interactor, clickable } from '@bigtest/interactor';

@interactor class ProfileNavInteractor {
  static defaultScope = ('[data-test-nav-list-section]');

  clickOnSwitchServicePointBtn = clickable('#service-points-clickable-menuItem0');
  nav = clickable('#service-points-clickable-menuItem0');
}

export default ProfileNavInteractor;
