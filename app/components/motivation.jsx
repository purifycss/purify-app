import React from 'react';

const Motivation = React.createClass({
  render() {
    let styling = {
      color: "rgb(248,248,255)"
    };

    return (
      <div style = {styling}>
        <section id="one" class="main special">
          <div class="container">
          <div class="content">
            <header class="major">
              <h2 style={styling}>Motivation</h2>
            </header>
            <p>Purify CSS is able to detect dynamically-loaded CSS classes (classes that get initialized according to user interaction). PurifyCSS has been designed from the beginning with single-page apps in mind (works great for static sites too). 
            </p>
            <p>Drag and drop files below, as well as input css and js/html content to their respective input box to view how purify css can help you optimize your application.
              First, drag and drop all files to be purified into the boxes below.  Additionally, you may copy and paste content into the respective input box to be purifed as well.  Click <b>PURIFY</b> to generate the purfied css file, and click <b>DOWNLOAD FILE</b> to retrieve purified css file from all inputs.
            </p>
          </div>
        </div>
      </section>
      </div>
    );
  }
});

export default Motivation;