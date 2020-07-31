import {
  interactor,
  collection,
  clickable,
} from '@bigtest/interactor';

const navSelector = '[class^="navRoot---"]';

@interactor class AppInteractor {
  nav = collection(title => `${navSelector} a[aria-label="${title}"]`);
  clickOnMenuDropdown = clickable('#profileDropdown');
}

export default AppInteractor;
