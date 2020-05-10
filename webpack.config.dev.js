const path = require('path');

module.exports = {
  mode: "development",
  entry: './build/main.js',
  output: {
    filename: 'nls',
    path: path.resolve(__dirname, 'dist'),
  },
};
