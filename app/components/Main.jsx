var React = require('react');
var Navigation = require('Navigation');

// stateless function since this simple component only renders to screen
// can use stateless function because they only define the render method and don't maintain any state
var Main = (props) => {
	return(
		<div>
			<div>
				<div>
					<Navigation/>
					<p>Main.jsx rendered</p>
					{props.children}
				</div>
			</div>
		</div>
	);
}

module.exports = Main;
