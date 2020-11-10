import Error404Page from './pages/error-404/error-404.page.js';
import Error500Page from './pages/error-500/error-500.page.js';
import LoginPage from './pages/login/login.page.js';
import MessangerPage from './pages/messanger/messanger.page.js';
import SettingsPage from './pages/settings/settings.page.js';
import SignUpPage from './pages/sign-up/sign-up.page.js';

import { Router } from './utils/router/router.js';

export const router = new Router('#root')
    .use('/login', LoginPage as any)
    .use('/sign-up', SignUpPage as any)
    .use('/settings', SettingsPage as any)
    .use('/messanger', MessangerPage as any)
    .use('/404', Error404Page as any)
    .use('/500', Error500Page as any);
