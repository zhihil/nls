const path = require('path');

module.exports = {
  mode: "production",
  entry: './build/nls.js',
  output: {
    filename: 'nls',
    path: path.resolve(__dirname, 'dist'),
  },
};
