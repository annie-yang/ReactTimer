var React = require('react');

// makes sure data is valid
var CountdownForm = React.createClass({
  onSubmit: function(e){
    e.preventDefault();
    var strSeconds = this.refs.seconds.value;

    console.log('input count', $('input').length);
    
    if(strSeconds.match(/^[0-9]*$/)){ // regular expressions
      // clear text
      this.refs.seconds.value = '';

      // calling parent function
      // 10 specifies the base (using standard numbers)
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  },
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
