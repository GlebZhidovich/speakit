import createDomElem from '../common';

function createControl(index: number): HTMLElement {
  const control = createDomElem('ul', ['controls-panel__item']);
  if (index === 0) control.classList.add('selected');
  control.setAttribute('data-word-set', `${index}`);
  return control;
}

function createAppControl(): HTMLElement[] {
  return ['restart', 'speak', 'result'].map((str) => {
    const control = createDomElem('button', ['controls-panel__item-app'], [str.toUpperCase()]);
    control.setAttribute('data-action', str);
    return control;
  });
}

export default function createControlsPanel(): HTMLElement {
  const controlsList = [0, 1, 2, 3, 4, 5].map((num) => createControl(num));
  const controls = createDomElem('ul', ['controls-panel__list'], controlsList);
  const controlsApp = createDomElem('div', ['controls-panel__list'], createAppControl());
  return createDomElem('div', ['controls-panel'], [controls, controlsApp]);
}
