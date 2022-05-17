import { wordTypes } from "./wordtypes";

export default function createPhrase(useCase) {
useCase = useCase.toLowerCase();
let structureElements = chooseStructure(useCase)
  let phrase = ""
  let wordcounter = 0
  for (let wordTypeCounter in structureElements) {
    let wordTypeForWord = structureElements[wordTypeCounter];
    let possibleWords = wordTypes[wordTypeForWord]
    let randomNumForWord = Math.floor(Math.random() * possibleWords.length);
    let word = possibleWords[randomNumForWord]
    if (wordcounter == 0) {
      phrase += word
    } else {
      phrase += "" + word.toLowerCase()
    }
    wordcounter++
  }
  return phrase;
}

function chooseStructure(useCase){
  let structures;
  
  switch (useCase) {
    case "playlist":
      structures = playlistNameStructures
      break;
    case "persona":
      structures = personaNameStructures
      break;
  }

  let randomStructureNum = Math.floor(Math.random() * structures.length);
  let structure = structures[randomStructureNum]
  let structureElements = structure.split(" ");
  return structureElements
}



const playlistNameStructures = [
  "noun connector noun",
  "adjective noun",
  "noun connector adjective",
  "adjective connector adjective"
]



const personaNameStructures = [
  "noun"
]

