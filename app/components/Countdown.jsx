var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');

var Countdown = React.createClass({
  // maintain the current count
  getInitialState:function(){
    return {
      count: 0,
      countdownStatus: 'stopped' // maintains current status of Timer
    };
  },
  // updates everytime the state gets updated (such as timer starting)
  componentDidUpdate: function(prevProps, prevState){
    // if the status is "started', then start timer
    if(this.state.countdownStatus !== prevState.countdownStatus){
      switch(this.state.countdownStatus){
        case 'started':
          this.startTimer();
          break;
      }
    }
  },
  startTimer:function(){
    this.timer = setInterval(() => {
      // calculate the new count (decreasing)
      var newCount = this.state.count - 1;
      this.setState({
        // if newCount >= 0, if not, set newCount to be 0
        count:newCount >= 0 ? newCount : 0
      });
    }, 1000);
  },
  // called once valid form is submitted with data
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started' // start countdown process
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
