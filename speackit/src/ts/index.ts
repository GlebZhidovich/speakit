import createStartPage from './start-page/index';
import createContentPage from './content-page/index';
import createLoader from './loader';
import getWords from './get-words';
import { setWordsSet, getWordsSet, getPageStatus } from './common';
import activeControls from './controls/index';

const PAGE = 3;

async function loadContent(): Promise<void> {
  const { body } = document;
  const loader = createLoader();
  body.append(loader);
  const data = await getWords(PAGE, getPageStatus());
  setWordsSet(data);
  const contentPage = createContentPage(getWordsSet());
  loader.remove();
  body.append(contentPage);
  activeControls();
}

async function ready() {
  const { body } = document;
  body.append(createStartPage(loadContent));
}

document.addEventListener('DOMContentLoaded', loadContent);
