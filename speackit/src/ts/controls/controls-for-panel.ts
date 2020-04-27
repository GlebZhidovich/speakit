import createDomElem, {
  setWordsSet, getPageStatus, setPageStatus, getWordsSet,
} from '../common';
import createWordsSet from '../content-page/content';
import getWords from '../get-words';
import { setWordsControls, removeWordsControls } from './controls-words';
import showResult from '../content-page/statistic-page';

const PAGE = 3;
let recognition = null;
let points = 0;
let answered = [];
let mistakes = 0;

export function getMistakes(): number {
  return mistakes;
}

export function setMistakes(num: number) {
  mistakes = num;
}

export function getAnswered(): string[] {
  return answered;
}

export function setAnswered(val: []): void {
  answered = val;
}

function cleanCards(): void {
  const cards = document.querySelectorAll('.word__item');
  cards.forEach((elem) => {
    if (elem.classList.contains('selected')) {
      elem.classList.remove('selected');
    }
  });
}

export function addPoints(num?: number): void {
  const domPoints = document.querySelector('.content-image__points');
  if (num === 0) {
    points = num;
  } else {
    points += 1;
  }
  domPoints.innerHTML = `Points: ${points}`;
}

function compareAnswers(word: string): void {
  if (answered.includes(word)) {
    return;
  }
  const titles = document.querySelectorAll('.word__item-title');
  const compare = Array.from(titles).find((elem): boolean => elem.textContent === word);
  if (compare) {
    const parent = compare.parentNode;
    (parent as HTMLElement).classList.add('selected');
    answered.push(word);
    addPoints();
    if (answered.length === 10) {
      const { body } = document;
      body.append(showResult(getWordsSet()));
    }
  } else {
    mistakes += 1;
  }
}

type Actions = {
  wordSet: (num: number, elem: HTMLElement) => void,
  speak: () => void,
  restart: () => void,
  result: () => void,
}

const actions: Actions = {
  async wordSet(num: number, elem: HTMLElement): Promise<void> {
    if (getPageStatus() !== num) {
      setPageStatus(num);
      const controlsPanel = document.querySelector('.controls-panel');
      const selected = controlsPanel.querySelector('.selected');
      selected.classList.toggle('selected');
      elem.classList.toggle('selected');
      const words = document.querySelector('.words');
      const loader = createDomElem('div', ['loader']);
      words.innerHTML = '';
      words.append(loader);
      const dataWords = await getWords(PAGE, num);
      setWordsSet(dataWords);
      const wordSet = createWordsSet(dataWords);
      loader.remove();
      words.append(wordSet);
    }
  },
  speak(): void {
    if (!recognition) {
      removeWordsControls();
      cleanCards();
      const title = document.querySelector('.content-image__img-title');
      title.innerHTML = '';
      // @ts-ignore
      // eslint-disable-next-line no-undef,no-use-before-define
      const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.interimResults = false;
      recognition.lang = 'en=EN';
      recognition.continuous = false;
      recognition.addEventListener('result', (e) => {
        const output = document.querySelector('.content-image__img-input');
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        compareAnswers(transcript);
        output.innerHTML = '';
        output.innerHTML = transcript;
      });
      recognition.addEventListener('end', recognition.start);
      recognition.start();
    }
  },
  restart(): void {
    if (recognition) {
      answered = [];
      mistakes = 0;
      addPoints(0);
      cleanCards();
      setWordsControls();
      const output = document.querySelector('.content-image__img-input');
      output.innerHTML = '';
      recognition.removeEventListener('end', recognition.start);
      recognition.abort();
      recognition = null;
    }
  },
  result(): void {
    const { body } = document;
    body.append(showResult(getWordsSet()));
  },
};

export function getActions(): Actions {
  return actions;
}

function activeAction(e: MouseEvent): void {
  const keys = Object.keys((e.target as HTMLElement).dataset);
  if (keys.length > 0) {
    const wordDifNum = (e.target as HTMLElement).dataset.wordSet;
    const { action } = (e.target as HTMLElement).dataset;
    if (wordDifNum) {
      actions.wordSet(parseInt(wordDifNum, 10), (e.target as HTMLElement));
    }
    if (actions[action]) {
      actions[action]();
    }
  }
}

function setControlsForPanel() {
  const controlsPanel = document.querySelector('.controls-panel');
  controlsPanel.addEventListener('click', activeAction);
}

export default setControlsForPanel;
