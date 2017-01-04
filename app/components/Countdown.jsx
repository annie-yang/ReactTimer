var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

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
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer)
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount:function(){
    clearInterval(this.timer);
    this.timer = undefined; // clean up variable
  },
  startTimer:function(){
    this.timer = setInterval(() => {
      // calculate the new count (decreasing)
      var newCount = this.state.count - 1;
      this.setState({
        // if newCount >= 0, if not, set newCount to be 0
        count:newCount >= 0 ? newCount : 0
      });
      if(newCount === 0){
          this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  // called once valid form is submitted with data
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started' // start countdown process
    });
  },
  handleStatusChange: function(newStatus){
    this.setState({countdownStatus: newStatus});
  },
  render: function(){
    // grab the count
    var {count, countdownStatus} = this.state;
    var renderControlArea =  () => {
      if(countdownStatus !== 'stopped'){
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}></Controls>;
      } else{
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };
    return(
      <div>
        <h1 className="page-title">Countdown</h1> 
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Countdown;
