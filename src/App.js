import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Postagens from './Pages/Posts';
import Cadastro from './Pages/Cadastro';
const App = () => (
  <Router>
    <div>
      <nav className="navBar">
        <ul className="navList">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cadastro/">Cadastro</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Postagens} />
      <Route path="/cadastro/" component={Cadastro} />
    </div>
  </Router>
);

export default App;
