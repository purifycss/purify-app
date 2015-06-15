import React from 'react';
import Dropzone from '../../lib/dropzone';

import fluxStore from '../stores/fluxStore.js';
import fluxActions from '../actions/fluxActions.js';

var dropzone = React.createClass({
  getInitialState: function() {
    return {
      files: [],
      content: [],
      css: [],
      message: fluxStore.getList()
    };
  },

  onDrop: function(files) {
    var self = this;

    var _files = this.state.files;
    var _content = this.state.content;
    var _css = this.state.css;

    files.forEach(function(file) {
      
      var reader = new FileReader();

      reader.onload = function(e) {
        var text = reader.result;

        //check for file extension
        if (file.name.indexOf('.css') !== -1) {
          _css.push(text);
        }else{
          _content.push(text);
        }
        
        _files.push(file);

        //update state
        self.setState({
          files: _files,
          content: _content,
          css: _css
        })
      }

      reader.readAsText(file, 'utf-8');

    })

  },

  showFiles: function() {
    if (this.state.files.length <= 0) {
      return '';
    };

    var files = this.state.files;

    return (
      <div>
        <h3>Dropped files: </h3>
        <ul>
          {[].map.call(files, function (f, i) {
            return <div key={i}>{f.name + ' : ' + f.size + ' bytes.'}</div>;
          })}
        </ul>
      </div>
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

    //add to global content/css
    var _content = this.state.content;
    var _css = this.state.css;

    if(content !== ''){
    _content.push(content);
      
    }

    if(css !== ''){
    _css.push(css);
      
    }

    //update state
    this.setState({
      content: _content,
      css: _css
    })

    //send to server
    var input = {
      content: this.state.content,
      css: this.state.css
    };

    //only send to server if there's content and css
    if((input.content.length !== 0) && (input.css.length !== 0)){
      fluxActions.sendItem(input);
    }

  },
  _onChange: function() {
    this.setState({
      message: fluxStore.getList()
    })

  },

  render: function() {
    var dropArea = {
      padding: 5,
      float: "left"
    };

    var clearfloat = {
      clear: "both"
    };

    var textArea = {
      height: 600,
      width: 600,
      color: "rgb(248,248,255)"
    }

    return ( 
      <div>
        <div style = {dropArea}>
          <Dropzone onDrop = {this.onDrop} size={600} onClick = {this.onclick}>
            <textarea style = {textArea} ref = "content" placeholder = "js/html"/>
          </Dropzone>  
        </div> 

      <div style = {dropArea}>
        <Dropzone onDrop = {this.onDrop} size={600} onClick = {this.onclick}>
          <textarea style = {textArea} ref = "css" placeholder = "css" />
        </Dropzone>  
      </div> 
      
      <button onClick = {this.handleSendItem}> Submit </button>  
      
      <p> {this.state.message[0].before} </p> 
      <p> {this.state.message[0].after} </p> 
      <p> {this.state.message[0].compare} </p> 

      {this.showFiles()} 

      <div style={clearfloat}></div>

      </div>
    );
  }
});

module.exports = dropzone;