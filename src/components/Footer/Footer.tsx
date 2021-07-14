import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  /* box-shadow: 0 0 25px rgb(26 108 225 / 10%);
  background-color: #fafbfc; */

  letter-spacing: 0.3px;
  padding: 16px 25px;
  background-color: #fafbfc;
  color: #637388;
  border-top: 1px solid rgba(72, 94, 144, 0.16);
  text-transform: uppercase;
`;

const Col = styled.div`
  display: flex;
  color: ${props => props.theme.TYPE_LIGHT_GREY};
  padding: 0px 24px;
`;

const Footer = () => (
  <Wrapper>
    <Col>FIVE BINARIES OÜ</Col>
    <Col>Made with ❤️</Col>
  </Wrapper>
);

export default Footer;
