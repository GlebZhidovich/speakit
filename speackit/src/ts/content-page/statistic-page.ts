import createDomElem, { createAudio, getWordsSet } from '../common';
// eslint-disable-next-line no-unused-vars
import { WordsData } from '../get-words';
import {
  getAnswered, getMistakes, addPoints, setAnswered, setMistakes, getActions,
} from '../controls/controls-for-panel';
import { createContent } from './content-image';
import { createWordsSet } from './content';

function wordRow(data: WordsData): HTMLElement {
  const {
    word, translation, transcription, audio,
  } = data;
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 20px;">'
    + '<path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 '
    + '4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 '
    + '5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
  const selectElem = createDomElem('div', ['result__select']);
  selectElem.setAttribute('data-word', word);
  const iconElem = createDomElem('span', ['result__icon']);
  const wordElem = createDomElem('span', ['result__word'], [word]);
  const tranSlationElem = createDomElem('span', ['result__translation'], [translation]);
  const transcriptionElem = createDomElem('span', ['result__transcription'], [transcription]);
  const audioElem = createAudio(audio, word, 'result__audio', 'result__source');
  iconElem.innerHTML = icon;
  return createDomElem('div', ['result__row'], [iconElem, selectElem, wordElem, transcriptionElem, tranSlationElem, audioElem]);
}

function activeSound(e) {
  if ((e.target as HTMLElement).dataset.word) {
    const parent = (e.target as HTMLElement).parentNode;
    const resultAudio = parent.querySelector('.result__audio');
    (resultAudio as HTMLAudioElement).play();
  }
}

function showResult(data: WordsData[]): HTMLElement {
  const mistakes = createDomElem('p', ['result__mistakes'], [`Mistakes: ${getMistakes()}`]);
  const valid = createDomElem('p', ['result__valid'], [`Valid: ${getAnswered().length}`]);
  const newGameBtn = createDomElem('button', ['result__btn'], ['New Game']);
  const returnBtn = createDomElem('button', ['result__btn'], ['Return']);
  const wordsSet = data.map((elem) => wordRow(elem));
  wordsSet.unshift(valid, mistakes);
  wordsSet.push(newGameBtn, returnBtn);
  const resultWrap = createDomElem('div', ['result__wrap'], wordsSet);
  const result = createDomElem('div', ['result'], [resultWrap]);
  function returnToContent() {
    result.remove();
    returnBtn.removeEventListener('click', returnToContent);
  }
  function newGame() {
    getActions().restart();
    setMistakes(0);
    setAnswered([]);
    addPoints(0);
    const words = document.querySelector('.words');
    words.innerHTML = '';
    words.append(createWordsSet(getWordsSet()));
    const contentImage = document.querySelector('.content-image');
    const imgContent = createContent();
    contentImage.innerHTML = '';
    contentImage.append(imgContent);
    result.remove();
    returnBtn.removeEventListener('click', returnToContent);
  }
  result.addEventListener('click', activeSound);
  returnBtn.addEventListener('click', returnToContent);
  newGameBtn.addEventListener('click', newGame);
  return result;
}

export default showResult;
