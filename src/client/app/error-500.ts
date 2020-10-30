import Error500Page from './pages/error-500/error-500.page.js';
import { render } from './utils/renderDOM.js';

const error500Page = new Error500Page();
render('#root', error500Page);
