var React = require('react');
var ReactDOM = require('react-dom');

// creates new variable and access the route property
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//components
var Main = require('Main');

// load foundation
// 'css!' is a css loader
//require('./node_modules_folder/foundation-sites/dist/foundation.js');
require('style!css!foundation-sites/dist/foundation.min.css')
$(document).foundation();

// app css
require('style!css!sass!applicationStyles')

ReactDOM.render(
	//router library
	// 'Main' component always gets rendered due to matching the route path
	// hashHistory uses '#' followed by route
	// 'IndexRoute' if the path doesn't recognize other links, then go to the index route path within the 'Main' component
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
		</Route>
	</Router>,
	document.getElementById('app')
);
