import createDomElem, { createAudio } from '../common';
// eslint-disable-next-line no-unused-vars
import { WordsData } from '../get-words';

const AMOUNT_WORDS = 10;

function createWordCards(data: WordsData): HTMLElement {
  const {
    word, transcription, audio,
  } = data;
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 40px;">'
    + '<path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 '
    + '4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 '
    + '5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
  const wordIcon = createDomElem('p', ['word__item-icon']);
  wordIcon.innerHTML = icon;
  const wordSelect = createDomElem('div', ['word__item-select']);
  wordSelect.setAttribute('data-word', word);
  const wordTitle = createDomElem('p', ['word__item-title'], [word]);
  const wordTranscription = createDomElem('p', ['word__item-transcription'], [transcription]);
  const wordAudio = createAudio(audio, word, 'word__item-audio', 'word__item-source');
  return createDomElem('div', ['word__item'], [wordSelect, wordTitle, wordTranscription, wordIcon, wordAudio]);
}

export function createWordsSet(data: WordsData[]) {
  const newData = data;
  newData.length = AMOUNT_WORDS;
  const wordsSet = newData.map((elem) => createWordCards(elem));
  return createDomElem('div', ['word__list'], wordsSet);
}

function createWords(data: WordsData[]): HTMLElement {
  const wordList = createWordsSet(data);
  return createDomElem('div', ['words'], [wordList]);
}

export default createWords;
