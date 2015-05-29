var React = require('react');
var App = require('./App.jsx');


React.render(<App/>, document.body);

//routing stuff
// var routes = (
//   <Route handler={App} path="/">
//     <DefaultRoute handler={Home} />
//     <Route name="about" handler={About} />
//     <Route name="users" handler={Users}>
//       <Route name="recent-users" path="recent" handler={RecentUsers} />
//       <Route name="user" path="/user/:userId" handler={User} />
//       <NotFoundRoute handler={UserRouteNotFound}/>
//     </Route>
//     <NotFoundRoute handler={NotFound}/>
//     <Redirect from="company" to="about" />
//   </Route>
// );

// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.body);
// });

// // Or, if you'd like to use the HTML5 history API for cleaner URLs:

// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.body);
// });