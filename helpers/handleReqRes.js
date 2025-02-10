/*

 * Title:Handle Request and Responds
 * Description: Handle Request and Responds
 * Authot:Sayan Duary
 * Date:10.02.25
 
 */


// dependencies
const { StringDecoder } = require('string_decoder');

const url = require('url'); // request url path

const { buffer, json } = require('stream/consumers');

const routes = require('../routes')

const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

const { type } = require('os');

// Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {


  // request handling
  // parisng the url 


  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
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
    headersObject,
  }
  let realData = '';

  const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

  choosenHandler(requestProperties, (statusCode, playload) => {

    statusCode = typeof (statusCode) === 'number' ? statusCode : 500;

    playload = typeof (playload) === 'object' ? playload : {};

    const playloadString = JSON.stringify(playload);

    // return the final response

    res.writeHead(statusCode);
    res.end(playloadString);

  })


  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  })

  req.on('end', () => {
    realData += decoder.end();
    res.end('Hello Programmers');
  })

  // responds handle
}

module.exports = handler;