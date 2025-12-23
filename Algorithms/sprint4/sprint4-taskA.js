// ID успешной посылки 96288928

/*
-- ПРИНЦИП РАБОТЫ --

В программе создается поисковый индекс для документов. После этого программа высчитывает и выводит пять наиболее релевантных для каждого запроса документов (порядковые номера этих документов (1,2,3 и т.д.)) в порядке убывания релевантности. Для вычисления релевантности документа считаем сколько раз каждое уникальное слово из запроса встречается в документе. И потом складываем полученные значения.

С помощью функции createHashTable создаем хеш-таблицу, где по ключу слово храним массив значений. Индексом в массиве является порядковый номер документа в программе (первый элемент всегда пустой, т.к. документы считаем с первого). Значение по индексу - номеру документа - сколько раз текущее слово встречается в этом документе.

Далее для каждого из запросов мы находим релефантные документы с помощью функции checkQuery. В этой функции мы с помощью Set-а получаем уникаьлные слова из запроса. Затем для каждого из слов получаем массив релевантных документов с количествами вхождений слова в каждый из документов. Складываем количества вхождений слов для каждого из документов и сохраняем результат в массиве unsortedResults. Далее сортируем результаты в порядке убывания релевантности. И формируем результирующую строку из номеров документов

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Создание поискового индекса осуществляется со сложностью O(n**2).
Функция проверки запроса checkQuery также имеет сложность O(n**2). Но так как она выполняется для каждого запроса (запросов может быть несколько), итоговая сложность программы составляет O(n**3)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для создания хеш-таблицы программа использует O(n**2) дополнительной памяти, т.к. кадому слову соответствует массив релевантных документов
Для поиска релевантных запросу документов используется O(n) дополнительной памяти
*/

const _readline = require('readline')

const _reader = _readline.createInterface({
  input: process.stdin,
})

const _inputLines = []

_reader.on('line', (line) => {
  _inputLines.push(line)
})

process.stdin.on('end', solve)

const createHashTable = (docs) => {
  const wordsTable = {}

  docs.forEach((doc, index) => {
    const words = doc.split(' ')

    words.forEach((word) => {
      if (!wordsTable[word]) {
        wordsTable[word] = []
      }

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
