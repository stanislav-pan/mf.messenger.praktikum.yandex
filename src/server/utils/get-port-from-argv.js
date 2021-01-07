const getPortFromArgv = () => {
  const portArg = process.argv.find((arg) => arg.includes('--port'));

  let port;

  if (portArg) {
    port = Number(portArg.replace('--port=', ''));
  }

  if (!port || Number.isNaN(port)) {
    port = null;
  }

  return port;
};

module.exports = {
  getPortFromArgv,
};
