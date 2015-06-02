var React = require('react');

var fluxStore = require('../stores/fluxStore.js');
var fluxActions = require('../actions/fluxActions.js');

var flux = React.createClass({
  getInitialState: function() {
    return {
      val: fluxStore.getList()
    }
  },
  componentDidMount: function() {
    fluxStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    fluxStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem) {
    fluxActions.addItem(newItem);
  },
  handleRemoveItem: function(index) {
    fluxActions.removeItem(index);
  },
  handleSendItem: function() {
    var content = this.refs.content.getDOMNode().value;
    var css = this.refs.css.getDOMNode().value;
    var input = {content:content,css:css};

    fluxActions.sendItem(input);
  },
  _onChange: function() {
    this.setState({
      list: fluxStore.getList()
    })
  },
  update:function(){
    this.setState({val: this.refs.box.getDOMNode().value})

  },
  render: function() {
    return ( < div >

      < h3 > Flux < /h3> 
      <textarea ref="content" placeholder="js/html"/>
      <textarea ref="css" placeholder="css"/>
      < button onClick = {this.handleSendItem}>Submit</button> 
      < p > {this.state.val} </p> 

      < /div>
    )
  }
});

module.exports = flux;