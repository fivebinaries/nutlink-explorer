import React from 'react';
import styled from 'styled-components';
import Label, { LabelProps } from '../Label/Label';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  & + & {
    margin-top: 24px;
  }
`;

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  secondary?: LabelProps['secondary'];
}

const Section = ({ children, heading, secondary, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <Label secondary={secondary}>{heading}</Label>
      {children}
    </Wrapper>
  );
};

export default Section;
