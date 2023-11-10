module.exports = {
  presets:['@babel/preset-typescript'], 
  plugins: [
    [
      '@wordpress/babel-plugin-makepot',
      {
          output: __dirname+'/src/packages/languages/news-parser-plugin-js.pot',
          domain: 'news-parser-plugin-js',
          package: 'News Parser Plugin JS',
      },
  ]  
  ]
};
