const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://i6c202.p.ssafy.io:8080",
      changeOrigin: true,
    })
  );
};
