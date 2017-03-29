import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LoginContainer from '../../containers/LoginContainer';
import Login from '../../components/Login';

const mockStore = configureMockStore()({
  user: {
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  }
});

const setup = () => {
  const Container = mount(
    <Provider store={mockStore}>
      <LoginContainer />
    </Provider>
  );

  const Component = Container.find(Login);

  return {
    Container,
    Component
  }
}

describe('LoginContainer', () => {
  const { Container, Component } = setup();

  it('should pass the appropriate props from state', () => {
    expect(Component.props().user).toEqual({
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    });
  });

  it('should pass down the correct action creators as props', () => {
    expect(Object.keys(Component.props())).toContain(
      'signIn', 'signOut', 'signInFailed'
    );
  });
});