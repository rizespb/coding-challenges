// // Простой кейс Имеем 2 простых типа

// type A = { key1: string; key2: string; key3: string };
// type B = { key2: number; key3: string };

// // на выходе хотим иметь тип Expected -> merge типа А и В

// type Expected = {
//   key1?: string;
//   key2: string | number;
//   key3: string;
// };

// type Keys<T, U> = keyof T | keyof U;

// type Merged<T, U> = {
//   [key in Keys<T, U>]: key extends keyof T
//     ? key extends keyof U
//       ? T[key] | U[key]
//       : T[key] | undefined
//     : key extends keyof U
//     ? U[key] | undefined
//     : never;
// };

// type ObjectType = Record<PropertyKey, unknown>;

// type DeepMerged<T, U> = T extends  ObjectType ? U extends ObjectType ?

interface IPlainObject {
  [key: string]: unknown;
}

type TArrayItem<T> = T extends [infer U] ? U : never;

const isSameTypePrimitive = <T>(target: T, source: unknown): source is T =>
  typeof target !== 'object' && typeof target !== 'function' && typeof target === typeof source;

const isPlainObject = <T>(value: unknown): value is IPlainObject =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;

const comparePlainObjectsTypes = <T>(template: T, source: unknown): source is T => {
  if (!isPlainObject(template) || !isPlainObject(source)) {
    return false;
  }

  for (const key in template) {
    if (typeof template[key] !== typeof source[key]) {
      return false;
    }
  }

  return true;
};

const replaceArray = <T, S>(target: T[], source: S[]): T[] => {
  const targetElement = target[0];

  const replacedArray: T[] = [];

  for (let i = 0; i < source.length; i++) {
    const current = source[i];

    if (comparePlainObjectsTypes(targetElement, current)) {
      replacedArray.push(current);
    }
  }

  return replacedArray;
};

const mergeObjects = <T extends IPlainObject, S extends IPlainObject>(target: T, source: S): T => {
  const result = {} as T;

  for (const key in target) {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (typeof targetValue !== typeof sourceValue) {
      result[key] = targetValue;

      continue;
    }

    if (isSameTypePrimitive(targetValue, sourceValue)) {
      result[key] = sourceValue;

      continue;
    }

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = mergeObjects(targetValue, sourceValue);

      continue;
    }

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      result[key] = replaceArray(targetValue, sourceValue) as typeof targetValue;
    }

    result[key] = targetValue;
  }

  console.log(result);

  return result;
};

const obj1 = {
  prop1: 'prop1_A',
  prop2: 'prop2_A',
  prop3: {
    'prop3-1': 'prop3-1_A',
    'prop3-2': 'prop3-2_A',
    'prop3-3': {
      'prop3-3-1': 'prop3-3-1_A',
      'prop3-3-2': {},
    },
    'prop3-4': 'prop3-4_A',
  },
};

const obj2 = {
  prop1: 'prop1_B',
  prop2: 'prop2_B',
  prop3: {
    'prop3-1': 'prop3-1_B',
    'prop3-2': {},
    'prop3-3': {
      'prop3-3-1': 'prop3-3-1_B',
      'prop3-3-2': {
        'prop3-3-2-1': 'prop3-3-2-1_B',
      },
    },
  },
};

const start = performance.now();

mergeObjects(obj1, obj2);

const end = performance.now();

console.log(end - start);

export interface IOperationValues {
  operation?: {
    values: Array<{
      id: string;
      value: string;
    }>;
  };
}

export interface IOperationValues {
  id: string;
  value: string;
  displayValue?: string;
}

export interface IGetOperationValuesParams {
  isNewScenarioReferenceEnabled: boolean;
  isScenarioMakeSalaryEnabled: boolean;
  extId?: string;
}

export const getOperationValues = ({
  isNewScenarioReferenceEnabled,
  isScenarioMakeSalaryEnabled,
  extId,
}: IGetOperationValuesParams): IOperationValues[] => {
  let values: IOperationValues[] = [];

  if (isScenarioMakeSalaryEnabled && extId) {
    values.push({
      id: 'extId',
      value: extId,
    });

    return values;
  }

  if (isNewScenarioReferenceEnabled) {
    values.push({
      id: 'tabCode',
      value: 'card',
    });
  }

  if (isNewScenarioReferenceEnabled && extId) {
    values.push({
      id: 'extId',
      value: extId,
    });
  }

  return values;
};
// Типизировать функцию
const X = { a: 1, b: 2, c: 3, d: 4 };
const Y = { k: 1, l: '2', m: true, n: 4 };

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getProperty(X, 'a');
const a = getProperty(Y, 'm');
