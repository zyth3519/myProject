import { Route, Redirect } from "react-router-dom";

function isLogined() {
  return !!localStorage.getItem("token");
}

function PrivateRoute({ children, ...rest }: any) {
  if (isLogined()) {
    return <Route {...rest} render={() => children} />;
  } else {
    return <Route {...rest} render={() => <Redirect to="/login" />} />;
  }
}

export default PrivateRoute;
