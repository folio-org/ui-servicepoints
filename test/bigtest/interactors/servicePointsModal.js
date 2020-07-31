import {
  interactor,
  clickable,
  isPresent,
  isVisible,
  collection,
} from '@bigtest/interactor';

@interactor
class SelectServicePointInteractor {
  static defaultScope = ('[data-test-servicepoints-modal]');

  // are there at least two servicepoints to select from?
  presentDefault = isPresent('button[class*="primary"]');
  changeServicePoint = collection('button[class*="default"]');
  close = clickable('button[aria-label="Dismiss modal"]');
}

@interactor
class ServicePointsModalInteractor {
  present = isPresent('[data-test-servicepoints-modal]');
  visible = isVisible('[data-test-servicepoints-modal]')

  // if the modal is present, proceed with next stage of the test
  buttons = new SelectServicePointInteractor();
}

export default ServicePointsModalInteractor;

