import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import './logo.css';
const AVG_ATTENDANCE = 6;
const ESTIMATED_PPK = 2.84;

const Stats = props => (
  <React.Fragment>
    {Math.round(props.totalDistance * ESTIMATED_PPK)} pints&nbsp;/&nbsp;
    {Math.round(props.totalDistance)}
    &nbsp;km
  </React.Fragment>
);

const Logo = props =>
  console.log('props', props) || (
    <div className={'container'}>
      <Link to={'/'}>
        <h1>PPK</h1>
      </Link>
      <div className={'stats'}>
        <span>{props.textOverride || <Stats {...props} />}</span>
      </div>
    </div>
  );

const WithQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        allRoutes {
          edges {
            node {
              distance
            }
          }
        }
      }
    `}
    render={data => (
      <Logo
        {...props}
        totalDistance={
          data.allRoutes.edges.reduce((acc, x) => acc + x.node.distance, 0) *
          AVG_ATTENDANCE
        }
      />
    )}
  />
);

export default WithQuery;
