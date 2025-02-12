/*

 * Title:Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down userdefined links
 * Author:Sayan Duary
 * Date:10.02.25
 
 */


// creating server--
const http = require('http');



const { handleReqRes } = require('./helpers/handleReqRes')

const environments = require('./helpers/environment')

//Module Scaffolding--
const app = {};

// Config--

app.config = {};

// createServer---

app.createServer = () => {
  const server = http.createServer(app.handleRequestResponse);
  server.listen(environments.port, () => {
    console.log(`Listening to port number ${environments.port}`);
  })
}

// hanlde request objects-- 'Routing'

app.handleRequestResponse = handleReqRes;

app.createServer()

