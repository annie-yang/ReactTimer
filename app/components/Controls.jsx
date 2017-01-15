var React = require('react');

var Controls = React.createClass({
  /*
    'Controls' is going to be passed by countdownStatus, since it needs to dynamically render buttons
    when 'countdownStatus' has started, we want to render the 'pause' button
    when 'countdownStatus' is paused, we want to render the 'start' button
    controls component is going to get a prop passed down, so use 'propTypes'
  */
  propTypes:{
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function(newStatus){
    return() =>{
      this.props.onStatusChange(newStatus);
    }
  },
  render:function(){
    // load in the 'countdownStatus' property to properly render the buttons
    var {countdownStatus} = this.props;

    var renderStartStopButton = () => {
        if(countdownStatus === 'started'){
          // render pause button if started
          return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
        }else {
          // otherwise render start button
          return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
        }
    };

    // return value of 'renderStartStopButton'
    return(
      <div className="controls">
        {renderStartStopButton()}
        <button className="button alert hollow"onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    )
  }
});

module.exports = Controls;
