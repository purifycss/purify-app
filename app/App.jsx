"use-strict"

import React from 'react';
import Router, { Route, Link, DefaultRoute, RouteHandler } from "react-router";

import Landing from './pages/landing.jsx';
import DashBoard from './pages/dashboard.jsx';
import Dropzone from './components/dropzone.jsx';
import Motivation from './components/motivation.jsx';
import Title from './components/title.jsx';
import Footer from './components/footer.jsx';
import Plugins from './components/plugins.jsx';

const App = React.createClass({
  render() {
    return (
      <div>
        <Title/>
        <Motivation/>
        <Dropzone/>
        <Plugins/>
        <Footer/>
     
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
    <Route name="input" handler={Dropzone} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
