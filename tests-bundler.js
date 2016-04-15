// require all `src/**/*.test.js`
var context = require.context('./tests', true, /\.test\.js$/);
context.keys().forEach(context);

var modulesContext = require.context('./src', true, /^((?!client|mosaic).)*\.js$/);
modulesContext.keys().forEach(modulesContext);
