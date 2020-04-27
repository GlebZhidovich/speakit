// eslint-disable-next-line no-unused-vars
import { WordsData } from './get-words';

let pageStatus = 0;
let wordsSet: WordsData[];

export function setWordsSet(data: WordsData[]): void {
  wordsSet = data;
}

export function getWordsSet(): WordsData[] {
  return wordsSet;
}

export function getPageStatus(): number {
  return pageStatus;
}

export function setPageStatus(num: number): void {
  pageStatus = num;
}

export default function createDomElem(
  tag: string, className: string[], content?: Array<string | HTMLElement>,
): HTMLElement {
  const elem = document.createElement(tag);
  elem.classList.add(...className);
  if (content) elem.append(...content);
  return elem;
}

export function createAudio(
  src: string, audioName: string, audioClass: string, sourceClass: string,
): HTMLAudioElement {
  const [
    cardAudio,
    cardAudioSource,
  ] = [
    createDomElem('audio', [audioClass]),
    createDomElem('source', [sourceClass]),
  ];
  cardAudioSource.setAttribute('src', src);
  cardAudioSource.setAttribute('type', 'audio/mpeg');
  cardAudio.setAttribute('data-name', audioName);
  cardAudio.append(cardAudioSource, 'Your browser does not support the audio element.');
  return <HTMLAudioElement>cardAudio;
}
