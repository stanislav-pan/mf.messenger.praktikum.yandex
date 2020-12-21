import { router } from './init-router.js';
import { userService } from './services/user.service.js';

userService
    .initUser()
    .then(() => {
        const pathname = window.location.pathname;

        if (pathname.includes('/login') || pathname.includes('/sign-up')) {
            router.start('/messanger');

            return;
        }

        router.start();
    })
    .catch(() => {
        const pathname = window.location.pathname;

        if (pathname.includes('/sign-up')) {
            router.start('/sign-up');

            return;
        }

        router.start('/login');
    });
