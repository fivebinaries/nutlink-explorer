import React from 'react';
import styled from 'styled-components';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FiInfo } from 'react-icons/fi';

const TooltipWrapper = styled.div`
  display: flex;
  margin-left: 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

const TooltipContent = styled.div`
  font-size: 12px;
  color: ${props => props.theme.TYPE_LIGHT_GRAY};
`;

interface Props extends TippyProps {
  className?: string;
}

const Tooltip = ({ content, children, className, ...rest }: Props) => {
  return (
    <TooltipWrapper className={className}>
      <Tippy content={<TooltipContent>{content}</TooltipContent>} {...rest}>
        <IconWrapper>{children ?? <FiInfo />}</IconWrapper>
      </Tippy>
    </TooltipWrapper>
  );
};

export default Tooltip;
