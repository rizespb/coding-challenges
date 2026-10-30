'use strict';

// ------------------------------------------------
// ------------------- Задача 1 -------------------
// ------------------------------------------------

//  Написать функцию poolRequests, которая принимает массив таких функций-задач и числовой лимит — максимальное количество одновременно выполняющихся запросов. Как только один из запросов завершается (успешно или с ошибкой), функция должна сразу же запускать следующий из очереди, пока не выполнятся все.

// Требования:

// 1. Функция должна возвращать Promise, который резолвится массивом результатов в том же порядке, в котором шли исходные функции (как в Promise.all).
// 2. Одновременно должно выполняться не более limit запросов.
// 3. Ошибки в запросах не должны прерывать выполнение остальных задач (в итоговый массив можно складывать либо результат, либо объект ошибки, либо использовать аналог Promise.allSettled — на твой выбор, но давай для простоты складывать сам результат или объект ошибки).

/**
 * @param {Array<() => Promise<any>>} functions - Массив функций, возвращающих промисы
 * @param {number} limit - Максимальное количество одновременно активных промисов
 * @returns {Promise<Array<any>>} - Промис с результатами всех функций
 */

// --------------- Решение 1 ---------------
if (true) {
  function poolRequests(functions, limit) {
    return new Promise((resolve) => {
      let countFn = 0;

      const results = [];

      let countResults = 0;

      const handler = (result, index) => {
        results[index] = result;

        countResults++;

        if (countResults === functions.length) {
          resolve(results);
          return;
        }

        if (countFn < functions.length) {
          const index = countFn;

          functions[countFn]()
            .then((result) => handler(result, index))
            .catch((result) => handler(result, index));

          countFn++;
        }
      };

      while (countFn < limit) {
        const index = countFn;

        functions[countFn]()
          .then((result) => handler(result, index))
          .catch((result) => handler(result, index));
        countFn++;
      }
    });
  }

  // --------------- Решение 2 ---------------
  function poolRequests(functions, limit) {
    return new Promise((resolve) => {
      let countFn = 0;

      const results = [];
      let countResults = 0;

      const handler = (result, index) => {
        results[index] = result;
        countResults++;

        if (countResults === functions.length) {
          resolve(results);

          return;
        }

        if (countFn < functions.length) {
          const index = countFn;

          functions[countFn]()
            .then((result) => handler(result, index))
            .catch((result) => handler(result, index));
          countFn++;
        }
      };

      while (countFn < limit) {
        const index = countFn;

        functions[countFn]()
          .then((result) => handler(result, index))
          .catch((result) => handler(result, index));

        countFn++;
      }
    });
  }
}

// ------------------------------------------------
// ------------------- Задача 2 -------------------
// ------------------------------------------------

// Обычный debounce откладывает вызов функции, пока не пройдет delay миллисекунд «тишины». Но в реальном коде оборачиваемая функция часто является асинхронной (например, делает fetch запрос к API).

// Нужно написать debouncePromise. Это функция-обёртка, которая делает две вещи:
// 1. Задерживает выполнение целевой функции на delay мс.
// 2. Возвращает промис для каждого вызова.

// Особенность:
// Все «пропущенные» вызовы (которые случились во время спама до истечения тайм-аута) должны завершиться (зарезолвиться) тем результатом, который вернет самый последний, реально выполненный вызов.

/**
 * @param {(...args: any[]) => Promise<any>} fn - Целевая асинхронная функция
 * @param {number} delay - Время задержки в мс
 * @returns {(...args: any[]) => Promise<any>} - Дебаунс-версия функции, возвращающая промис
 */

function debouncePromise(fn, delay) {
  let timerId = null;
  const promises = [];

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const promiseWithResolvers = Promise.withResolvers();

    promises.push(promiseWithResolvers);

    timerId = setTimeout(() => {
      fn(...args)
        .then((result) => promises.forEach(({ resolve }) => resolve(result)))
        .catch((error) => promises.forEach(({ reject }) => reject(error)))
        .finally(() => (promises.length = 0));
    }, delay);

    return promiseWithResolvers.promise;
  };
}

// --- Тестовый стенд для проверки ---
const fakeFetch = async (query) => {
  console.log('Call fakeFetch arg: ', query);
  return new Promise((resolve) => setTimeout(() => resolve(`Результат для: ${query}`), 100));
};

const debouncedSearch = debouncePromise(fakeFetch, 1300);

// Пользователь быстро вводит буквы в инпут: 'j', 'ja', 'jav', 'java'
const p1 = debouncedSearch('j');
const p2 = debouncedSearch('ja');
const p3 = debouncedSearch('jav');
const p4 = debouncedSearch('java'); // Только этот вызов должен реально пойти на сервер

