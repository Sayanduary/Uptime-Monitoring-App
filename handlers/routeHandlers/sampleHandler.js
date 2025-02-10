/*

 * Title:Sample Handlers
 * Description:Sample Handlers
 * Author:Sayan Duary
 * Date:10.02.25
 
 */

const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  
  callback(200, {
    message: 'This is a sample url'
  });

};

module.exports = handler;