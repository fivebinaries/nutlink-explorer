import * as React from 'react';
import styled from 'styled-components';
import Link from '../Link/Link';

const Wrapper = styled.div`
  display: flex;
  padding: 12px 24px;
  font-weight: 500;
`;

interface Props extends React.ComponentProps<typeof Link> {
  children?: React.ReactNode;
  className?: string;
}

const NavigationBar = ({ className, children, ...rest }: Props) => (
  <Link {...rest}>
    <Wrapper className={className}>{children}</Wrapper>
  </Link>
);

export default NavigationBar;
