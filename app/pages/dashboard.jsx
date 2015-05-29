import React from 'react';
import Metric from '../components/metric.jsx';

const DashBoard = React.createClass({
  render() {
    return (
      <div>
        <p>This is the dashboard page</p>
        <Metric/>
      </div>
    );
  }
});

export default DashBoard;