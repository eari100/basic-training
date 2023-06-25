import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

module.exports = function (app: Application) {
    app.use(
        '/v1/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};
