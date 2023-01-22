import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { StackAppNavigator } from '../routes/app.routes';
import { useTypedDispatch } from '../store';
import { signOut } from '../store/modules/auth';
import { ThemeColors } from '../styles/colors';

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 20px;
  color: blue;
  font-weight: bold;
`;
const ButtonContainer = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px 14px;
  border-radius: 4px;
  background-color: ${ThemeColors.cyan_500};
  color: ${ThemeColors.black};
  font-size: 20px;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  color: blue;
  font-weight: bold;
`;

export const Home = () => {
  //* hooks
  const navigation = useNavigation<StackAppNavigator>();

  //* redux hooks
  const dispatch = useTypedDispatch();

  //* handlers
  const handleSignOut = async () => {
    await dispatch(signOut());
  };

  //* render
  return (
    <Container>
      <Text>Welcome to the Home screen!</Text>
      <ButtonContainer onPress={() => handleSignOut()}>
        <ButtonText>Sign out</ButtonText>
      </ButtonContainer>
      <ButtonContainer onPress={() => navigation.navigate('Profile')}>
        <ButtonText>Go to profile</ButtonText>
      </ButtonContainer>
      <ButtonContainer onPress={() => navigation.navigate('Tracking')}>
        <ButtonText>Go to Tracking</ButtonText>
      </ButtonContainer>
    </Container>
  );
};
