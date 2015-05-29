var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Landing = require('./pages/landing.jsx');
var DashBoard = require('./pages/dashboard.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <p>This is Application</p>
        <p><Link to="landing">Landing</Link></p>
        <p><Link to="dashboard">Dashboard</Link></p>

        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;

// routing stuff
var routes = (
  <Route handler="app" path="/" handler={App}>
    <Route name="landing" handler={Landing} />
    <Route name="dashboard" handler={DashBoard} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
