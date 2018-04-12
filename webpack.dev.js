const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js'
    },
    plugins: [
        /*new CleanWebpackPlugin(['dist']),*/
        new HtmlWebpackPlugin({             
                template: './src/tpl/main.html',
                filename: 'main.html'
        })
    ],
    devServer: {
        contentBase : "./dist",  //访问路径
        compress: true,
        port: 80,  // 端口
        inline: true,
        host: '127.0.0.1', //主机
        disableHostCheck: true,  //不检查host地址
        public: 'adsys.treebear.cn',  //devserver 自动打开的url地址。
        proxy: {
            '/rest/*': {
                changeOrigin: false,
                target: 'http://api.adsys.treebear.cn',
                secure: false
            }
        }
    },  
    module: {
        rules: [{
            test: /\.js[x]$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query:{presets: ['es2015']}
                
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=./images/[hash:8].[name].[ext]'             
                
        }]
    }
}