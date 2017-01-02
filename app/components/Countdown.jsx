var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  // maintain the current count
  getInitialState:function(){
    return {count: 0};
  },
  // called once valid form is submitted with data
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds
    });
  },
  render: function(){
    // grab the count
    var {count} = this.state;

    return(
      <div>
        <Clock totalSeconds={count}/>
        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      </div>
    )
  }
});

module.exports = Countdown;
