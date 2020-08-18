import React from 'react';
import academyLogo from './academy.png';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={academyLogo} className="app__logo" alt="logo" />
        <h3>
          Tech Academy UI - Lightning lunch
        </h3>
        <a
          className="app__link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        <p>A lightweight react app - end goal is a lightning lunch experience, with a product lister, with product cards (internal component with props needed) with 'Add' button (external component) which can increase a count (state).</p>

      </section>
    </div>
  );
}

export default App;
