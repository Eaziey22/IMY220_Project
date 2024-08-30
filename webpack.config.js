const path = require("path");

module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve(__dirname, 'frontend',"public"),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                        loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, // For handling CSS files
                use: [
                  'style-loader', // Injects styles into DOM
                  'css-loader',   // Interprets @import and url() like import/require()
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // For handling image files
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[hash].[ext]', // File name format
                      outputPath: './frontend/public/assets/images', // Output directory
                    },
                  },
                ],
              },
        ]
    }
}