import React from 'react';

import './App.css';
import TicketSwiftLogo from './TicketSwiftLogo.png'; // import the image



function App() {
  return (
    <div className="App">
      <div className="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="circle"></div> 
      <span className="circle-text">Login</span>
      <header className="App-header">
      
      <img src={TicketSwiftLogo} className="App-logo" alt="logo" />
      
        <p>
          Welcome to TicketSwift, please sign in or create an account to but transportation tickets.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up / Login
        </a>
      </header>
    </div>
    
  );
}


  /*return (
    <div className="v7_2">
      <div className="v7_3"></div>
      <div className="v7_5"></div>
      <div className="v7_12 name">Your Name</div>
    </div>
  );
}
*/

export default App;