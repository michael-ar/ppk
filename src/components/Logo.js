import React from 'react';
import { Link } from 'gatsby';

import './logo.css';

const data = { stats: { pints: 423, distance: 148 } };

const Logo = () => (
  <div className={'container'}>
    <Link to={'/'}>
      <h1>PPK</h1>
    </Link>
    <div className={'stats'}>
      <span>
        {data.stats.pints} pints&nbsp;/&nbsp;
        {data.stats.distance}
        &nbsp;km
      </span>
    </div>
  </div>
);

export default Logo;
