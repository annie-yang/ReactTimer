var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    // expect pause button to show up when countdownStatus is 'started'
    it('should render pause when started', () => {
      // check the actual DOM output, to make sure what the user sees is correct
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);

      var $el = $(ReactDOM.findDOMNode(controls));

      /*
        search for a button that contains "pause"
        select the pause button inside of $el, if we find it then test is passed
        ':contains' lets you check the text value
      */
      var $pauseButton = $el.find('button:contains(Pause)');

      /*
        assert the button was found with the text of 'pause'
        '.length' is equal to the number of buttons found --> 1) start 2) pause 3) clear
      */
      expect($pauseButton.length).toBe(1);
    });

    it('should render start when paused', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused"/>);
      var $el = $(ReactDOM.findDOMNode(controls));

      // search for a button who's text is start
      var $pauseButton = $el.find('button:contains(Start)');

      expect($pauseButton.length).toBe(1);
    });
  });
});
