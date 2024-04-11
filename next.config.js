/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Добавляем правило для обработки бинарного модуля canvas.node
        config.module.rules.push({ test: /\.node$/, use: 'raw-loader' });

        // Исключаем canvas из обработки Next.js в браузере
        if (!isServer) config.externals.push('canvas');

        if (!isServer) {
            config.resolve.alias = {
              'fluent-ffmpeg': false
            };
          }

          config.plugins.push(
            new webpack.DefinePlugin({
              'process.env.FLUENTFFMPEG_COV': false
            })
          );

        return config;
    }
};

module.exports = nextConfig;