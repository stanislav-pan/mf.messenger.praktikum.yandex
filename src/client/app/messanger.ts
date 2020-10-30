import MessangerPage from './pages/messanger/messanger.page.js';
import { render } from './utils/renderDOM.js';

const messangerPage = new MessangerPage();

render('#root', messangerPage);