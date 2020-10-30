import Error404Page from './pages/error-404/error-404.page.js';
import { render } from './utils/renderDOM.js';

const error404Page = new Error404Page();
render('#root', error404Page);
