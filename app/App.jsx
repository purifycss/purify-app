"use-strict"

import React from 'react';
import Router, { Route, Link, DefaultRoute, RouteHandler } from "react-router";

import Landing from './pages/landing.jsx';
import DashBoard from './pages/dashboard.jsx';
import Input from './components/dropzone.jsx';

const App = React.createClass({
  render() {
    return (
      <div>
        <head>
    <title>Purify CSS</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" href="../assets/css/main.css" />

  </head>

      <section id="header">
        <header class="major">
          <h1>Purify CSS</h1>
          <p>Remove dead weight CSS not being used in your app</p>
        </header>
        <div class="container">
          <ul class="actions">

          </ul>
        </div>
      </section>

 
      <section id="one" class="main special">
        <div class="container">
          <div class="content">
            <header class="major">
              <h2>Vis leo ut</h2>
            </header>
            <p>Aliquam ante ac id. Adipiscing interdum lorem praesent fusce pellentesque arcu feugiat. Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum lorem blandit vis ac commodo aliquet integer vulputate phasellus lorem ipsum dolor lorem magna consequat sed etiam adipiscing interdum.</p>
          </div>

        </div>
      </section>

  
      <section id="three" class="main special">
        <div class="container">
 
          <div class="content">
            <header class="major">
              <h2>Vis eget augue</h2>
            </header>
            <p>hello world</p>
                    <p><Link to="input"></Link></p>
        <RouteHandler/>
          </div>
    
        </div>
      </section>

     <div></div>



      <section id="two" class="main special">
        <div class="container">
  
          <div class="content">
            <header class="major">
              <h2>NPM PLUGINS</h2>
            </header>
            <p>Consequat sed ultricies rutrum. Sed adipiscing eu amet interdum lorem blandit vis ac commodo aliquet vulputate.</p>
            <ul class="icons-grid">
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

      <section id="footer">
        <div class="container">
          <header class="major">
    
          </header>
          <form method="post" action="#">
            <div class="row uniform">
              <div class="6u 12u$(xsmall)"><input type="text" name="name" id="name" placeholder="Name" /></div>
              <div class="6u$ 12u$(xsmall)"><input type="email" name="email" id="email" placeholder="Email" /></div>
              <div class="12u$"><textarea name="message" id="message" placeholder="Message" rows="4"></textarea></div>
              <div class="12u$">
                <ul class="actions">
                  <div><input type="submit" value="Send Message" class="special" /></div>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <footer>

          <ul class="copyright">
            <div>&copy; Purify CSS</div>
          </ul>
        </footer>
      </section>
      </div>
    );
  }
});

export default App;

// setup routes
const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="input" handler={Input} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});


