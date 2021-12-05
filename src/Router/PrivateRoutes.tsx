import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { asyncLocalStorage } from '../Helpers/LocalStorage';
const PrivateRoute = ({ fallback, children, token, ...props }: any) => {
  let data: string | null = null;
  if (token === null) {
    data = localStorage.getItem("userapp");
  }
  return (
    <Route
      {...props}
      render={({ location }) => {
        if ((token) || (data !== null)) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: fallback,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
