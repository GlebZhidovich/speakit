import createDomElem from '../common';

export function createContent(): HTMLElement {
  const contentImg = createDomElem('img', ['content-image__img']);
  contentImg.setAttribute('src', '/assets/img/start-pic.jpg');
  const contentPoints = createDomElem('p', ['content-image__points'], ['Points: 0']);
  const contentImgTitle = createDomElem('p', ['content-image__img-title']);
  const contentImgInput = createDomElem('p', ['content-image__img-input']);
  return createDomElem('div', ['content-image__wrap'], [contentPoints, contentImg, contentImgTitle, contentImgInput]);
}

export default function createContentImage(): HTMLElement {
  return createDomElem('div', ['content-image'], [createContent()]);
}
