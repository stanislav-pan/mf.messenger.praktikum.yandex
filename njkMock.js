module.exports = {
  process(src) {
    return `
      const nunjucks = require('nunjucks');
    
      module.exports = (props) => {
        return nunjucks.renderString(${JSON.stringify(src)}, props);
      }
    `;
  },
};
