import React from 'react';
import { Helmet } from 'react-helmet';

import './route.css';
import Logo from '../components/Logo';
import Map from '../components/Map';

export default props => (
  <React.Fragment>
    <Helmet>
      <title>{props.pageContext.pub} – PPK</title>
      <meta
        name={'description'}
        content={`Route for ${props.pageContext.pub}`}
      />
    </Helmet>
    <Logo />
    <Map data={{ map: props.pageContext.map }} />
    <div className={'information'}>
      {Object.entries(props.pageContext)
        .filter(x => x[0] !== 'id')
        .map(([k, v]) => (
          <div key={k}>
            <span className={'key'}>{k}:</span> <span>{v}</span>
          </div>
        ))}
    </div>
  </React.Fragment>
);
