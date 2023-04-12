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
		context:path.resolve(__dirname,'src/packages/pages/parser-rss/'),
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
					"@news-parser/helpers": path.resolve(__dirname,"src/packages/helpers/"),
					"@news-parser/config": path.resolve(__dirname,"src/packages/config/"),
					"@news-parser/error-handler": path.resolve(__dirname,"src/packages/error-handler/index.js"),
					"@news-parser/styles":path.resolve(__dirname,"scss/"),
					"@news-parser/pages": path.resolve(__dirname,"src/packages/pages/"),
					"@news-parser/components": path.resolve(__dirname,"src/packages/components/"),
					"@news-parser/entities": path.resolve(__dirname,"src/packages/entities/"),
					"@news-parser/modules": path.resolve(__dirname,"src/packages/modules/"),
					"@news-parser/widgets": path.resolve(__dirname,"src/packages/widgets/"),
					"@news-parser/ui": path.resolve(__dirname,"src/packages/ui/")
				}
		},
		devServer:{
			port:5080,
			host:'0.0.0.0'
			
		}   
	}
}