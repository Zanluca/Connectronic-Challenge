import React from 'react';
import Routes from '../routes'
import NavBarAndMenu from './NavBarAndMenu'

function App() {
  return (
    <React.Fragment>
      <NavBarAndMenu>
        <Routes />      
      </NavBarAndMenu>
    </React.Fragment>
  );
}

export default App;
