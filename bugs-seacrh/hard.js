////////////////////////////////////////////////////////////////
/// ------------------------ 1 ----------------------------- ///
////////////////////////////////////////////////////////////////
import { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>

      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}

///////////// ------- Решение ------- //////////////
import { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <h1>{number}</h1>

      <button
        onClick={() => {
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
          setNumber((prev) => prev + 1);
        }}
      >
        Increment
      </button>
    </>
  );
}

// Вы можете ожидать, что нажатие кнопки увеличит состояние числа на 3, но это не так. Короче говоря, JavaScript создает замыкание вокруг переменных числа, так что это как если бы мы делали setNumber(0 + 1) три раза. Вместо этого, если мы хотим обновить одно и то же состояние несколько раз до следующего рендеринга, мы можем передать функцию в нашу функцию установки. Теперь React добавит все эти функции в очередь, и во время следующего рендеринга React пройдет через очередь, передавая результат из предыдущего элемента очереди следующему, в конечном итоге приводя к числу 3

////////////////////////////////////////////////////////////////
/// ------------------------ 2 ----------------------------- ///
////////////////////////////////////////////////////////////////
class ChatApp {
  constructor() {
    this.keywordRegex = /hello|hi|hey/g;
  }

  receiveMessage(message) {
    if (this.keywordRegex.test(message)) {
      this.sendGreeting();
    }
  }

  sendGreeting() {
    console.log('ChatApp: Hello, how can I assist you today?');
  }
}

let chatApp = new ChatApp();
chatApp.receiveMessage('hi, how are you?');
chatApp.receiveMessage('hello, can you help me?');

///////////// ------- Решение ------- //////////////
class ChatApp {
  receiveMessage(message) {
    let keywordRegex = /hello|hi|hey/g;

    if (keywordRegex.test(message)) {
      this.sendGreeting();
    }
  }

  sendGreeting() {
    console.log('ChatApp: Hello, how can I assist you today?');
  }
}

let chatApp = new ChatApp();

chatApp.receiveMessage('hi, how are you?'); //  "ChatApp: Hello, how can I assist you today?"
chatApp.receiveMessage('hello, can you help me?'); // "ChatApp: Hello, how can I assist you today?

// В JavaScript объекты RegExp с флагом g (глобальный) сохраняют состояние между совпадениями из-за свойства lastIndex, что может привести к неожиданным результатам при повторном использовании с разными входными данными.
// Решение состоит в том, чтобы создать новый объект RegExp для каждого входящего сообщения, обеспечивая правильное распознавание и ответ на все приветствия

////////////////////////////////////////////////////////////////
/// ------------------------ 3 ----------------------------- ///
////////////////////////////////////////////////////////////////
function logPropertyUpdates(target) {
  return new Proxy(target, {
    set(target, property, value, receiver) {
      console.log(`Property "${property}" changed to
  "${value}"`);

      return Reflect.set(target, property, value, receiver);
    },
  });
}

const user = logPropertyUpdates({
  name: 'Lew',
  details: {
    age: 24,
    country: 'USA',
  },
});

user.name = 'Kareem';
user.details.age = 25;

///////////// ------- Решение ------- //////////////
function logPropertyUpdates(target) {
  if (typeof target === 'object' && target !== null) {
    return new Proxy(target, {
      get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver);
        return logPropertyUpdates(value);
      },
      set(target, property, value, receiver) {
        console.log(`Property "${property}" changed to 
  "${value}"`);
        return Reflect.set(target, property, value, receiver);
      },
    });
  }

  return target;
}

const user = logPropertyUpdates({
  name: 'Lew',
  details: {
    age: 24,
    country: 'USA',
  },
});

user.name = 'Kareem';
user.details.age = 25;

// ES6 прокси по умолчанию не являются рекурсивными. В приведенном выше примере объект пользователя обернут в прокси, но свойство details не. Поэтому, когда обновляется свойство user.details.age, прокси несрабатывает.
// Чтобы это исправить, мы можем сделать прокси рекурсивным, обернув вложенные объекты в прокси также

////////////////////////////////////////////////////////////////
/// ------------------------ 4 ----------------------------- ///
////////////////////////////////////////////////////////////////
// service-worker.js
const CACHE_NAME = 'site-static-v1';
const assetsToCache = ['/', '/index.html', '/css/style.css', '/js/script.js'];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assetsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});

