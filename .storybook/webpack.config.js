/* eslint-disable global-require */
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.s?css$/,
        exclude: /\/(node_modules|styles|\.storybook)\//,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.css$/,
        include: /\/node_modules\//,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        include: /\/(styles|\.storybook)\//,
        use: ['style-loader', 'raw-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        use: [
          require.resolve('babel-loader'),
          {
            loader: require.resolve('pug-as-jsx-loader'),
            options: {
              transpiledFile: true,
            },
          },
        ],
      },
      // {
      //   test: /\.jsx$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       query: {
      //         presets: ['airbnb'],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(yml|yaml)$/,
        exclude: /node_modules/,
        use: [
          require.resolve('json-loader'),
          require.resolve('yaml-loader'),
        ],
      },
      {
        include: [/\.(ttf|woff|woff2|eot|svg)$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
