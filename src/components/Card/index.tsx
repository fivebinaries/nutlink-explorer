import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  /* box-shadow: 0 0 25px rgb(26 108 225 / 10%); */
  background: #fff;
  box-shadow: rgb(25 28 31 / 8%) 0px 14px 32px, rgb(25 28 31 / 4%) 0px 8px 16px,
    rgb(25 28 31 / 4%) 0px -1px 0px;
  border-radius: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const Heading = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.TYPE_DARK_GREY};
`;

const Description = styled.div`
  font-size: 12px;
  color: ${props => props.theme.TYPE_LIGHT_GREY};
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  heading?: React.ReactNode;
  description?: React.ReactNode;
  body?: React.ReactNode;
  children?: React.ReactNode;
}

const Card = ({ heading, description, children, ...rest }: Props) => (
  <Wrapper {...rest}>
    {(heading || description) && (
      <Header>
        {heading && <Heading>{heading}</Heading>}
        {description && <Description>{description}</Description>}
      </Header>
    )}
    <Content>{children}</Content>
  </Wrapper>
);

export default Card;
