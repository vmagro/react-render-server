import React, {Component} from 'react';
import {Route} from 'react-router';

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

function NotFound() {
  return (
    <Status code={404}>
      <div>
        Not found :(
      </div>
    </Status>
  );
}

export default NotFound;
