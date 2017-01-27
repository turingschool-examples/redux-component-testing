// Container components are fairly simple: they are usually just
// passing through state and actions as props. All we need to test here
// is if the correct props end up on our wrapped components. We can 
// get into more serious integration tests here but let's not for now

import React from 'react'
import { mount  } from 'enzyme' // testing container components requires a full mount, not a shallow
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

// import both the container and the component we want to wrap
import LoginContainer from '../../containers/LoginContainer'
import Login from '../../components/Login'

// We technically don't *need* configureMockStore, because we're not
// applying any middleware (e.g. redux-thunk) in this example. We could
// mock out a simpler one ourselves, but using it doesn't do any harm
// and it gives us a lot of testing features for free.
const mockStore = configureMockStore()({
  user: { // mocking out an initial user state so we can test if it gets passed down accurately
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  }
});

const setup = () => {
  // Mount our container component *within* a Provider that has our new mockStore as a prop
  const Container = mount(<Provider store={mockStore}><LoginContainer /></Provider>);

  // Find the component we're wrapping so we can check its props later
  const Component = Container.find(Login);

  return {
    Container,
    Component
  }
}

describe('LoginContainer', () => {
  // Grab our container and component from the setup method we wrote
  const { Container, Component } = setup();

  // Verify that our initial state was passed down as props
  it('should pass the appropriate props from state', () => {
    expect(Component.props().user).toEqual({
      name: 'Bob Loblaw',
      id: 1,
      email: 'foo@bar.com'
    });
  });

  // Verify the container correctly bound our action creators as props
  it('should pass down the correct action creators', () => {
    expect(Object.keys(Component.props())).toContain('signIn', 'signOut', 'signInFailed');
  });
});