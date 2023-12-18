    const path = require('path');

    module.exports = {
    mode: 'production', // or 'development'
    entry: './src/index.js',
    output: {
        filename: 'my-react-sdk.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'MyReactSDK',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                },
              },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
            {
                loader: 'file-loader',
                options: {
                outputPath: 'images', // Output images to the 'images' directory
            },},]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
    };