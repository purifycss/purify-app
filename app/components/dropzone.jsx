var React = require('react');
var Dropzone = require('../../lib/dropzone');

var fluxStore = require('../stores/fluxStore.js');
var fluxActions = require('../actions/fluxActions.js');

var dropzone = React.createClass({
  getInitialState: function() {
    return {
      files: [],
      val: fluxStore.getList()
    };
  },

  onDrop: function(files) {
    console.log('Received files: ', files);
    this.setState({
      files: files
    });
  },

  showFiles: function() {
    if (this.state.files.length <= 0) {
      return '';
    };

    var files = this.state.files;

    return ( < div >
      < h3 > Dropped files: < /h3> < ul > {
        [].map.call(files, function(f, i) {
          return <li key = {
            i
          } > {
            f.name + ' : ' + f.size + ' bytes.'
          } < /li>
        })
      } < /ul> < /div>
    );
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
    var input = {
      content: content,
      css: css
    };

    fluxActions.sendItem(input);
  },
  _onChange: function() {
    this.setState({
      list: fluxStore.getList()
    })
  },

  render: function() {
    var styling = {
      // padding: 30,
      float: "left"
    };

    return ( < div >
      < div style = {styling} >
      < Dropzone onDrop = {this.onDrop} size = {150}
      onClick = {this.onclick} >
      < textarea ref="content" placeholder = "js/html" / >
      < /Dropzone> < /div> 
      < div style = {styling} >
      < Dropzone onDrop = {this.onDrop} size = {150}
      onClick = {this.onclick} >
      < textarea ref="css" placeholder = "css" / >
      < /Dropzone> < /div> 
      < button onClick = {this.handleSendItem}>Submit</button> 
      < p > {this.state.val} </p> {this.showFiles()} < /div>
    );
  }
});

module.exports = dropzone;