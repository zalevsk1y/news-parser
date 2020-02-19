const merge = require('webpack-merge');
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackDevConfig = require('./webpack.config.js');


module.exports=merge(webpackDevConfig,{
    optimization:{
		minimizer:[
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		]
    }
})