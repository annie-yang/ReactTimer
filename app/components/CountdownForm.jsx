var React = require('react');

// makes sure data is valid
var CountdownForm = React.createClass({
  onSubmit: function(e){
    e.preventDefault();
    var strSeconds = this.refs.seconds.value; // get value from 'input'

    console.log('input count', $('input').length);

    /*
      make sure 'strSeconds' contains only numbers of 0 - 9
      '.match' expects a regular expression and start and end with forward slash (/ /)
      '*' is allowing many times the user likes (EX: the user can enter as many 0's - 9's)
      '^' start with 0 - 9 characters
      '$' end with 0 - 9 characters

      return data IF there is a match, otherwise return null
    */
    if(strSeconds.match(/^[0-9]*$/)){ // regular expressions to define patterns in a string
      // clear text
      this.refs.seconds.value = '';

      /*
        call parent function
        '10' specifies the base (using standard numbers)

        'onSetCountdown' expects a number and set that number as current count, which will rerender the clock
        passes down to 'Countdown.jsx'
      */
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  },
  // 'onSubmit' function to call when form is submitted
  render:function(){
    return(
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
          <input type="text" ref="seconds" placeholder="Enter time in seconds"></input>
          <button className="button expanded">Start</button>
        </form>
      </div>
    );
  }
});

module.exports = CountdownForm;
