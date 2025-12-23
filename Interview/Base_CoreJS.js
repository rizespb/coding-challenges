// ----------------------------------------------------
// --------------- ССЫЛОЧНЫЕ ТИПЫ ДАННЫ ---------------
// ----------------------------------------------------

// --------------- 1 ---------------
// Что будет выведено в консоль и почему?

const a = { b: 1 };
const c = Object.create(a);

console.log(c.b); //
delete c.b;
console.log(c.b); //
delete a.b;
console.log(c.b); //

a.z = 2;
console.log(c.z); //
c.z = 3;
console.log(a.z); //

// --------------- 2 ---------------
// Что будет выведено в консоль и почему?
let firstObj = { greeting: 'hey' };

let secondObj = firstObj;

firstObj.greeting = 'ho';

console.log(secondObj.greeting); //

firstObj = { greeting: 'hello' };

console.log(secondObj.greeting); //

// -----------------------------------------
// --------------- ЗАМЫКАНИЕ ---------------
//------------------------------------------
// --------------- 1 ---------------
//Что будет выведено в консоль и почему?

const a = 1;

function foo() {
  console.log(a);
}

function foo2() {
  var a = 2;
  foo();
}

foo2(); // 1

// ----------------------------------------
// --------------- КОНТЕКСТ ---------------
// ----------------------------------------
// --------------- 1 ---------------
// Что будет выведено в консоль и почему?
// Как исправить?
var name = 'Global';

const item = {
  a: () => {
    console.log(this.name);
  },
  name: 'ITEM',
};

obj.a(); // Global

// --------------- 2 ---------------
// Что будет выведено в консоль, если код запустить в браузере, и почему?
// Как сделать так, чтобы в результате вызова greeting в консоли вывелось "Николай". Без модификации переменных и объекта ( obj.prop.getName().call(obj) )
var name = 'Иван';

const obj = {
  name: 'Николай',
  prop: {
    name: 'Петр',
    getName() {
      console.log(this.name);
    },
  },
};

obj.prop.getName(); //
const text = obj.prop.getName;
text(); //

// --------------- 3 ---------------
// Что будет выведено в консоль и почему?
// Как исправить ситуацию? (стрелочная функция, call/apply, bind)
const a = {
  name: 'Иван',
  log() {
    const inner = function () {
      console.log(this.name);
    };

    inner();
  },
};

a.log(); //

// --------------- 4 ---------------
// Что будет выведено в консоль и почему?

function foo() {
  const x = 10;

  return {
    x: 20,
    bar: () => {
      console.log(this.x);
    },
    baz: function () {
      console.log(this.x);
    },
  };
}

const obj1 = foo();
obj1.bar(); // undefined
obj1.baz(); // 20

const obj2 = foo.call({ x: 30 });
let y = obj2.bar;
let z = obj2.baz;

y(); // 30
z(); // undefined

obj2.bar(); // 30
obj2.baz(); // 20

// --------------- 5 ---------------
// Что будет выведено в консоль и почему?

(function q5() {
  let baz = 0;

  let foo = {
    bar1: function () {
      return this.baz;
    },
    bar2: () => this.baz,
    baz: 1,
  };

  let fooCopy = {
    bar1: foo.bar1,
    bar2: foo.bar2,
    baz: 2,
  };

  console.log(fooCopy.bar1()); // 2
  console.log(fooCopy.bar2()); // undefined
})();

// ---------------------------------------
// --------------- ПРОМИСЫ ---------------
// ---------------------------------------
// --------------- 1 ---------------
// Что будет выведено в консоль и почему?
Promise.reject('a')
  .catch((p) => p + 'b') // промис зарезолвился
  .catch((p) => p + 'c') // пропускаем
  .then((p) => p + 'd')
  .finally((p) => p + 'e') // ничего не возвращает
  .then(console.log); // попадает результат до finally
console.log('f'); // выводится синхронно

// f abd

// --------------- 2 ---------------
// Что будет выведено в консоль и почему?
setTimeout(() => console.log(1), 0);
Promise.resolve().then(() => console.log(2));
Promise.resolve().then(() => setTimeout(() => console.log(3), 0));
Promise.resolve().then(() => console.log(4));
setTimeout(() => console.log(5), 0);
console.log(6);

// 6, 2, 4, 1, 5, 3

// --------------- 3 ---------------
// Что будет выведено в консоль и почему?
setTimeout(() => {
  console.log(1);
}, 5000);

new Promise((resolve) => {
  console.log(2);

  resolve(3);
})
  .then(console.log(4))
  .then(console.log);

setTimeout(() => {
  console.log(5);
}, 0);

Promise.resolve(6)
  .then((value) => {
    console.log(value);

    return value + 100;
  })
  .finally((value) => {
    console.log(value);
  });

console.log(8);

// 2 3 4 8 6 undefined indefined 5 1

// --------------- 4 ---------------
// Что будет выведено в консоль и почему?
setTimeout(() => {
  console.log(1);
});

setTimeout(() => {
  Promise.resolve()
    .then((foo) => {
      console.log(foo);
      return 2;
    })
    .then((foo) => {
      console.log(foo);
    });
  console.log(3);
});

setTimeout(() => {
  console.log(4);
});

console.log(5);

// 5 1 3 undefined 2 4

// --------------- 5 ---------------
// Что будет выведено в консоль и почему?
setTimeout(function timeout() {
  console.log('Таймаут');
}, 0);

const p = new Promise((resolve, reject) => {
  console.log('Создание промиса');

  resolve(1);
});

p.then((value) => {
  console.log(value);

  return 2;
})
  .then(console.log(10))
  .then((value) => {
    console.log(value);

    return value + 1;
  })
  .finally((value) => {
    console.log(value);

    return value + 1;
  })
  .then(console.log);

console.log('Конец скрипта');

// --------------- 5 ---------------
// Задача на промисы и замыкание

// Функция get использует fetch для осуществления запросов
// В случае успешного запроса в ответе приходят данные в формате JSON
// В случае успешного ответа, функция возвращает данные в виде объекта JS
// В случае ошибки запроса get выполняет повторный запрос. Но не более 5 раз
// Если после 5 повторных запросов успешный ответ так и не был получен, функция должна пробросить ошибку с сообщением "Не удалось осуществить запрос"
// async/await не используем

const get = (url) => {
  // ...
};

get('http://some-url.com').then(console.log).catch(console.error);

// Создание промиса 10 Конец скрипта 1 2 undefined 3 Таймаут

// ------------------------------------------------
// --------------- ДЕСТРУКТУРИЗАЦИЯ ---------------
// ------------------------------------------------
// --------------- 1 ---------------
// Что будет выведено в консоль и почему?
const {
  foo: {
    baz: [bar, ...asd],
  },
  bar: [bat],
} = { foo: { baz: [0, 1] }, bar: [{ bat: 3 }] };

console.log(bar); // 0
console.log(asd); // [1]
console.log(bat); // {bat: 3}

// --------------- 2 ---------------
// Деструктурирующее присваивание в параметрах функции
const input = [
  { expired: false, order: 4, value: 'abcd' },
  { expired: true, order: 2, value: 'qwer' },
  { expired: false, order: 1, value: 'xyz1' },
  { expired: false, order: 3, value: 'abx2' },
];

input.sort((a, b) => a.order - b.order);
