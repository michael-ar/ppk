import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { setConfig } from 'react-hot-loader';

import './index.css';
import Logo from '../components/Logo';
import Menu from '../components/Menu';

setConfig({ pureSFC: true });

export const Context = React.createContext();

const IndexPage = props => {
  const [activeLi, setActiveLi] = useState(null);
  return (
    <Context.Provider value={setActiveLi}>
      <Helmet>
        <title>PPK</title>
        <meta name={'description'} content={'PPK running club'} />
      </Helmet>
      <Menu />
      <Logo />
      {activeLi}
    </Context.Provider>
  );
};

export const query = graphql`
  query {
    allRoutes {
      edges {
        node {
          pub
          distance
          duration
          date
        }
      }
    }
  }
`;

export default IndexPage;
