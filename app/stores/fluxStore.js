import AppDispatcher from '../dispatcher/AppDispatcher';
import appConstants from '../constants/appConstants';
import objectAssign from 'react/lib/Object.assign';
var EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';

let _store = {
  list: ['']
};

let addItem = function(item){
  _store.list.length=0;
  _store.list.push(item);
};


let removeItem = function(index){
  _store.list.splice(index, 1);
}

let fluxStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getList: function(){
    return _store.list;
  },
  getFiles: function(){
    return _store.files;
  },
});

AppDispatcher.register(function(payload){
  let action = payload.action;
  switch(action.actionType){
    case appConstants.SEND_DATA:
      addItem(action.data);
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