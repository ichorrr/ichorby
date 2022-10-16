import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

// component styles
const Wrapper = styled.div`
  /* We can apply media query styles within the styled component */
  /* This will only apply the layout for screens above 700px wide */
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`;

const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  overflow-y: scroll;
  
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 250px);
  }
`;

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
