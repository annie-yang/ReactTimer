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
    gets fired right after an update to application either to props or state
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
          this.setState({count: 0}); // reset time to 0 and clear timer
        case 'paused':
          clearInterval(this.timer) // cancel 'setInterval' call
          this.timer = undefined; // leave the count wherever it was
          break;
      }
    }
  },
  /*
    automatically gets fired by React right before the component gets removed from the DOM
    visually removed from the browser
    switching tabs (component gets removed)
  */
  componentWillUnmount:function(){
    clearInterval(this.timer); // clear timer
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

      // if the newCount has reached the end, stop the countdown (can view from console)
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
  // when new status gets passed in from 'Controls', it will be responsible for properly handling it
  handleStatusChange: function(newStatus){
    this.setState({countdownStatus: newStatus}); // update the state
  },
  render: function(){
    // grabs the 'count' and 'countdownStatus'
    var {count, countdownStatus} = this.state;

    // renders 'Controls' component or 'CountdownForm' component
    var renderControlArea =  () => {
      // if it's not 'stopped', then it is either 'started' or 'paused'
      if(countdownStatus !== 'stopped'){
        /*
          render the 'Controls'
          'onStatusChange' is the function to call when button gets clicked
        */
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

/*
  NOTES:
    gets fired before the fact
    takes in next props and next state

    componentWillUpdate: function(nextProps, nextState){

    },

    ------------------------------------------------
    component always get fired first
    gets loaded when switching tabs
    component gets rendered to the screen, the component will mount and lifecycle method gets called

    componentWillMount: function(){
      console.log('componentWillMount');
    },

    ------------------------------------------------
    gets fired right after everything gets rendered in the DOM
    gets fired after "componentWillMount"
    access to any refs if want to do any updating

    componentDidmount:function(){
      console.log('componentDidmount');
    },
*/
