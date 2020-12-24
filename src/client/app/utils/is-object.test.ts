import { isObject } from './is-object';

test('Являются объектом', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject([])).toBeTruthy();
  expect(isObject(new Date())).toBeTruthy();
});

test('Не являются объектом', () => {
  expect(isObject(null)).toBeFalsy();
  expect(isObject(1)).toBeFalsy();
  expect(isObject('')).toBeFalsy();
  expect(isObject(false)).toBeFalsy();
});
