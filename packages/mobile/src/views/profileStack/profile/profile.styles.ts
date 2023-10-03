import { theme } from '@app/themes';
import styled from 'styled-components/native';

export const SectionSeparator = styled.View`
  width: 100%;
  height: 6px;
  margin: 14px 0;
  background-color: ${theme.colors.gray_700};
`;

export const SectionContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
`;

export const Container = styled.ScrollView`
  width: 100%;
`;
