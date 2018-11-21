import React, { useState } from 'react';
import { graphql } from 'gatsby';
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
