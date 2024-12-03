const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js", // React app entry point
    },
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"), // Output everything to 'dist' directory
        filename: "js/[name].bundle.js", // JavaScript files go into 'dist/js/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Match JavaScript and JSX files
                exclude: /node_modules/,
                use: ["babel-loader"], // Use Babel for transpiling
            },
            {
                test: /\.css$/, // Match CSS files
                use: ["style-loader", "css-loader"], // Load CSS files
            },
        ],
    },
    plugins: [
        // Generate HTML files for each entry point
        ...getHtmlPlugins(["index"]),
        // Copy static files to the root of 'dist'
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "manifest.json" }
            ],
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"], // Resolve JavaScript and JSX extensions
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"), // Serve content from 'dist'
        },
        compress: true,
        port: 3000, // Development server port
    },
};

// Helper function to generate HTML plugins
function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "React Chrome Extension",
                filename: `${chunk}.html`, // Output HTML files into 'dist'
                chunks: [chunk],
            })
    );
}
