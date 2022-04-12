
// Generate a random integer up to (not including) max
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array
}

export {
  shuffle,
  getRandomInt
}
