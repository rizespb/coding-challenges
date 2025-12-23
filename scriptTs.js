'use strict';
// // Простой кейс Имеем 2 простых типа
Object.defineProperty(exports, '__esModule', { value: true });
exports.EValidatorErrorToFieldId = exports.getOperationValues = void 0;
var isSameTypePrimitive = function (target, source) {
  return typeof target !== 'object' && typeof target !== 'function' && typeof target === typeof source;
};
var isPlainObject = function (value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};
var comparePlainObjectsTypes = function (template, source) {
  if (!isPlainObject(template) || !isPlainObject(source)) {
    return false;
  }
  for (var key in template) {
    if (typeof template[key] !== typeof source[key]) {
      return false;
    }
  }
  return true;
};
var replaceArray = function (target, source) {
  var targetElement = target[0];
  var replacedArray = [];
  for (var i = 0; i < source.length; i++) {
    var current = source[i];
    if (comparePlainObjectsTypes(targetElement, current)) {
      replacedArray.push(current);
    }
  }
  return replacedArray;
};
var mergeObjects = function (target, source) {
  var result = {};
  for (var key in target) {
    var targetValue = target[key];
    var sourceValue = source[key];
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
      result[key] = replaceArray(targetValue, sourceValue);
    }
    result[key] = targetValue;
  }
  console.log(result);
  return result;
};
var obj1 = {
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
var obj2 = {
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
var start = performance.now();
mergeObjects(obj1, obj2);
var end = performance.now();
console.log(end - start);
var getOperationValues = function (_a) {
  var isNewScenarioReferenceEnabled = _a.isNewScenarioReferenceEnabled,
    isScenarioMakeSalaryEnabled = _a.isScenarioMakeSalaryEnabled,
    extId = _a.extId;
  var values = [];
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
exports.getOperationValues = getOperationValues;
exports.EValidatorErrorToFieldId = {
  enteredAmount: 'payment.amount',
};
console.log(Object.entries(exports.EValidatorErrorToFieldId));
