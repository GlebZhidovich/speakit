import { getWordsSet } from '../common';

let curElem: HTMLElement;

function selectWord(e: MouseEvent): void {
  if ((e.target as HTMLElement).dataset.word) {
    if (curElem) {
      curElem.classList.toggle('selected');
    }
    const imgTitle = document.querySelector('.content-image__img-title');
    const img = document.querySelector('.content-image__img');
    const { word } = (e.target as HTMLElement).dataset;
    const parent = (e.target as HTMLElement).parentNode;
    curElem = (parent as HTMLElement);
    (parent as HTMLElement).classList.toggle('selected');
    const audio: HTMLAudioElement = parent.querySelector('.word__item-audio');
    const data = getWordsSet().find((elem) => elem.word === word);
    const { image, translation } = data;
    audio.play();
    imgTitle.innerHTML = translation;
    img.setAttribute('src', image);
  }
}

export function setWordsControls(): void {
  const words = document.querySelector('.words');
  words.addEventListener('click', selectWord);
}

export function removeWordsControls(): void {
  const words = document.querySelector('.words');
  words.removeEventListener('click', selectWord);
}

export default setWordsControls;
