import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/admin">
          <Main />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
