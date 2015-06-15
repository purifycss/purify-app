import React from 'react';

const UrlInput = React.createClass({
  
  render() {
    return (
      <div>
        <input type="text" ref="url"></input>
        <button onClick={this.purifyUrl}>Purify</button>
      </div>
    );
  }
});

export default UrlInput;
