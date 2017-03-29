import React from 'react';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import { browserHistory } from 'react-router';

import Login from '../../components/Login';

describe('Login Component', () => {
  const mockUser = {
    data: {
      name: 'Bob LobLaw',
      id: 1,
      email: 'foo@bar.com'
    }
  }

  const LoginComponent = shallow(
    <Login user={mockUser.data} signIn={jest.fn()} />
  );

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });


  it('should display error when authentication fails', async (done) => {
    fetchMock.post('http://localhost:3001/authenticate', { status: 500, body: {} });

    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'foo@bar.com'
      }
    });

    submitButton.simulate('click');

    await LoginComponent.update();

    let expectedErrorMessage = 'Invalid Credentials';
    let errorElement = LoginComponent.find('.errorMessage');

    expect(LoginComponent.state().error).toEqual(expectedErrorMessage);
    expect(errorElement.length).toEqual(1);
    expect(errorElement.text()).toEqual(expectedErrorMessage);

    done();
  });

  it('redirects to dashboard on successful login', async (done) => {
    spyOn(browserHistory, 'push');

    fetchMock.post('http://localhost:3001/authenticate', {
      status: 200, 
      ok: true,
      body: mockUser
    });

    let emailInput = LoginComponent.find('input[name="email"]');
    let submitButton = LoginComponent.find('button');

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'foo@bar.com'
      }
    });

    submitButton.simulate('click');

    await LoginComponent.update();

    expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');

    done();

  })

});