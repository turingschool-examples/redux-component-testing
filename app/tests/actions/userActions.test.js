import configureMockStore from 'redux-mock-store';
import actions from '../../actions/userActions';

// Mock out a store -- this needs double ()'s because configureMockStore
// returns a function that allows you to configure it before initializing it.
// We don't need to do any configuration in this case, so we're just going to
// initialize it right away.
const store = configureMockStore()();

// mock out some pretend user data to work with
const mockUser = {
  data: {
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  }
};

describe('userActions', () => {

  afterEach(() => {

    // our mocked-out store keeps a log of all the actions
    // that have been dispatched so we can check that the
    // appropriate ones are being called. after each test
    // we want to clear this out so we can start fresh
    store.clearActions();
  });

  it('creates SIGN_IN when initiating the signIn action', () => {

    // mock out what kind of action data we expect to be dispatched
    let expectedAction = { type: 'SIGN_IN', user: mockUser.data };

    // dispatch our signIn action with a made up email/password
    store.dispatch(actions.signIn(mockUser.data));

    // get any actions that were created as a result of this dispatch
    // remember our configureMockStore provides this as a utility
    // for us for free, because this is something we would want to test
    let createdActions = store.getActions();

    // ensure that only 1 action was dispatched. It's important to
    // test the length to ensure that no 'side effects' occurred as
    // a result of us logging in
    expect(createdActions.length).toEqual(1);

    // expect the first action created to equal the one we stubbed out
    // earlier -> { type: 'SIGN_IN', user: mockUser.data }
    expect(createdActions[0]).toEqual(expectedAction);
  });

  it('creates SIGN_IN_ERROR when sign in fails', () => {
    let expectedAction = { type: 'SIGN_IN_ERROR', error: 'Invalid Credentials' };
    store.dispatch(actions.signInFailed('Invalid Credentials'));

    let createdActions = store.getActions();
    expect(createdActions.length).toEqual(1);
    expect(createdActions[0]).toEqual(expectedAction);
  })
});