safeUpdate(user, 'country', 'USA');
///////////// ------- Решение ------- //////////////
// service-worker.js
const CACHE_NAME = 'site-static-v1';
const assetsToCache = ['/', '/index.html', '/css/style.css', '/js/script.js'];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assetsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return (
        cacheResponse ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request.url, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});

// В исходном коде сервисный рабочий кэширует активы при установке, но не обновляет кэш, когда активы изменяются. Это означает, что если вы обновите свой CSS или JS, сервисный рабочий все равно будет обслуживать старую версию.
// Чтобы это исправить, мы можем использовать метод cache.put(), чтобы обновить кэш, когда активы изменяются

////////////////////////////////////////////////////////////////
/// ------------------------ 5 ----------------------------- ///
////////////////////////////////////////////////////////////////
const example = `
<html lang="en">

<body>
  <user-profile id="profile" username="JohnDoe"></user-profile>
  
  <script>
    class UserProfile extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        this.render();
      }

      render() {
        this.shadowRoot.innerHTML = '<p>Username: ${this.getAttribute('username')}</p>';
      }
    }

    customElements.define("user-profile",
      UserProfile);

    setTimeout(() => {
      document.getElementById("profile").setAttribute("username", "JaneDoe");
}, 3000);
  </script>
</body>

</html>
`;

///////////// ------- Решение ------- //////////////
const example = `
<html lang="en">

<body>
  <user-profile id="profile" username="JohnDoe"></user-profile>
  
  <script>
    class UserProfile extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        this.render();
      }

      static get observedAttributes() {
        return ["username"];
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name === "username") {
          this.render();
        }
      }

      render() {
        this.shadowRoot.innerHTML = '<p>Username: ${this.getAttribute('username')}</p>';
      }
    }

    customElements.define("user-profile",
      UserProfile);

    setTimeout(() => {
      document.getElementById("profile").setAttribute("username", "JaneDoe");
}, 3000);
  </script>
</body>

</html>
`;

// Статический геттер observedAttributes и метод attributeChangedCallback отсутствуют. Без этих методов компонент не будет реагировать на изменения своих атрибутов после начального рендеринга. Добавление этих методов позволяет компоненту наблюдать и реагировать на изменения атрибутов

////////////////////////////////////////////////////////////////
/// ------------------------ 6 ----------------------------- ///
////////////////////////////////////////////////////////////////
const example = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Spot the bug</title>
  <meta name="description" content="Gotta spot the 
bug" />
  <meta charset="ISO-8859-1" />
  <meta name="viewport" content="width=device-width, 
initial-scale=1.0" />
</head>

<body>
  <img src="https://bytes.dev/images/bytes-banner-rounded
.png" width="300" height="150" />
  <p>
    Bottom Line: With a release like this, the Astro
    hype train rocket
    probably won't be slowing down anytime soon. So we
    have to cherish moments
    like this while we have them, because your kids
    always grow up way too
    fast � . </p>
</body>

</html>`;

///////////// ------- Решение ------- //////////////
const example = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Spot the bug</title>
  <meta name="description" content="Gotta spot the 
bug" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, 
initial-scale=1.0" />
</head>

<body>
  <img src="https://bytes.dev/images/bytes-banner-rounded
.png" width="300" height="150" />
  <p>
    Bottom Line: With a release like this, the Astro
    hype train rocket
    probably won't be slowing down anytime soon. So we
    have to cherish moments
    like this while we have them, because your kids
    always grow up way too
    fast � . </p>
</body>

</html>
`;

const a = 1;

// Указание кодировки приведет к тому, что специальные символы и эмодзи не будут отображаться правильно.
// Чтобы правильно отобразить эмодзи, документ должен и спользовать кодировку Unicode Transformation Format (UTF), при этом UTF-8 является наиболее часто используемой кодировкой для веб-разработки

////////////////////////////////////////////////////////////////
/// ------------------------ 7 ----------------------------- ///
////////////////////////////////////////////////////////////////
function stressTest() {
  console.time('Total Stress Test Duration');

  const arraySize = Math.pow(2, 32);

  let largeArray = new Array(arraySize).fill(0);

  console.time('Populate Array');
  largeArray = largeArray.map(() => Math.floor(Math.random() * 1000));
  console.timeEnd('Populate Array');

  console.time('Sort Array');
  largeArray.sort((a, b) => a - b);
  console.timeEnd('Sort Array');

  console.time('Filter Even Numbers');
  const oddArray = largeArray.filter((num) => num % 2 !== 0);
  console.timeEnd('Filter Even Numbers');

  console.time('Square Numbers');
  const squaredArray = oddArray.map((num) => num * num);
  console.timeEnd('Square Numbers');

  console.time('Sum of Numbers');
  const sum = squaredArray.reduce((acc, num) => acc + num, 0);
  console.timeEnd('Sum of Numbers');

  console.timeEnd('Total Stress Test Duration');
}

