const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js" //punto di ingresso della applicazione
    },
    output: {
        path: path.resolve(__dirname, "dist"), //directory di output
        filename: "bundle.js"
    },
    module: { 
        rules: [
            {
                test: /\.css$/, // Per file CSS
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/, // Per immagini
                use: ['file-loader']
            },
            {
                test: /\.js$/, // Per file JavaScript
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // percorso file HTML sorgente
            filename: 'index.html' //file nella cartella di output
          })
    ],
    devServer: {
        port: 5500,
        open: true,
        static: path.resolve(__dirname, "dist"),
    },
    mode: "development"
};
