import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { StackAppNavigator } from '../routes/app.routes';
import { ThemeColors } from '../styles/colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 20px;
  color: ${ThemeColors.black};
  font-weight: bold;
`;
const MapContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Tracking = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* render
  return (
    <Container>
      <MapContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            position: 'absolute',
            zIndex: 10,
            top: 40,
            right: 20,
            backgroundColor: ThemeColors.cyan_500,
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text>Go to Home</Text>
        </TouchableOpacity>
      </MapContainer>
    </Container>
  );
};
