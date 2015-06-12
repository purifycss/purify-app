import AppDispatcher from '../dispatcher/AppDispatcher';
import appConstants from '../constants/appConstants';
import Api from '../apiUtil/Api';

const fluxActions = {
  sendItem: (content) => {
    Api
      .get('/api/purify',content)
      .then((data) => {
        AppDispatcher.handleViewAction({
          actionType: appConstants.SEND_DATA,
          data: data
        });
      })
      .catch(() => {
        AppDispatcher.handleViewAction({
          actionType: appConstants.RECEIVE_ERROR,
          error: 'There was a problem getting the categories'
        });
      });
  },

  addItem: (item) => {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },

  removeItem: (index) => {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    })
  }
};

export default fluxActions;