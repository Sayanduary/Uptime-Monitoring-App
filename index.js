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

const data = require('./lib/data');
//Module Scaffolding--
const app = {};

//testing file system

data.create('test', 'newFile', { Name: 'Sayan Duary', Learning: 'Node JS' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('File created successfully!');
  }
});


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

