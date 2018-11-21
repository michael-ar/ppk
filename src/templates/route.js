import React from 'react';

import Logo from '../components/Logo';

export default props => {
  return (
    <React.Fragment>
      <Logo />
      {Object.entries(props.pageContext).map(([k, v]) => (
        <div key={k}>
          {k}: {v}
        </div>
      ))}
    </React.Fragment>
  );
};
