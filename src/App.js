import './App.css';
import Signup from './Pages/Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Cart from './Pages/Cart';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}>
        </Route>
        <Route path='/signup' component={Signup}>
        </Route>
        <Route path='/login' component={Login}>
        </Route>
        <Route path='/cart' component={Cart}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;


