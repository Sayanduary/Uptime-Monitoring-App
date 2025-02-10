/*

 * Title:Routing
 * Description:Routing
 * Authot:Sayan Duary
 * Date:10.02.25
 
 */


//dependencies

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler')


const routes = {
  'sample': sampleHandler,
};

module.exports = routes;