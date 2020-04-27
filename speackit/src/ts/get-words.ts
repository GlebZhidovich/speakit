const yApiKey = 'trnsl.1.1.20200426T175308Z.6d0543c65f2388ba.ce1be9f7ff5441d99a28cd7388ab7fa4778f9747';

export interface WordsData {
  'word': string,
  'image': string,
  'audio': string,
  'audioMeaning': string,
  'audioExample': string,
  'textMeaning': string,
  'textExample': string,
  'transcription': string
  'translation'?: string
}

async function getTranslation(word: string): Promise<string> {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yApiKey}&text= ${word} &lang=en-ru`;
  const res = await fetch(url);
  const data = await res.json();
  const [translation] = data.text;
  return translation.trim();
}

async function formatData(data: WordsData[]): Promise<WordsData[]> {
  const newData = await Promise.all(
    data.map(async (elem): Promise<WordsData> => {
      const newElem = elem;
      const { image, audio, word } = newElem;
      newElem.translation = await getTranslation(word);
      newElem.image = image.replace('files', '/speakit/assets/img');
      newElem.audio = audio.replace('files', '/speakit/assets/audio');
      return elem;
    }),
  );
  return newData;
}

const getWords = async (page, group): Promise<WordsData[]> => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const res = await fetch(url);
  const json = await res.json();
  const data = await formatData(json);
  return data;
};

export default getWords;
