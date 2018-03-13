import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
  <div className="navigation">
    <Link to="/">
      Run
    </Link>

    <Link to="/data">
      Data
    </Link>

    <Link to="/settings">
      Settings
    </Link>

  </div>
);

export default NavigationBar