import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>CRM</h1>
      <ul>
        <li>
          <Link to="/clients">Clientes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
