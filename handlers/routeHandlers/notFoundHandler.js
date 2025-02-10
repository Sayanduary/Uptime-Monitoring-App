const handler = {};

handler.notFoundHandler = (requestProperties, calback) => {
  calback(404, {
    message: 'Your Requested URL was not found'
  });
};

module.exports = handler;