import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import AdminDash from './Components/AdminDash'
import LayoutDemo1 from './Components/LayoutDemo1'
import About from './Components/About'
import SightingDash from './Components/SightingDash'
import Contact from './Components/Contact'
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={LayoutDemo1} />
        <Route path="/layout-demo-one" component={LayoutDemo1} />
        <Route path="/about" component={About} />
        <Route path="/sighting-dash" component={SightingDash} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin-dash" component={AdminDash} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
