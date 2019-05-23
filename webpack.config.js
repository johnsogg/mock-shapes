const path = require('path'); // eslint-disable-line

module.exports = {
  entry: './dist/generate/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'mock-shapes.js',
    library: 'mockShapes',
    libraryTarget: 'umd',
  },
};
