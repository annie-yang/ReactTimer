var React = require('react');

var Clock = React.createClass({
  // set default seconds to 0 if not passed from parent
  getDefaultProps: function () {
    totalSeconds: 0
  },
  propTypes: {
    totalSeconds: React.PropTypes.number
  },
  /*
    formats seconds
    take totalSeconds and break it up into individual seconds and minutes
  */
  formatSeconds: function (totalSeconds) {
    var seconds = totalSeconds % 60; // grab the remainder
    var minutes = Math.floor(totalSeconds / 60); // rounds down to nearest whole number

    // if seconds is less than 10
    if (seconds < 10) {
      seconds = '0' + seconds; // concatenate '0' in front of the number
    }

    // if minutes is less than 10
    if (minutes < 10) {
      minutes = '0' + minutes; // concatenate '0' in front of the number
    }

    return minutes + ':' + seconds; // return minutes and seconds
  },
  render: function () {
    // access to 'totalSeconds' variable
    var {totalSeconds} = this.props;

    return (
      <div className="clock">
        <span className="clock-text">
          /*
            renders using 'formatSeconds'
            'formatSeconds' returns the string and automatically gets rendered inside the span tag
          */
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
});

module.exports = Clock;
