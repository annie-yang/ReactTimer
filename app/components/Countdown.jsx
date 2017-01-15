var React = require('react');

// components
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  /*
    maintain the current count
    count that should be shown on the clock
  */
  getInitialState:function(){
    return {
      count: 0,
      /*
        maintains current status of Timer
        status is either stopped, paused, or started
        by default, the status will be stopped
      */
      countdownStatus: 'stopped'
    };
  },
  /*
    updates everytime the state gets updated (such as timer starting)
    listens to state change
  */
  componentDidUpdate: function(prevProps, prevState){
    /*
      if the status is "started', then start timer
      if the status is not equal to the prevState.countdownStatus, it can be either started, stopped, or paused case
    */
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
  // starts timer using 'setInterval' after a certain amount of time
  startTimer:function(){
    /*
      gives access to variable to where the user can clear it later when clicked paused or clear button
      'setInterval' defines a function that gets called every second
    */
    this.timer = setInterval(() => {
      /*
        compute the new count (decreasing)
        take old count and subtract by 1
        runs every second
      */
      var newCount = this.state.count - 1;

      this.setState({
        /*
          set count equal to newCount IF newCount is >= 0,
          if not >= 0, set it to 0 assuming it reached the end
        */
        count: newCount >= 0 ? newCount : 0 // iternary operator
      });

      // if the newCount has reached the end, stop the countdown
      if(newCount === 0){
          this.setState({countdownStatus: 'stopped'});
      }
    }, 1000); // have countdown wait one second to count down(1000ms)
  },
  /*
    gets called once the form is submitted with valid data
    pass in new number of 'seconds'
    have the countdown component interact with CountdownForm component
    when user submits the 'CountdownForm', it uses 'this.setState' to update the count to whatever seconds the user typed in
  */
  handleSetCountdown: function(seconds){
    // handles state
    this.setState({
      count: seconds,

      /*
        start countdown process
        call 'componentDidUpdate' method --> 'this.state.countdownStatus' = started and 'prevState.countdownStatus' = stopped
      */
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function(newStatus){
    this.setState({countdownStatus: newStatus});
  },
  render: function(){
    // grabs the count
    var {count, countdownStatus} = this.state;

    var renderControlArea =  () => {
      if(countdownStatus !== 'stopped'){
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}></Controls>;
      } else{
        // 'onSetCountdown' defines which function to call on current class when the child calls that function
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
      }
    };
    // 'count' in 'Clock' will rerender the component and show the proper time from 'handleSetCountdown'
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
