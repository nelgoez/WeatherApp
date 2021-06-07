import React from 'react';
import Logo from '../logoHenry.png'
import SearchBar from './SearchBar.jsx';
import './Nav.css';

function Nav({onSearch}) {
  return (
    <div className={"navbar navbar-dark bg-dark"}>
      <img id="logoHenry" src={Logo}alt="Unavailable"/>
  <a>
    Weather App
    </a>
  <SearchBar onSearch={onSearch}/>
</div>
  );
};

export default Nav;
