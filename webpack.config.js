module.exports = {
  entry: `${__dirname}/client/src/index.jsx`,
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', {
              'plugins': ['@babel/plugin-syntax-jsx', '@babel/plugin-proposal-class-properties']}],
          },
        },
      },
    ],
  },

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/client/dist`,
  },
};
