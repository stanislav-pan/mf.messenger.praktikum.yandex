import SignUpPage from './pages/sign-up/sign-up.page.js';
import { render } from './utils/renderDOM.js';

const signUpPage = new SignUpPage();
render('#root', signUpPage);