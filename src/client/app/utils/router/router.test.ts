import { Router } from '.';
import Button from '../../components/button';
import Input from '../../components/input';

describe('router', () => {
  const rootSelector = '#root';
  const getRootItem = () => document.querySelector(rootSelector);

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it(`Должен рендерить компонент в контейнере, который указывается с помощью селектора,
    передаваемого в конструктор класса Router`, () => {
    const buttonClass = Button as any;

    const router = new Router(rootSelector);
    router.use('/components/button', () => new buttonClass());
    router.start('/components/button');

    expect(!!getRootItem().querySelector('app-button')).toBeTruthy();
  });

  it('Должен рендерить новый компонент при смене роута (через метод go)', () => {
    const buttonClass = Button as any;
    const inputClass = Input as any;

    const router = new Router(rootSelector);

    router.use('/components/button', () => new buttonClass());
    router.use('/components/input', () => new inputClass());

    router.start('/components/button');

    expect(!!getRootItem().querySelector('app-button')).toBeTruthy();

    router.go('/components/input');

    expect(!!getRootItem().querySelector('app-input')).toBeTruthy();
  });

  it('Должен рендерить новый компонент при смене роута', () => {
    const buttonClass = Button as any;
    const inputClass = Input as any;

    const router = new Router(rootSelector);
    router.use('/components/button', () => new buttonClass());
    router.use('/components/input', () => new inputClass());

    router.start('/components/button');

    expect(!!getRootItem().querySelector('app-button')).toBeTruthy();

    window.history.replaceState({}, 'Test', '/components/input');
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(!!getRootItem().querySelector('app-input')).toBeTruthy();
  });

  it('Должен удалять компонент при смене роута', () => {
    const buttonClass = Button as any;
    const inputClass = Input as any;

    const router = new Router(rootSelector);
    router.use('/components/button', () => new buttonClass());
    router.use('/components/input', () => new inputClass());

    router.start('/components/button');

    expect(!!getRootItem().querySelector('app-button')).toBeTruthy();

    router.go('/components/input');

    expect(!!getRootItem().querySelector('app-button')).toBeFalsy();
  });
});
