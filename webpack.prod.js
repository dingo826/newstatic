const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname+'/pDist/view',
        filename: 'index.js'
    },
    plugins: [
        new CleanWebpackPlugin(['pDist']),
        new HtmlWebpackPlugin({             
                template: './src/tpl/main.html',
                hash: true,
                filename: 'main.html'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/adsys/',
                to: __dirname+ '/pDist/view/adsys'
            },{
                from: './src/login.html',
                to: __dirname+ '/pDist/view'
            },
        ], {
            ignore: [],
            copyUnmodified: true,
            debug:"debug"
        })
    ], 
    module: {
        rules: [{
            test: /\.js[x]$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{presets: ['es2015']}
                
        },{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=.adsys/images/[hash:8].[name].[ext]'             
                
        }]
    }
}