stressTest();

///////////// ------- Решение ------- //////////////
function stressTest() {
  console.time('Total Stress Test Duration');

  const arraySize = Math.pow(2, 32) - 1;

  let largeArray = new Array(arraySize).fill(0);

  console.time('Populate Array');
  largeArray = largeArray.map(() => Math.floor(Math.random() * 1000));
  console.timeEnd('Populate Array');

  console.time('Sort Array');
  largeArray.sort((a, b) => a - b);
  console.timeEnd('Sort Array');

  console.time('Filter Even Numbers');
  const oddArray = largeArray.filter((num) => num % 2 !== 0);
  console.timeEnd('Filter Even Numbers');

  console.time('Square Numbers');
  const squaredArray = oddArray.map((num) => num * num);
  console.timeEnd('Square Numbers');

  console.time('Sum of Numbers');
  const sum = squaredArray.reduce((acc, num) => acc + num, 0);
  console.timeEnd('Sum of Numbers');

  console.timeEnd('Total Stress Test Duration');
}

stressTest();

// Ошибка заключается в том, что размер массива слишком велик. Максимальный размер массива составляет 2^32 - 1. В ECMAScript свойство length массива является 32-битным беззнаковым целым числом, что ограничивает максимальное количество элементов, которые может иметь массив. Поскольку свойство length представляет количество элементов и оно начинается с нуля, максимальная длина составляет  Math.pow(2, 32) -1

////////////////////////////////////////////////////////////////
/// ------------------------ 8 ----------------------------- ///
////////////////////////////////////////////////////////////////
class User {
  // async constructor(userId) {
  //   const user = await getUser(userId);
  //   this.id = user.id;
  //   this.name = user.name;
  //   this.email = user.email;
  // }
  // ...
}

///////////// ------- Решение ------- //////////////
class User {
  static async init(userId) {
    const user = await getUser(userId);
    return new User(user);
  }

  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
  // ...
}

const me = await User.init(1);

// JavaScript не позволяет конструкторам классов быть асинхронными. Мы должны выполнять любые асинхронные действия вне конструктора.

// Статические методы класса могут помочь с этим. Мы создаем статический асинхронный метод, который выполняет асинхронную операцию, а затем вызывает конструктор с результатом

////////////////////////////////////////////////////////////////
/// ------------------------ 9 ----------------------------- ///
////////////////////////////////////////////////////////////////
// function getId(user, fallback) {
//   return user && user.id ?? fallback;
// }

///////////// ------- Решение ------- //////////////

function getId(user, fallback) {
  return (user && user.id) ?? fallback;
}

// or even better
function getId(user, fallback) {
  return user?.id ?? fallback;
}

// Оператор ?? имеет более высокий приоритет, чем оператор &&. Это означает, что выражение user && user.id ?? fallback эквивалентно user && (user.id ?? fallback). Это не то, что мы хотим.
// Чтобы это исправить, нам нужно использовать скобки, чтобы изменить порядок вычисления. В качестве альтернативы, мы можем использовать оператор опциональной цепочки (?.) для более лаконичного решения

////////////////////////////////////////////////////////////////
/// ------------------------ 10 ----------------------------- ///
////////////////////////////////////////////////////////////////
const car = {
  name: 'Tesla',
  startEngine() {
    console.log(`The ${this.name} engine is 
  starting...`);
  },
  delayedStart() {
    setTimeout(this.startEngine, 1000);
  },
};

car.delayedStart();

///////////// ------- Решение ------- //////////////

const car = {
  name: 'Tesla',
  startEngine() {
    console.log(`The ${this.name} engine is 
  starting...`);
  },
  delayedStart() {
    setTimeout(() => this.startEngine(), 1000);
  },
};

car.delayedStart();

// Ошибка связана с вызовом startEngine. Поскольку мы передаем this.startEngine в качестве аргумента setTimeout, мы не вызываем его. Это означает, что он не будет вызван с правильным контекстом (this).
// Мы можем исправить это, используя стрелочную функцию, которая сохраняет лексическое значение this из своей окружающей области
