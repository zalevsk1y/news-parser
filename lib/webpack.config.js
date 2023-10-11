const path = require('path');
const VERSION = (require('./package.json').version);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, args) => {
  const mode = args.mode || 'development';
  const isDev = mode === 'development';
  const isProd = !isDev;
  return {
    mode,
    context: path.resolve(__dirname, 'src/packages/pages/'),
    entry: {
      parser_rss: './parser-rss/index.tsx',
      parser_page: './parser-page/index.tsx',
      autopilot: './autopilot/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, '../public/js/'),
      publicPath: '/public/js/',
      filename: `[name]-${VERSION}.bundle.js`,
      chunkFilename: `[id]-${VERSION}.bundle.[ext]`
    },
    module: {
      rules:
        [
          {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,

              // Compiles Sass to CSS
              'css-loader',
            ],
          }
        ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `../css/[name]-${VERSION}.css`,
      }),
      new webpack.DefinePlugin({
        'process.env.BUILD_MODE': JSON.stringify(args.mode)
      })

    ],
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCssAssetsPlugin({})  
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            enforce: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    
    },
    externals: {
      globals: 'window',
    },
    resolve: {
      alias: {
        '@news-parser/helpers': path.resolve(__dirname, 'src/packages/helpers/'),
        '@news-parser/config': path.resolve(__dirname, 'src/packages/config/'),
        '@news-parser/error-handler': path.resolve(__dirname, 'src/packages/error-handler/'),
        '@news-parser/styles': path.resolve(__dirname, 'scss/'),
        '@news-parser/pages': path.resolve(__dirname, 'src/packages/pages/'),
        '@news-parser/components': path.resolve(__dirname, 'src/packages/components/'),
        '@news-parser/entities': path.resolve(__dirname, 'src/packages/entities/'),
        '@news-parser/modules': path.resolve(__dirname, 'src/packages/modules/'),
        '@news-parser/widgets': path.resolve(__dirname, 'src/packages/widgets/'),
        '@news-parser/ui': path.resolve(__dirname, 'src/packages/ui/'),
        '@news-parser/hooks': path.resolve(__dirname, 'src/packages/hooks/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    devtool:isDev?'source-map':false,

    devServer: {
      port: 5080,
      host: '0.0.0.0',

    },
  };
};
