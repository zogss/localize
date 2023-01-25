import styled from 'styled-components/native';
import { ThemeColors } from '../../../styles/colors';

export const Container = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 52px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 26px;
`;

export const TrackingHeaderContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TrackingHeaderCarText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${ThemeColors.gray_100};
`;

export const MapContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
`;
