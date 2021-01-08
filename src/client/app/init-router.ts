import { Router } from './utils/router/router';

const lazilyLoadPage = (name: string) => () => {
  return import(`./pages/${name}/${name}.page`).then(
    (component) => new component.default()
  );
};

export const router = new Router('#root')
  .use('/login', lazilyLoadPage('login'))
  .use('/sign-up', lazilyLoadPage('sign-up'))
  .use('/settings', lazilyLoadPage('settings'))
  .use('/messanger', lazilyLoadPage('messanger'))
  .use('/404', lazilyLoadPage('error-404'))
  .use('/500', lazilyLoadPage('error-500'));
