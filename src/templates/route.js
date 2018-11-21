import React from 'react';
import { Helmet } from 'react-helmet';

import Logo from '../components/Logo';

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
    {Object.entries(props.pageContext)
      .filter(x => x[0] !== 'id')
      .map(([k, v]) => (
        <div key={k}>
          {k}: {v}
        </div>
      ))}
  </React.Fragment>
);
