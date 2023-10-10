var webpack = require('webpack');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const bodyParser=require("body-parser");
const devServer=require("./devServer/devServer.js")

module.exports={
    devtool: 'source-map',
    entry:{
        parser:'./src/packages/parser/src/index.js',
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
				test: /\.css$/,
				use: [
				  MiniCssExtractPlugin.loader,
				  "css-loader"
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
	resolve: {
		alias: {
				"@news-parser/message": path.resolve(__dirname,"src/packages/message/src/index.js"),
				"@news-parser/gallery-dialog": path.resolve(__dirname,"src/packages/gallery-dialog/src/index.js"),
				"@news-parser/helpers": path.resolve(__dirname,"src/packages/helpers/src/index.js"),
				"@news-parser/config": path.resolve(__dirname,"src/packages/config/src/index.js"),
				"@news-parser/translate": path.resolve(__dirname,"src/packages/translate/src/index.js"),
				"@news-parser/error-handler": path.resolve(__dirname,"src/packages/error-handler/src/index.js")
			}
	},
	devServer:{
		port:9000,
		contentBase: [path.resolve(__dirname, '../public/'),path.join(__dirname,'devServer/assert')],
		index:path.join(__dirname, 'devServer/index.html'),
		before:devServer
	}   
}