// Проверяем результаты
Promise.all([p1, p2, p3, p4]).then((results) => {
  console.log(results);
  // Ожидаемый вывод:
  // [
  //   'Результат для: java',
  //   'Результат для: java',
  //   'Результат для: java',
  //   'Результат для: java'
  // ]
  // При этом fakeFetch должен быть вызван ровно ОДИН раз.
});

// ------------------------------------------------
// ------------------- Задача 3 -------------------
// ------------------------------------------------

// Асинхронный синглтон-кэш с дедупликацией

// Представь, что на странице одновременно рендерится 10 разных компонентов. Каждому из них для работы нужны одни и те же данные с сервера (например, профиль текущего пользователя). Если каждый компонент вызовет функцию запроса, на сервер уйдет 10 одинаковых тяжелых запросов.

// Нужно написать функцию-обертку cacheAndDeduplicate, которая принимает асинхронную функцию (запрос к серверу) и время жизни кэша (ttl в миллисекундах).

// Она должна работать по следующим правилам:
// 1. Дедупликация
// Если запрос уже летит прямо сейчас, новые вызовы функции не должны инициировать новый запрос. Они должны «подключаться» к уже летящему промису и ждать его завершения вместе с первым вызовом.

// 2. Кэширование
// После того как запрос успешно завершился, результат сохраняется в кэш на ttl миллисекунд. Все последующие вызовы в течение этого времени должны мгновенно возвращать закэшированное значение (обернутое в промис).

// 3. Обновление: По истечении ttl кэш инвалидируется (сбрасывается), и следующий вызов должен снова пойти на сервер.

// 4. Обработка ошибок: Если запрос завершился ошибкой, она не должна кэшироваться. Текущие «подключившиеся» вызовы должны получить эту ошибку, но следующий вызов после падения должен честно попытаться сделать новый запрос к серверу.

/**
 * @param {() => Promise<any>} fn - Целевая асинхронная функция без аргументов (для простоты)
 * @param {number} ttl - Время жизни кэша в миллисекундах
 * @returns {() => Promise<any>} - Обернутая функция с кэшем и дедупликацией
 */

function cacheAndDeduplicate(fn, ttl) {
  let query = {
    status: 'initial',
    data: null,
    promise: null,
  };

  return () => {
    const { status, data, promise } = query;

    if (status === 'success') {
      return Promise.resolve(data);
    }

    if (status === 'pending') {
      return promise;
    }

    query.status = 'pending';

    const currentPromise = fn()
      .then((result) => {
        query = {
          status: 'success',
          data: result,
          promise: null,
        };

        setTimeout(() => {
          query = {
            status: 'initial',
            data: null,
            promise: null,
          };
        }, ttl);

        return result;
      })
      .catch((error) => {
        query = {
          status: 'initial',
          data: null,
          promise: null,
        };

        throw error;
      });

    query.promise = currentPromise;

    return currentPromise;
  };
}

// --- Тестовый стенд для проверки ---
let networkRequestsCount = 0;

const fetchUserData = async () => {
  networkRequestsCount++;
  return new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: 'Иван' }), 200));
};

const getProfile = cacheAndDeduplicate(fetchUserData, 1000);

// --- Сценарий 1: Дедупликация (одновременные вызовы) ---
const promise1 = getProfile();
const promise2 = getProfile();

Promise.all([promise1, promise2]).then((results) => {
  console.log('Сценарий 1 выполнен:', results[0].name === 'Иван' && results[1].name === 'Иван');
  console.log('Количество запросов в сеть (ожидается 1):', networkRequestsCount); // Вызов был один!
});

// --- Сценарий 2: Кэширование (вызов внутри TTL) ---
setTimeout(() => {
  getProfile().then((data) => {
    console.log('Сценарий 2 выполнен (из кэша):', data.name === 'Иван');
    console.log('Количество запросов в сеть (ожидается все еще 1):', networkRequestsCount);
  });
}, 500); // 500мс < 1000мс (внутри TTL)

// --- Сценарий 3: Инвалидация (вызов после TTL) ---
setTimeout(() => {
  getProfile().then((data) => {
    console.log('Сценарий 3 выполнен (новый запрос):', data.name === 'Иван');
    console.log('Количество запросов в сеть (ожидается 2):', networkRequestsCount); // Кэш протух, пошел второй запрос
  });
}, 1500); // 1500мс > 1000мс (кэш истек)

('use strict');

if (true) {
  function test() {
    console.log(1);
  }
  function test() {
    console.log(2);
  }
  // ❌ Ошибка: Uncaught SyntaxError: Identifier 'test' has already been declared
}
