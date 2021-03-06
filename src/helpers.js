/*******************
[]=>[][]
Given a unidimentional array and optional parameters
(like criteria, or shape, in order to stablish the way that elements will be arrange in a bidimentional way)
default behaviour will be a convertion to square if posible or a rectangule-like figure in a mobile first approach
*/

export function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export const toGrid = unidimentionalArray => {
  let rootOfLength = Math.floor(Math.sqrt(unidimentionalArray.length));
  let bidimentionalArray = [];
  unidimentionalArray.map((el, index) => {
    let remainder = index % rootOfLength;
    let row = (index - remainder) / rootOfLength;
    if (!bidimentionalArray[row]) {
      bidimentionalArray[row] = [];
    }
    bidimentionalArray[row][remainder] = el;
    return null;
  });
  return bidimentionalArray;
};
