import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Start from './components/Start';
import './App.css';
import Gallery from './components/Gallery';
import Compete from './components/Compete';

const App = () => (
  <div className="App">
    <Router>
      <header>
        <nav>
          <Link to="/">Start</Link>
          <Link to="/compete">Tävla</Link>
          <Link to="/gallery">Galleri</Link>
        </nav>

      </header>
      <main>
        <Switch>
          <Route path="/" exact><Start /></Route>
          <Route path="/gallery"><Gallery /></Route>
          <Route path="/compete"><Compete /></Route>
        </Switch>
      </main>
    </Router>
  </div>
);

export default App;
