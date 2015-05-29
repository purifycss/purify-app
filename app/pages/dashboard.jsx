var React = require('react');
var Metric = require('../components/metric.jsx');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is the dashboard page</p>
        <Metric/>
      </div>
    );
  }
});