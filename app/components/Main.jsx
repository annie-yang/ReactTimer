var React = require('react');
var Navigation = require('Navigation');

// stateless function since this simple component only renders to screen
// can use stateless function because they only define the render method and don't maintain any state
var Main = (props) => {
	return(
		<div>
			<Navigation/>
			<div className="row">
				<div className="column small-centered medium-6 large-4">
					{props.children}
				</div>
			</div>
		</div>
	);
}

module.exports = Main;
