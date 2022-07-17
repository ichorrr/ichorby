import React from 'react';

import Header from './header';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Navigation />
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};
export default Layout;
