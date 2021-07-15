import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PageItem = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  font-size: 12px;
  background: ${props => (props.isActive ? props.theme.BG_BLUE : 'transparent')};
  color: ${props => (props.isActive ? props.theme.TYPE_WHITE : props.theme.TYPE_BLUE)};
  padding: 4px 8px;
  border-radius: 2px;
`;

const Actions = styled.div<{ isActive: boolean }>`
  display: flex;
  visibility: ${props => (props.isActive ? 'auto' : 'hidden')};
  font-weight: 500;
`;

interface Props {
  currentPage: number;
  isOnLastPage?: boolean;
  onPageSelected: (page: number) => void;
}

const Pagination = ({ currentPage, onPageSelected, isOnLastPage, ...rest }: Props) => {
  const showPrevious = currentPage > 1;

  return (
    <Wrapper {...rest}>
      <Actions isActive={showPrevious}>
        <PageItem onClick={() => onPageSelected(currentPage - 1)}>‹ Newer</PageItem>
      </Actions>
      <PageItem onClick={() => onPageSelected(currentPage)} isActive>
        {currentPage}
      </PageItem>
      <Actions isActive={!isOnLastPage}>
        <PageItem onClick={() => onPageSelected(currentPage + 1)}>Older ›</PageItem>
      </Actions>
    </Wrapper>
  );
};

export default Pagination;
