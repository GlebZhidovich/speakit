export interface WordsData {
  'word': string,
  'image': string,
  'audio': string,
  'audioMeaning': string,
  'audioExample': string,
  'textMeaning': string,
  'textExample': string,
  'transcription': string
  'wordTranslate': string
}

function formatData(data: WordsData[]): WordsData[] {
  return data.map((elem): WordsData => {
    const newElem = elem;
    const { image, audio } = newElem;
    newElem.image = image.replace('files', '/assets/img');
    newElem.audio = audio.replace('files', '/assets/audio');
    return elem;
  });
}

const getWords = async (page, group): Promise<WordsData[] | string> => {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      return formatData(json);
    }
    throw new Error(`${res.status}`);
  } catch (e) {
    return e.toString();
  }
};

export default getWords;
