import { interactor, collection } from '@bigtest/interactor';

const navSelector = '[class^="navRoot---"]';

@interactor class AppInteractor {
  nav = collection(title => `${navSelector} a[aria-label="${title}"]`);
}

export default AppInteractor;
