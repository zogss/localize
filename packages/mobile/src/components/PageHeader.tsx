import React from 'react';
import styled from 'styled-components/native';
import { ThemeColors } from '../styles/colors';

interface IPageHeaderProps {
  pageTitle: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ pageTitle }) => {
  return (
    <HeaderContainer>
      <HeaderText>{pageTitle}</HeaderText>
    </HeaderContainer>
  );
};

export default PageHeader;

export const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
  font-size: 34px;
  font-weight: 600;
  color: ${ThemeColors.gray_100};
`;
