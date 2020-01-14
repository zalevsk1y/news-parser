var webpack = require('webpack');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const bodyParser=require("body-parser");
const devServer=require("./devServer/devServer.js");
const sass=require("node-sass");

module.exports={
    devtool: 'source-map',
    entry:{
        parser_rss:'./src/packages/parser-rss/src/index.js',
        settings:'./src/packages/settings/src/index.js'
    },
    output:{
				path:path.resolve(__dirname,'../public/js/'),
				publicPath:path.resolve(__dirname,'../public/js/'),
        filename:'[name].bundle.js'
    },
    module:{
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options:{
					presets:["@babel/preset-env","@babel/preset-react"]
				}
				
			},
			{
				test: /\.s(a|c)ss$/,
				use:[
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name:"../images/[name].[ext]"
					},
				  },
				],
			  }
		],
	},
	externals:{
		'globals':'window'
	},
	resolve: {
		alias: {
				"@news-parser/message": path.resolve(__dirname,"src/packages/message/src/index.js"),
				"@news-parser/gallery-dialog": path.resolve(__dirname,"src/packages/gallery-dialog/src/index.js"),
				"@news-parser/helpers": path.resolve(__dirname,"src/packages/helpers/src/"),
				"@news-parser/config": path.resolve(__dirname,"src/packages/config/src/index.js"),
				"@news-parser/translate": path.resolve(__dirname,"src/packages/translate/src/index.js"),
				"@news-parser/parser-rss": path.resolve(__dirname,"src/packages/parser-rss/src/"),
				"@news-parser/error-handler": path.resolve(__dirname,"src/packages/error-handler/src/index.js"),
				"@news-parser/visual-constructor":path.resolve(__dirname,"src/packages/visual-constructor/src/"),
				"@news-parser/styles":path.resolve(__dirname,"scss/")
			}
	},
	devServer:{
		port:9001,
		contentBase: [path.resolve(__dirname, '../public/'),path.join(__dirname,'devServer/assert')],
		index:path.join(__dirname, 'devServer/index.html'),
		before:devServer
	}   
}