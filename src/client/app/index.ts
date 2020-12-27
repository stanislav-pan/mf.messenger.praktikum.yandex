import { router } from './init-router';
import { userService } from './services/user.service';

import './../styles.scss';

userService
  .initUser()
  .then(() => {
    const pathname = window.location.pathname;

    if (pathname.includes('/login') || pathname.includes('/sign-up')) {
      router.start('/messanger');

      return;
    }

    router.start(
      window.location.pathname === '/' ? '/messanger' : window.location.pathname
    );
  })
  .catch(() => {
    const pathname = window.location.pathname;

    if (pathname.includes('/sign-up')) {
      router.start('/sign-up');

      return;
    }

    router.start('/login');
  });
