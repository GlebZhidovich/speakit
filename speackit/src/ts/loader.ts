import createDomElem from './common';

export default function createLoader(): HTMLElement {
  const loader = createDomElem('div', ['loader']);
  return createDomElem('div', ['loader__wrap'], [loader]);
}
