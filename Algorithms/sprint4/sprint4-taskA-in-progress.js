// const _readline = require('readline')

// const _reader = _readline.createInterface({
//   input: process.stdin,
// })

// const _inputLines = []

// _reader.on('line', (line) => {
//   _inputLines.push(line)
// })

// process.stdin.on('end', solve)

const _inputLines2 = [
  '3',
  'i love coffee',
  'coffee with milk and sugar',
  'free tea for everyone',
  '3',
  'i like black coffee without milk',
  'everyone loves new year',
  'mary likes black coffee without milk',
]

// 1 2
// 3
// 2 1

const _inputLines1 = [
  '3',
  'i like dfs and bfs',
  'i like dfs dfs',
  'i like bfs with bfs and bfs',
  '1',
  'dfs dfs dfs dfs bfs',
]
// 3 1 2

const _inputLines = [
  '6',
  'buy flat in moscow',
  'rent flat in moscow',
  'sell flat in moscow',
  'want flat in moscow like crazy',
  'clean flat in moscow on weekends',
  'renovate flat in moscow',
  '1',
  'flat in moscow for crazy weekends',
]
// 4 5 1 2 3

const createHashTable = (docs) => {
  const wordsTable = {}

  docs.forEach((doc, index) => {
    const words = doc.split(' ')

    words.forEach((word) => {
      // Если слово встретилось первый раз
      if (!wordsTable[word]) {
        wordsTable[word] = []
      }

      // Если в текущем документе слово еще не встречалось
      if (!wordsTable[word][index + 1]) {
        wordsTable[word][index + 1] = 0
      }

      wordsTable[word][index + 1]++
    })
  })

  return wordsTable
}

const checkQuery = (query, table) => {
  const words = new Set(query.split(' '))
  const unsortedResults = []

  words.forEach((word) => {
    const relevanceArr = table[word]

    if (!relevanceArr) {
      return
    }

    relevanceArr.forEach((el, index) => {
      if (!unsortedResults[index]) unsortedResults[index] = 0

      unsortedResults[index] += el
    })
  })

  const sortedResults = Object.entries(unsortedResults).sort((a, b) => b[1] - a[1])

  let response = []

  for (let i = 0; i < sortedResults.length && i < 5; i++) {
    if (sortedResults[i]) {
      response.push(sortedResults[i][0])
    }
  }

  console.log(response.join(' '))
}

function solve() {
  const numOfDocs = Number(_inputLines[0])

  const docs = _inputLines.slice(1, numOfDocs + 1)
  const queries = _inputLines.slice(numOfDocs + 2)

  const table = createHashTable(docs)

  queries.forEach((query) => {
    checkQuery(query, table)
  })
}

solve()
