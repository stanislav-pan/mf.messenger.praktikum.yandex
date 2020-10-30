import SettingsPage from './pages/settings/settings.page.js';
import { render } from './utils/renderDOM.js';

const settingsPage = new SettingsPage();
render('#root', settingsPage);
