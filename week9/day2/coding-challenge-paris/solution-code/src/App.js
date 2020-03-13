import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Home from "./views/Home";
import Temperature from "./views/Temperature";
import CustomizeImage from "./views/CustomizeImage";
import Celebrities from "./views/Celebrities";

function App() {
  return (
    <div className="App">
      <nav id="main-nav">
        <Link to="/">Home</Link>
        <Link to="/temperature">Temperature</Link>
        <Link to="/customize-image">Customize Image</Link>
        <Link to="/celebrities">Celebrities</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/temperature" exact component={Temperature} />
        <Route path="/customize-image" exact component={CustomizeImage} />
        <Route path="/celebrities" exact component={Celebrities} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </div>
  );
}

export default App;
