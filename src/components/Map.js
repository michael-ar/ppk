import React from 'react';

import './map.css';
import map from '../images/map.jpg';
import route1 from '../images/1.png';
import route2 from '../images/2.png';
import route3 from '../images/3.png';

const Map = props => (
  <div className={'map'}>
    <img className={'base'} src={map} />
    <img
      src={route1}
      style={{ display: props.data.map === 1 ? 'block' : 'none' }}
    />
    <img
      src={route2}
      style={{ display: props.data.map === 2 ? 'block' : 'none' }}
    />
    <img
      src={route3}
      style={{ display: props.data.map === 3 ? 'block' : 'none' }}
    />
  </div>
);

export default Map;
