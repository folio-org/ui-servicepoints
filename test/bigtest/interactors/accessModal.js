import {
  interactor,
  clickable,
  isPresent,
} from '@bigtest/interactor';


@interactor
class AccessModalInteractor {
    static defaultScope = 'body';
    present = isPresent('[data-test-access-modal]');
    clickClose = clickable('button');
}

export default AccessModalInteractor;
