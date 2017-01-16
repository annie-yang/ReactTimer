var React = require('react');

// loading in component
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  // define initial state for component
  getInitialState: function(){
    return{
      count: 0, // start count at 0
      timerStatus: 'stopped' // maintain current status
    };
  },
  componentDidUpdate: function(prevProps, prevState){
    // check if the new timer status is not the same as the old timer status
    if(this.state.timerStatus !== prevState.timerStatus){
      switch(this.state.timerStatus){
        case 'started':
          this.handleStart();
          break;
        case 'stopped':
          this.setState({count:0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount:function(){
    // clear the timer as the timer component gets removed from the screen
    clearInterval(this.timer);
  },
  // start the interval
  handleStart: function(){
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1 // keep adding 1 to the count
      });
    }, 1000);
  },
  // takes in the new timer status
  handleStatusChange: function(newTimerStatus){
    // console.log(newTimerStatus);
    this.setState({
      timerStatus: newTimerStatus // change timerStatus to whatever gets passed in
    });
  },
  render: function(){
    // pulling off 'this.state' object
    var{count, timerStatus} = this.state;

    return(
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count}></Clock>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}></Controls>
      </div>
    )
  }
});

module.exports = Timer;
