const generateItems = (size) => {
  const items = new Set();

  for (let i = 1; i <= size; i++) {
    items.add(i);
  }

  return items;
}

const generateGrid = (rows, cells) => {
  const result = [];

  for (let i = 0; i < rows; i++) {
    result[i] = [...Array(cells).fill(null)]
  }

  return result;
}

const getRandomNumber = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getTwoRandomNumbers = (min, max) => {
  const randomNumbers = new Set();

  while (randomNumbers.size !== 2) {
    randomNumbers.add(getRandomNumber(min, max))
  }

  return Array.from(randomNumbers);
}

const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const generateRandomGrid = (rows = 4, cells = 4) => {
  const items = generateItems(rows * cells / 2);
  const grid = generateGrid(rows, cells);
  let emptyCells = grid.reduce((rowsAcc, row, rowIndex) => {
    const cellIndexes = row.reduce((cellAcc, cell, cellIndex) => {
      cellAcc.push({
        cellIndex,
        rowIndex
      })

      return cellAcc
    }, [])

    rowsAcc = [...rowsAcc, ...cellIndexes];

    return rowsAcc;
  }, [])

  emptyCells = shuffle(emptyCells);

  emptyCells.forEach(({ cellIndex, rowIndex }, index) => {
    const item = Array.from(items)[0];

    grid[rowIndex][cellIndex] = item;

    if ((index + 1) % 2 === 0) {
      items.delete(item);
    }
  })

  return grid;
};

console.log(generateRandomGrid(4, 5))