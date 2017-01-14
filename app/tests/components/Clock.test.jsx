var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Clock = require('Clock');

// group of test for clock component
describe('Clock', () => {
  // make sure the clock variable exists when we required clock
  it('should exist', () => {
    expect(Clock).toExist(); // checks if the clock exists
  });

  // render seconds properly
  describe('render', () => {
    it('should render clock to output', () => {
      // checks the actual output that's rendered into the DOM
      var clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);

      /*
        store the root of the component inside the DOM
        converts component into actual HTML that's rendered into the browser
      */
      var $el = $(ReactDOM.findDOMNode(clock));

      /*
        what actually renders when rendering clock component
        pull the text value out
      */
      var actualText = $el.find('.clock-text').text();

      // makes assertion
      expect(actualText).toBe('01:02');
    });
  });

  describe('formatSeconds', () => {
    it('should format seconds', () => {
      /*
        render component, so we are able to access the methods on it
        'renderIntoDocument' renders the Clock component and returns the component back so we can do stuff with it
      */
      var clock = TestUtils.renderIntoDocument(<Clock/>);
      var seconds = 615; // number of seconds to pass in (10 min and 15 sec.)
      var expected = '10:15'; // expect to return 10 min and 15 secs. back
      var actual = clock.formatSeconds(seconds);

      expect(actual).toBe(expected); // expect 10:15 to be 10:15
    });

    it('should format seconds when min/sec are less than 10', () => {
      var clock = TestUtils.renderIntoDocument(<Clock/>);
      var seconds = 61;
      var expected = '01:01';
      var actual = clock.formatSeconds(seconds);

      expect(actual).toBe(expected);
    });
  });
});
