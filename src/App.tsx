import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Main />
        </PrivateRoute>
        <Redirect from="/" to="/admin/doshboard" />
      </Switch>
    </div>
  );
}

export default App;
