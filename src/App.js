import React from 'react';
import { Router, Link } from "@reach/router"

import './App.css';

import logo from './logo.svg';

import Home from './Containers/Home';
import Hikes from './Containers/Hikes';
import HikeDetail from './Containers/HikeDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <header id="siteheader" className="page-header bg-green-200 px-4 py-2 flex items-center md:justify-between">
        <div className="container mx-auto flex items-center">
          <div className="masthead flex-grow">
            <img className="inline-block mr-2" alt="" src={logo} height="75" width="75"/>
            <span className="font-bold text-xl">Hiking Pattern Library</span>
          </div>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="hikes">Hikes</Link>
          </nav>
        </div>
      </header>
      <main id="sitemain" className="page-body flex-grow container px-4 py-2 mx-auto">
        <Router>
          <Home path="/" />
          <HikeDetail path="hikes/:hikeId" />
          <Hikes path="hikes" />
        </Router>
      </main>
      <footer className="page-footer w-full bg-gray-200 px-4 py-2">
        <span>Copyright 2019</span><span>Van J. Wilson</span>
      </footer>
    </div>
  );
}

export default App;
