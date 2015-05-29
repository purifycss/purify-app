var React = require('react');
var Landing = require('./pages/landing.jsx');
var DashBoard = require('./pages/dashboard.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is Application</p>
        <Landing/>
        <DashBoard/>
      </div>
    );
  }
});