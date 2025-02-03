import styled, { css } from 'styled-components';

export const Container = styled.a`
  ${({ theme }) => css`
  color: ${theme.colors.primaryColor};
  `};
`;
