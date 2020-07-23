import {
  interactor,
  collection,
  clickable,
} from '@bigtest/interactor';

import ProfileNavInteractor from './profileNavInteractor';

const navSelector = '[class^="navRoot---"]';

@interactor class AppInteractor {
  nav = collection(title => `${navSelector} a[aria-label="${title}"]`);
  clickOnMenuDropdown = clickable('#profileDropdown');

  profileNav = new ProfileNavInteractor();
}

export default AppInteractor;
