import {
  interactor,
  clickable,
  isPresent,
} from '@bigtest/interactor';


@interactor
class AccessModalInteractor {
    present = isPresent('[data-test-access-modal]');
    clickClose = clickable('[data-test-access-modal-close]');
}

export default AccessModalInteractor;
