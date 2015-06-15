import React from 'react';

const Plugins = React.createClass({
  render() {
    let styling = {
      color: "rgb(248,248,255)"
    };
    return (
      <div>
        <section id="three" class="main special">
        <div class="container">
 
          <div class="content">
            <header class="major">
              <h2 style={styling}>NPM PLUGINS</h2>
            </header>
    
            <ul class="icons-grid">

                <a href='https://github.com/purifycss/purifycss-webpack-plugin'><span id="webpack"></span></a>
   
                <a href='https://github.com/purifycss/grunt-purifycss'><span id="grunt"></span></a>

                <a href='https://github.com/purifycss/gulp-purifycss'><span id="gulp"></span></a>
         
            </ul>
          </div>
   
         </div>
        </section>

      </div>
    );
  }
});

export default Plugins;