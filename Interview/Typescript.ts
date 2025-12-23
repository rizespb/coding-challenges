// ---------------------- 1 ----------------------
// Типизировать функцию
// -----------------------------------------------

// Имеется исходный массив из объектов пользователей
const users = [
  { id: 1, age: 20, isAdmin: false, name: 'Иван', city: 'Moscow', registred: false },
  { id: 2, age: 30, isAdmin: false, name: 'Дима', city: 'Omsk', registred: false },
  { id: 3, age: 20, isAdmin: true, name: 'Леха', city: 'Moscow', registred: true },
  { id: 5, age: 30, isAdmin: false, name: 'Иван', city: 'Moscow', registred: true },
];
// Необходимо преобразовать исходный массив в структуру,
// где данные пользователя будут сгруппированы по одному из полей объекта user (кроме поля id).
// Внутри сформированной группы должен лежать объект (или Map),
// ключами в котором должно быть поле "id",
// а значением, объект из исходного массива с соответствующим полем "id"(не включая само поле id)
// Один из вариантов результата (для поля age)
const result = {
  20: {
    1: { age: 20, isAdmin: false, name: 'Иван', city: 'Moscow', registred: false },
    3: { age: 20, isAdmin: true, name: 'Леха', city: 'Moscow', registred: true },
  },
  30: {
    2: { age: 30, isAdmin: false, name: 'Дима', city: 'Omsk', registred: false },
    5: { age: 30, isAdmin: false, name: 'Иван', city: 'Moscow', registred: true },
  },
};

function groupByField(arr, groupBy) {}

type ArrayType<T extends unknown[]> = T extends Array<infer U> ? U : never;

type NotAllowedKey = 'id';

type FullObjectType = ArrayType<typeof users>;

type InnerMap = Omit<FullObjectType, NotAllowedKey>;

type AllowedKeys = Exclude<keyof FullObjectType, NotAllowedKey>;

type IdKeyType = FullObjectType[NotAllowedKey];

type InnerRecord = Map<IdKeyType, InnerMap>;

type OuterField = FullObjectType[AllowedKeys];

type OuterRecord = Map<OuterField, InnerRecord>;

function groupByField<T extends FullObjectType[], K extends AllowedKeys>(arr: T, groupBy: K): OuterRecord {
  let output: OuterRecord = new Map();

  arr.forEach((item) => {
    const groupName = item[groupBy];
    const { id, ...rest } = item;
    if (!output.has(groupName)) {
      const innerMap: InnerRecord = new Map().set(id, rest);

      output.set(groupName, innerMap);
    } else {
      output.get(groupName)?.set(id, rest);
    }
  });
  return output;
}

console.log(groupByField(users, 'city'));

// ---------------------- 1 ----------------------
// Типизировать функцию
// -----------------------------------------------
const X = { a: 1, b: 2, c: 3, d: 4 };
const Y = { k: 1, l: '2', m: true, n: 4 };

function getProperty(obj, key) {
  return obj[key];
}

getProperty(X, 'a');
getProperty(X, 'm');
