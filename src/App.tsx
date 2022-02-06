import { Switch, Route } from "react-router-dom";
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
        <PrivateRoute isAuthenticated={false} path="/admin">
          <Main />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
