import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { setConfig } from 'react-hot-loader';

import './index.css';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import Map from '../components/Map';

setConfig({ pureSFC: true });

export const Context = React.createContext();

const IndexPage = () => {
  const [activeRoute = {}, setActiveRoute] = useState();
  return (
    <Context.Provider value={setActiveRoute}>
      <Helmet>
        <title>PPK</title>
        <meta name={'description'} content={'PPK running club'} />
      </Helmet>
      <Logo />
      <Menu />
      <Map data={activeRoute} />
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
