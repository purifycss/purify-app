var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: ['hello','world']
};

var addItem = function(item){
  _store.list.push(item);
};

var addObject = function(data){
  console.log('action data',data);
  data.forEach(function(i){
    _store.list.push(i.test);
  })
  // _store.list.push('added');
  
};

var removeItem = function(index){
  _store.list.splice(index, 1);
}

var fluxStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.SEND_DATA:
      addObject(action.data);
      fluxStore.emit(CHANGE_EVENT);
      break;
    case appConstants.REMOVE_ITEM:
      removeItem(action.data);
      fluxStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = fluxStore;