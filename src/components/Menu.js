import React, { useContext, useState, useEffect } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';

import './menu.css';
import utils from '../utils';
import { Context } from '../pages/';

const LI_HEIGHT = 32;
const LI_MARGIN = 12;
let polyWindow;
if (typeof window !== 'undefined') {
  polyWindow = window;
} else {
  polyWindow = {};
}

const useMousePosition = () => {
  const [mouse, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = e =>
    setMousePosition({
      x: e.pageX,
      y: e.pageY,
    });

  useEffect(() => {
    polyWindow.addEventListener('mousemove', handleMouseMove);
    return () => {
      polyWindow.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return mouse;
};

const useWindowSize = () => {
  const getSize = () => ({
    height: polyWindow.innerHeight,
    width: polyWindow.innerWidth,
  });

  const [windowSize, setWindowSize] = useState(getSize());
  const handleResize = () => setWindowSize(getSize());

  useEffect(() => {
    polyWindow.addEventListener('resize', handleResize);
    return () => {
      polyWindow.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const Menu = props => {
  const { pubs } = props;
  const setActiveRoute = useContext(Context);
  const mouse = useMousePosition();
  const window = useWindowSize();
  const contentHeight = pubs.length * (LI_HEIGHT + LI_MARGIN);
  const range = contentHeight - window.height;
  const margin = (mouse.y / window.height) * range;
  const onMouseLeave = () => setActiveRoute();
  const isMobile = window.width <= '480';
  return (
    <ul style={isMobile ? {} : { paddingBottom: margin }}>
      {pubs.map(({ pub }, i) => (
        <li
          key={`${pub}${i}`}
          onMouseEnter={() => setActiveRoute({ pub, map: (i % 3) + 1 })}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate(`/pub/${utils.formatURL(pub)}`)}
          style={{ marginBottom: LI_MARGIN }}
        >
          {pub}
        </li>
      ))}
    </ul>
  );
};

const WithQuery = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => (
      <Menu
        pubs={data.allRoutes.edges.map(({ node: { pub, map } }) => ({
          pub,
          map,
        }))}
      />
    )}
  />
);

export default WithQuery;
