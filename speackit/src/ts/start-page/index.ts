import createDomElem from '../common';

export default function createStartPage(callback: () => void): HTMLElement {
  const tittle = 'speakit';
  const subTittle = [
    'Click on the words to hear them sound.',
    document.createElement('br'),
    'Click on the button and speak the words into the microphone.',
  ];
  const btn = 'Start';
  const startPageTitle = createDomElem('h1', ['start-page__title'], [tittle.toUpperCase()]);
  const startPageSubTitle = createDomElem('p', ['start-page__subtitle'], [...subTittle]);
  const startPageBtn = createDomElem('button', ['start-page__btn'], [btn]);
  const startPage = createDomElem(
    'div', ['start-page'], [startPageTitle, startPageSubTitle, startPageBtn],
  );
  function toContent() {
    callback();
    startPageBtn.removeEventListener('click', toContent);
    startPage.remove();
  }
  startPageBtn.addEventListener('click', toContent);
  return startPage;
}
