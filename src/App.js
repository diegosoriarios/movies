import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Atores from './Pages/Atores';
import Filmes from './Pages/Filmes';
import Cadastro from './Pages/Cadastro';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const App = () => (
  <Router>
    <div>
      <nav className="navBar">
        <ul className="navList">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
          <li>
            <Link to="/atores/">Atores</Link>
          </li>
          <li>
            <Link to="/filmes/">Filmes</Link>
          </li>
          <li>
            <Link to="/cadastro/">Cadastro</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/atores/" component={Atores} />
      <Route path="/filmes/" component={Filmes} />
      <Route path="/cadastro/" component={Cadastro} />
    </div>
  </Router>
);

export default App;
