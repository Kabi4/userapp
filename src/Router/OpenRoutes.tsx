import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const OpenRoutes = ({ fallback, children, token, ...props }: any) => {
  let data: string | null = null;
  if (token === null) {
    data = localStorage.getItem("userapp");
  };
  return (
    <Route
      render={({ location }) => {
        if (token === null && data === null) {
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
      {...props}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.authReducer.token,
  };
};

export default connect(mapStateToProps, null)(OpenRoutes);

// const mapStateToProps = (state) => {
//   return {
//       token: state.authReducer.token,
//       userType: state.authReducer.userType,
//       status: state.authReducer.status,
//       id: state.authReducer.id,
//   };
// };