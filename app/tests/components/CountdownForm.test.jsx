var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

// load 'CountdownForm' component
var CountdownForm = require('CountdownForm');


describe('CountdownForm', () => {
  // when required the 'CountdownForm', we get a valid variable back
  it('should exist', () => {
    expect(CountdownForm).toExist();
  });

  /*
    'spy' checks whether or not the function gets called by passing into components
    checks if the spy is called when there is a valid field of input (in this case: numbers only of 0-9)
    whether or not the function gets called
  */
  it('should call onSetCountdown if valid seconds entered', () => {
    var spy = expect.createSpy(); // created a 'spy' that can be passed down on the 'CountdownForm' component
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
    var $el = $(ReactDOM.findDOMNode(countdownForm)); // fetch the DOM node

    countdownForm.refs.seconds.value = '109'; // manipulate the seconds

    /*
      simulate a submit by passing in the DOM node
      'find' lets you search any nested child (in this case, access the first DOM node form element)
    */
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(109); // assertion
  });

  it('should not call onSetCountdown if invalid seconds entered', () => {
    var spy = expect.createSpy();

    // passing spy into component and check when form is submitted
    var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
    var $el = $(ReactDOM.findDOMNode(countdownForm));

    countdownForm.refs.seconds.value = '109b';
    TestUtils.Simulate.submit($el.find('form')[0]);

    // makes sure the spy wasn't called at all
    expect(spy).toNotHaveBeenCalled();
  });
});
