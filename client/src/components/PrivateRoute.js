import React from 'react';
import { BrowserRouter as Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        props.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
            }}
          />
        )
      }
    />
  );

  export default PrivateRoute;