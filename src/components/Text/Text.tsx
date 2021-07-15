import styled, { css } from 'styled-components';

const StyledText = styled.span<{ variant: Props['variant'] }>`
  ${props =>
    props.variant === 'primary' &&
    css`
      font-size: 16px;
      color: ${props => props.theme.TYPE_DARK_GREY};
    `};

  ${props =>
    props.variant === 'secondary' &&
    css`
      font-size: 14px;
      color: ${props => props.theme.TYPE_LIGHT_GREY};
    `};
`;

interface Props {
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

const Text = ({ variant = 'primary', children, ...rest }: Props) => {
  return (
    <StyledText variant={variant} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;
