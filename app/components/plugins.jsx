import React from 'react';

const Plugins = React.createClass({
  render() {
    return (
      <div>
        <section id="three" class="main special">
        <div class="container">
 
          <div class="content">
            <header class="major">
              <h2>NPM PLUGINS</h2>
            </header>
    
            <ul class="icons-grid">
              <div>
                <span class="icon major fa-camera-retro"></span>
                <h3>Github</h3>
              </div>
              <div>
                <span class="icon major fa-pencil"></span>
                <h3>Weback</h3>
              </div>
              <div>
                <span class="icon major fa-code"></span>
                <h3>Grunt</h3>
              </div>
              <div>
                <span class="icon major fa-coffee"></span>
                <h3>Gulp</h3>
              </div>
            </ul>
          </div>
   
         </div>
        </section>

      </div>
    );
  }
});

export default Plugins;