const PrivateRouteComponent = (props) => (
    <Route {...props.routeProps} render={() => (
    props.logged_in ? (
        <div>{props.children}</div>
        ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} /> )
    )} />
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

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);
