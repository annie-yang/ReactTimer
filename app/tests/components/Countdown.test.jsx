var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Countdown = require('Countdown');

describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  /*
    countdown status and state gets updated
    after a second, the count gets decremented by 1
  */
  describe('handleSetCountdown', () => {
    it('should set state to started and countdown', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10); // start countdown from 10

      expect(countdown.state.count).toBe(10); // expect countdown to be 10
      expect(countdown.state.countdownStatus).toBe('started'); // expect status to be 'started'

      /*
        setTimeout to wait over a second and make a new assertion checking that the new count is now 9
        test over a second, the count gets updated
        test the count never gets set to a negative number

        'done' lets Mocha know that there will be a asynchronous test, and it should wait until 'done' is called to stop the test
      */
    it('should never set count less than zero', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(1); // wait or count to reach 0

      // asynchronous function --> use 'done' to not fail test
      setTimeout(() => {
        expect(countdown.state.count).toBe(0); // after the seconds, the count should not be < 0
        done(); // calls 'done' once we're done
      }, 3001) // wait 3 thousand and 1 ms (just a little over 3 seconds)
    });

    // when paused, the timer doesn't change
    it('should pause countdown on paused status', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(3); // set count to 3 and start interval
      countdown.handleStatusChange('paused'); // trigger the 'pause' status

      setTimeout(() => {
        expect(countdown.state.count).toBe(3); // assert count is still 3
        expect(countdown.state.countdownStatus).toBe('paused'); // assert the countdownStatus is 'paused'
        done();
      }, 1001);
    });

    it('should reset countdown on stopped', (done) => {
      var countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(3); // setting count to 3 and starting process
      countdown.handleStatusChange('stopped'); // set the new countdownStatus to 'stopped' and reset the countdown to 0

      setTimeout(() => {
        expect(countdown.state.count).toBe(0); 
        expect(countdown.state.countdownStatus).toBe('stopped');
        done();
      }, 1001);
    });
  });
});
