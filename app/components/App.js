import React, { PropTypes as pt } from 'react';

export const App = ({ children }) =>  {
  return (
    <div>
      <h1>Redux Component Testing Example App</h1>
      {children}
    </div>
  )
};

App.propTypes = {
  children: pt.object.isRequired
};