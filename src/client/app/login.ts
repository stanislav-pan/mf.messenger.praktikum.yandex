import LoginPage from './pages/login/login.page.js';
import { render } from './utils/renderDOM.js';

const loginPage = new LoginPage();
render('#root', loginPage);
