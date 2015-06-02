var React = require('react');
var Dropzone = require('../../lib/dropzone');

var dropzone = React.createClass({
    getInitialState: function () {
      return {
        files: []
      };
    },

    onDrop: function (files) {
      console.log('Received files: ', files);
      this.setState({
        files: files
      });
    },

    showFiles: function () {
      if (this.state.files.length <= 0) {
        return '';
      };

      var files = this.state.files;

      return (
        <div>
          <h3>Dropped files: </h3>
          <ul>
            {[].map.call(files, function (f, i) {
              return <li key={i}>{f.name + ' : ' + f.size + ' bytes.'}</li>
            })}
          </ul>
        </div>
        );
    },

    onclick: function(){

    },

    render: function () {
      var styling = {
        // padding: 30,
        float: "left"
      };

      return (
          <div >
          <div style={styling}>
            <Dropzone onDrop={this.onDrop} size={150} onClick={this.onclick}>
              <textarea ref="content" placeholder="js/html"/>
            </Dropzone>
            </div>
            <div style={styling}>
            <Dropzone onDrop={this.onDrop} size={150} onClick={this.onclick}>
              <textarea ref="content" placeholder="css"/>
            </Dropzone>
            </div>
            {this.showFiles()}
          </div>
      );
    }
});

// React.render(<DropzoneDemo />, document.body);

module.exports = dropzone;