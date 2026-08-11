/**
 * logger.js — Request logging middleware.
 *
 * Records the method, URL, resulting status code, and how long the request
 * took. It hooks the response's 'finish' event so the status code is already
 * known by the time the line is printed.
 *
 * Mounted once in server.js with app.use(logger), so it runs on every request.
 */

function logger(req, res, next) {
  const startedAt = Date.now();

  // 'finish' fires after the response has been fully sent to the client.
  res.on('finish', function () {
    const duration = Date.now() - startedAt;
    const timestamp = new Date().toISOString();

    console.log(
      '[' + timestamp + '] ' +
      req.method + ' ' + req.originalUrl + ' -> ' +
      res.statusCode + ' (' + duration + 'ms)'
    );
  });

  // Hand control to the next middleware or route handler.
  next();
}

module.exports = logger;
