import createDomElem from '../common';
import createControlsPanel from './controls-panel';
import createContentImage from './content-image';
import createWords from './content';
// eslint-disable-next-line no-unused-vars
import { WordsData } from '../get-words';

export default function createContentPage(data: WordsData[]): HTMLElement {
  return createDomElem(
    'div', ['content-page'], [createControlsPanel(), createContentImage(), createWords(data)],
  );
}
