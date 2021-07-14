import * as React from 'react';
import NextLink, { LinkProps } from 'next/link';
import styled, { css } from 'styled-components';

const StyledLink = styled.a<Pick<Props, 'variant'>>`
  /* display: flex; */
  transition: all 0.2s ease-in-out;

  ${props =>
    props.variant !== 'inheritStyle' &&
    css`
      color: ${props => props.theme.TYPE_DARK_GREY};

      :hover {
        color: #0168fa;
      }
    `}
`;

interface Props extends LinkProps {
  variant?: 'inheritStyle';
  children?: React.ReactNode;
  className?: string;
}

const Link = ({ variant, className, children, href, passHref, as, ...rest }: Props) => (
  <NextLink href={href} as={as} passHref={passHref} {...rest}>
    <StyledLink variant={variant} className={className}>
      {children}
    </StyledLink>
  </NextLink>
);

export default Link;
