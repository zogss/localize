import React from 'react';
import styled from 'styled-components/native';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ThemeColors } from '../styles/colors';

const LoadingContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const LoadingText = styled.Text`
  font-size: 28px;
  color: ${ThemeColors.black};
  font-weight: 600;
  margin-top: 16px;
`;

export const LoadingView = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner
        style={{
          height: 80,
          width: 80,
          borderRadius: 80,
          borderWidth: 10,
          borderTopColor: ThemeColors.cyan_500,
          borderBottomColor: ThemeColors.gray_200,
          borderLeftColor: ThemeColors.gray_200,
          borderRightColor: ThemeColors.gray_200,
        }}
      />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};
