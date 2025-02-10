/*

 * Title:Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down userdefined links
 * Author:Sayan Duary
 * Date:10.02.25
 
 */


// creating server--
const http = require('http');



const { handleReqRes } = require('./helpers/handleReqRes')

//Module Scaffolding--
const app = {};

// Config--

app.config = {
  port: 3000,
}

// createServer---

app.createServer = () => {
  const server = http.createServer(app.handleRequestResponse);
  server.listen(app.config.port, () => {
    console.log(`Listening to port number ${app.config.port}`);
  })
}

// hanlde request objects-- 'Routing'

app.handleRequestResponse = handleReqRes;

app.createServer()

