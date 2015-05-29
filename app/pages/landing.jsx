import React from 'react';
import UrlInput from '../components/urlInput.jsx';

const Landing = React.createClass({
  render () {
    return (
      <div>
        <p>This is the landing page</p>
        <UrlInput/>
      </div>
    );
  }
});

export default Landing;