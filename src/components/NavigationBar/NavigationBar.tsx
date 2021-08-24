import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';

const Wrapper = styled.div`
  display: flex;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2; */
  justify-content: space-between;
  padding: 12px 24px;
  box-shadow: 0 0 25px rgb(26 108 225 / 10%);
  background-color: #fff;
  border-bottom: 1px solid #e5eefc;
`;

const ProjectName = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.TYPE_BLUE};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationBar = () => (
  <Wrapper>
    <Logo>
      <Link href="/">
        {/* <a>
          <img width="160" src="https://blockfrost.io/images/logo.svg" />
        </a> */}
        <a>
          <ProjectName>Nutlink Explorer</ProjectName>
        </a>
      </Link>
    </Logo>
    <Navigation>
      <NavigationItem passHref href="/">
        Tickers
      </NavigationItem>
      {/* <NavigationItem href="/oracles">Oracles</NavigationItem> */}
      <NavigationItem passHref href="https://nut.link/">
        Nutlink
      </NavigationItem>
    </Navigation>
  </Wrapper>
);

export default NavigationBar;
