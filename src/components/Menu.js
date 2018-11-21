import React, { useContext, useState, useEffect } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';

import './menu.css';
import utils from '../utils';
import { Context } from '../pages/';

const LI_HEIGHT = 41;
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
  const setActiveLi = useContext(Context);
  const mouse = useMousePosition();
  const window = useWindowSize();
  const contentHeight = pubs.length * (LI_HEIGHT + LI_MARGIN);
  const range = contentHeight - window.height;
  const margin = (mouse.y / window.height) * range;
  const onMouseLeave = () => setActiveLi(null);
  return (
    <ul style={{ paddingBottom: margin }}>
      {pubs.map((x, i) => (
        <li
          key={`${x}${i}`}
          onMouseEnter={() => setActiveLi(x)}
          onMouseLeave={onMouseLeave}
          onClick={() => navigate(`/pub/${utils.formatURL(x)}`)}
          style={{ marginBottom: LI_MARGIN }}
        >
          {x}
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
    render={data => <Menu pubs={data.allRoutes.edges.map(x => x.node.pub)} />}
  />
);

export default WithQuery;
