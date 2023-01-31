var webpack = require('webpack');
const path = require("path");
const devServer=require("./devServer/devServer.js");
const VERSION=(require("./package.json").version);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports=(env,args)=>{
	const mode=args.mode||'development',
		isDev=mode==='development',
		isProd=!isDev;
	return {
		mode,
		context:path.resolve(__dirname,'src/packages/parser-rss/src'),
		entry:{
			parser_rss:'./index.js'
		},
		output:{
					path:path.resolve(__dirname,'../public/js/'),
					publicPath:'/',
					filename:`[name]-${VERSION}.bundle.js`
		},
		module:{
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					loader: 'babel-loader',
					options:{
						presets:["@babel/preset-env","@babel/preset-react"]
					}
					
				},
				{
					test: /\.s(a|c)ss$/,
					use:[
						MiniCssExtractPlugin.loader,
						//'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					]
				}
			],
		},
		plugins:[
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: `../css/[name]-${VERSION}.css`
			})
			
		],
		optimization:{
			minimize:isProd,
			minimizer:[
				new TerserJSPlugin({}),
				new CssMinimizerPlugin({})
			]
		},
		externals:{
			'globals':'window'
		},
		resolve: {
			alias: {
					"@news-parser/message": path.resolve(__dirname,"src/packages/message/src/"),
					"@news-parser/helpers": path.resolve(__dirname,"src/packages/helpers/src/"),
					"@news-parser/config": path.resolve(__dirname,"src/packages/config/src/index.js"),
					"@news-parser/parser-rss": path.resolve(__dirname,"src/packages/parser-rss/src/"),
					"@news-parser/error-handler": path.resolve(__dirname,"src/packages/error-handler/src/index.js"),
					"@news-parser/visual-constructor":path.resolve(__dirname,"src/packages/visual-constructor/src/"),
					"@news-parser/styles":path.resolve(__dirname,"scss/"),
					"@news-parser/image":path.resolve(__dirname,"src/packages/image/src/"),
					"@news-parser/sidebar":path.resolve(__dirname,"src/packages/sidebar/src/")
				}
		},
		devServer:{
			port:5080,
			host:'0.0.0.0',
			contentBase: [path.resolve(__dirname, '../public/'),path.join(__dirname,'devServer/assets')],
			index:path.join(__dirname, 'devServer/index.html'),
			before:devServer
		}   
	}
}