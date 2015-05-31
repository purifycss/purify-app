var React = require('react');

var fluxStore = require('../stores/fluxStore.js');
var fluxActions = require('../actions/fluxActions.js');

var flux = React.createClass({
  getInitialState: function(){
    return {
      list: fluxStore.getList()
    }
  },
  componentDidMount: function(){
    fluxStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    fluxStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    fluxActions.addItem(newItem);
  },
  handleRemoveItem: function(index){
    fluxActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: fluxStore.getList()
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Flux </h3>
          <button onClick={this.handleRemoveItem}/>
          <p>{this.state.list}</p>
        </div>
      </div>
    )
  }
});

module.exports = flux;