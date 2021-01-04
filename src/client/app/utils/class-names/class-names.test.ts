import { classNames } from './class-names';

describe('Тестирование функции classNames', () => {
  it('Должна корректно обрабатывать строковые значения', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
  });

  it('Должна корректно обрабатывать строковые значения и объекты', () => {
    expect(classNames('foo', { bar: true })).toBe('foo bar');
    expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
    expect(classNames({ 'foo-bar': false })).toBe('');
    expect(classNames({ foo: true }, { bar: true })).toBe('foo bar');
    expect(classNames({ foo: true, bar: true })).toBe('foo bar');
    expect(
      classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })
    ).toBe('foo bar baz quux');
  });

  it('Должна корректно обрабатывать нулевые значения', () => {
    expect(
      classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')
    ).toBe('bar 1');
  });

  it('Должна корректно обрабатывать массивы', () => {
    expect(classNames('bar', [1, null, 'baz'], { baz: true }, '3')).toBe(
      'bar 1 baz baz 3'
    );

    expect(
      classNames('bar', [1, null, 'baz', ['foo', 'test']], { baz: true }, '3')
    ).toBe('bar 1 baz foo test baz 3');
  });
});
