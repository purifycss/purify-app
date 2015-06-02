var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var Api = require('../apiUtil/Api');

var fluxActions = {
  sendItem: function(content) {
    Api
      .get('/api/purify',content)
      .then(function(data) {
        AppDispatcher.handleViewAction({
          actionType: appConstants.SEND_DATA,
          data: data
        });
      })
      .catch(function() {
        AppDispatcher.handleViewAction({
          actionType: appConstants.RECEIVE_ERROR,
          error: 'There was a problem getting the categories'
        });
      });
  },

  addItem: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index) {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  }
};

module.exports = fluxActions;