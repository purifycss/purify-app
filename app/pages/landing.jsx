var React = require('react');
var UrlInput = require('../components/urlInput.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is the landing page</p>
        <UrlInput/>
      </div>
    );
  }
});