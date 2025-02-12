/*
 * Title: Handle Request and Response
 * Description: Handles HTTP Requests and sends appropriate responses
 * Author: Sayan Duary
 * Date: 10.02.25
 */

// Dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url'); // Parse request URL
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // Parsing the URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  const decoder = new StringDecoder('utf-8');

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headersObject,
  };

  let realData = '';

  const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on('end', () => {
    realData += decoder.end();

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // Return the final response
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(payloadString);
    });
  });
};

module.exports = handler;
