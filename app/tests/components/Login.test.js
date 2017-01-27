// Tests for unwrapped components should NOT be heavily dependent on
// the DOM elements or content that's being rendered. Many examples
// out there show the simple tests of making sure elements and text
// are being rendered correctly, but if we're testing the existence
// of text within a component, any time we change that language, we're
// going to have to rewrite our tests. Good use-cases for testing what's
// being rendered are when you have conditional elements/copy based on
// the current state/props of the component. e.g. if you are not logged
// in and a user tries to do something only an authenticated user can
// do, assert that "You can't do that" is rendered.

import React from 'react';
import { shallow } from 'enzyme';

// importing browserHistory so we can spy on it and
// verify a user is redirected upon successful login
import { browserHistory } from 'react-router';

// intercepts API requests made with fetch so we
// can control what kind of response we get back
import fetchMock from 'fetch-mock';

import Login from '../../components/Login';

describe('Login component', () => {

  const mockUser = {
    data: {
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    }
  };

  const LoginComponent = shallow(<Login user={mockUser.data} signIn={jest.fn()} />);

  afterEach(() => {
    // assert that all API calls have been intercepted
    // and handled appropriately. If there is anything
    // remaining in this array, we done messed up
    expect(fetchMock.calls().unmatched).toEqual([]);

    // start fresh with fetchMock after each test so that we're
    // not intercepting API calls that no longer need to be tested
    fetchMock.restore();
  });

  it('autofills email input if a user is currently logged in', () => {
    let emailInput = LoginComponent.find('input[name="email"]');
    expect(emailInput.props().value).toEqual('foo@bar.com');
  });

  it('should display an error message if the email format is invalid', () => {
    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', { 
      target: { 
        name: 'email',
        value: 'bar@baz.com'
      }
    });
    submitButton.simulate('click');

    let expectedErrorMessage = 'Invalid Email';
    let errorElement = LoginComponent.find('.errorMessage');

    expect(LoginComponent.state().error).toEqual(expectedErrorMessage);
    expect(errorElement.length).toEqual(1);
    expect(errorElement.text()).toEqual(expectedErrorMessage);
  });

  // When we have a component method that does something asynchronously (e.g.
  // updates the state based on the result of a promise), we need to use async/await
  // to delay our assertions until after the component has had a chance to update
  // Add the 'done' param to your test function and call it after making all assertions
  it('displays an error message if the credentials do not match', async (done) => {

    // capture our fetch request to /api/users and return an error status
    fetchMock.post('http://localhost:3001/authenticate', { status: 500, body: {} });

    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', { 
      target: { 
        name: 'email',
        value: 'foo@bar.com'
      }
    });

    // simulate trying to log in with invalid credentials
    submitButton.simulate('click');

    // wait for the component to update
    await LoginComponent.update();

    let expectedErrorMessage = 'Invalid Credentials';
    let errorElement = LoginComponent.update().find('.errorMessage');

    // test that our state was updated and we displayed an appropriate error message
    expect(LoginComponent.update().state().error).toEqual(`${expectedErrorMessage}`);
    expect(errorElement.length).toEqual(1);
    expect(errorElement.text()).toEqual(expectedErrorMessage);

    // call done() to let the test runner it can move on now
    done();
  });

  it('redirects to home route on successful login', async (done) => {

    // spyOn the push method of browserHistory so we can check if and how
    // it was called when we successfully login with valid credentials
    spyOn(browserHistory, 'push');

    // capture our fetch request to /api/users and return a successful response
    fetchMock.post('http://localhost:3001/authenticate', { ok: true, status: 200, body: mockUser });

    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', { 
      target: { 
        name: 'email',
        value: 'foo@bar.com'
      }
    });

    // simulate trying to login with valid credentials
    submitButton.simulate('click');

    // wait for the component to update
    await LoginComponent.update();

    // verify that browserHistory.push was called and it pushed us to the '/' route
    expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');

    // call done() to let the test runner it can move on now
    done();
  });

});

