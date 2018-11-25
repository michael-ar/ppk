import React from 'react';

import './map.css';
import map from '../images/map.jpg';
import route1 from '../images/1.png';
import route2 from '../images/2.png';
import route3 from '../images/3.png';

const images = {
  route1,
  route2,
  route3,
};

const Map = props => (
  <div className={'map'}>
    <img className={'base'} src={map} />
    <img src={images[`route${props.data.map}`]} />
  </div>
);

export default Map;
