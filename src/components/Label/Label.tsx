import styled, { css } from 'styled-components';

const Label = styled.span<{ secondary?: boolean }>`
    display: inline-flex
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    color: #0b60dd;
    margin-bottom: 16px;

    ${props =>
      props.secondary &&
      css`
        font-size: 14px;
        font-weight: 600;
        text-transform: initial;
        margin-bottom: 8px;
      `}
`;

interface Props {
  secondary?: boolean;
}

export type { Props as LabelProps };
export default Label;
