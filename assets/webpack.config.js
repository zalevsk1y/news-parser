var webpack = require('webpack');
const path = require("path");
const devServer=require("./devServer/devServer.js");
const VERSION=(require("./package.json").version);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
	devtool: 'source-map',
	mode:'production',
    entry:{
        parser_rss:'./src/packages/parser-rss/src/index.js'
    },
    output:{
				path:path.resolve(__dirname,'../public/js/'),
				publicPath:path.resolve(__dirname,'../public/js/'),
        		filename:`[name]-${VERSION}.bundle.js`
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
		new MiniCssExtractPlugin({
			filename: `../css/[name]-${VERSION}.css`
		})
    ],
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
				"@news-parser/image":path.resolve(__dirname,"src/packages/image/src/")
			}
	},
	devServer:{
		port:9001,
		contentBase: [path.resolve(__dirname, '../public/'),path.join(__dirname,'devServer/assets')],
		index:path.join(__dirname, 'devServer/index.html'),
		before:devServer
	}   
}