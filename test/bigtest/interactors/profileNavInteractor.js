import { interactor, clickable, isPresent } from '@bigtest/interactor';


@interactor class ProfileInteractor {
  static defaultScope = ('[data-test-nav-list-section]');
  present = clickable('#service-points-clickable-menuItem0');
  nav = clickable('#service-points-clickable-menuItem0');
}

export default ProfileInteractor;
