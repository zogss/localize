import {theme} from '@app/themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const StyledSafeAreaView = styled(SafeAreaView)`
  margin-bottom: 12px;
`;

export const Container = styled.View`
  height: 65px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 26px;
  gap: 12px;
`;

export const GoBackBtn = styled.TouchableOpacity``;

export const TitleText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;
