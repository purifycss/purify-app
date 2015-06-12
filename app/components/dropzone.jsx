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
      val: fluxStore.getList()
    };
  },

  onDrop: function(files) {

    var _files = this.state.files;
    var _content = this.state.content;
    var _css = this.state.css;

    files.forEach(function(file) {
      
      var reader = new FileReader();

      reader.onload = function(e) {
        var text = reader.result;

        //check for file extension
        if (file.name.indexOf('.js') !== -1) {
          _content.push(text);
          _files.push(file);
        } else if(file.name.indexOf('.css') !== -1){
          _css.push(text);
          _files.push(file);
        }else{
          alert('file is not .js or .css')
        }

      }

      reader.readAsText(file, 'utf-8');

    })

    this.setState({
      files: _files,
      content: _content,
      css: _css
    })

  },

  showFiles: function() {
    if (this.state.files.length <= 0) {
      return '';
    };

    var files = this.state.files;

    return ( 
      <div>
      <h3> Dropped files: </h3> 
        <ul> 
        {
          [].map.call(files, function(f, i) {
          return 
            <li key = {i}> 
              {f.name + ' : ' + f.size + ' bytes.'} 
            </li>
            })
        } 
        </ul> 
      </div >
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

    //check if there's any content and css
    if((input.content.length !== 0) && (input.css.length !== 0)){
      fluxActions.sendItem(input);
    }

  },
  _onChange: function() {
    this.setState({
      list: fluxStore.getList()
    })
  },

  render: function() {
    var styling = {
      padding: 5,
      float: "left",
      height:600
    };

    var clearfloat = {
      clear: "both"
    };

    var drop = {
      height: 600,
      width: 600
    }

    return ( 
      <div>
        <div style = {styling}>
          <Dropzone onDrop = {this.onDrop} style={drop} onClick = {this.onclick}>
            <textarea ref = "content" placeholder = "js/html"/>
          </Dropzone>  
        </div> 

      <div style = {styling}>
        <Dropzone onDrop = {this.onDrop} style={drop} onClick = {this.onclick}>
          <textarea ref = "css" placeholder = "css" />
        </Dropzone>  
      </div> 
      
      <button onClick = {this.handleSendItem}> Submit </button>  
      <p> {this.state.val} </p>  
      {this.showFiles()} 

      <div style={clearfloat}></div>

      </div>
    );
  }
});

module.exports = dropzone;