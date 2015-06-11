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

        <p><Link to="input">Drag & Drop</Link></p>
        <RouteHandler/>

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
                  <li><input type="submit" value="Send Message" class="special" /></li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <footer>
          <ul class="copyright">
            <li>&copy; Purify CSS</li>
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
    <Route name="landing" handler={Landing} />
    <Route name="dashboard" handler={DashBoard} />
    <Route name="input" handler={Input} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
