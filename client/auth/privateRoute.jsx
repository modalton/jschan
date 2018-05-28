import React from 'react'; //This needs to be here or else err:'React undefinied' is thrown. Possible webpack fix.
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

//Don't have stage-# to spread rest so you have to specify attr 
const PrivateRoute = ({ component: Component, logged_in, ...rest }) => (
  <Route
    path={rest.path}
   render={props =>
   logged_in
    ? <Component {...props} />
    : <Redirect to={{ pathname: "/login" }} />}
  />
);


const mapStateToProps = (state, ownProps) => {
    return {
        logged_in: state.loginReducer.isLoggedIn,
        location: ownProps.path,
        routeProps: {
            exact: ownProps.exact,
            path: ownProps.path
        }
    };
};

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
