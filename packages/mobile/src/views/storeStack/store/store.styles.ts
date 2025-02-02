import {theme} from '@app/themes';
import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
  gap: 12px;
`;

export const FirstContainer = styled.View`
  width: 100%;
  padding: 0 26px;
  gap: 20px;
`;

export const CarNameTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.gray_100};
`;

export const CarImage = styled.Image`
  width: 100%;
  height: 350px;
  border-radius: 8px;
`;

export const RentalHeaderContainer = styled.View`
  width: 100%;
`;

export const RentalHeaderSubtitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const RentalHeaderSubtitleText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const RentalHeaderAdditionalInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

export const RentalHeaderAdditionalInfoText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.gray_100};
`;

export const RentalHeaderSeparator = styled.View`
  width: 2px;
  height: 16px;
  background-color: ${theme.colors.gray_100};
  margin: 0 10px;
`;

export const RentalDescriptionContainer = styled.View`
  width: 100%;
  padding: 0 26px;
`;

export const RentalDescriptionTitleText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const RentalDescriptionText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.gray_100};
`;

export const RentalDeliveryContainer = styled.View`
  width: 100%;
  padding: 0 26px;
  gap: 16px;
`;

export const RentalDeliveryTitleText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.gray_100};
`;

export const RentalDeliveryDatesContainer = styled.View`
  width: 100%;
  gap: 12px;
`;

export const DateContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  background-color: ${theme.colors.gray_200};
`;

export const DateInfoText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.dark};
`;

export const DateInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 12px;
  background-color: ${theme.colors.gray_100};
`;

export const DateText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.dark};
  padding: 12px;
`;

export const FourthContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 26px;
`;

export const RentCarContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const RentCarText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${theme.colors.dark};
`;

export const RentCarButton = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 12px 18px;
  background-color: ${theme.colors.cyan_500};
`;
