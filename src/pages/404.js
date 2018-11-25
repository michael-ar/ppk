import React from 'react';
import Logo from '../components/Logo';
import Map from '../components/Map';

const NotFoundPage = () => (
  <React.Fragment>
    <Logo textOverride={'Page not found'} />
    <Map data={{}} />
  </React.Fragment>
);

export default NotFoundPage;
