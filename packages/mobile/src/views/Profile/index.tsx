import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import React from 'react';
import { Header as YourRentalsHeader } from '../../components/myRentals/Header';
import { List as YourRentalsList } from '../../components/myRentals/List';
import { RENT_STATUS } from '../../shared/enum/RENT_STATUS';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { signOut } from '../../store/modules/auth';
import { IAuthState } from '../../store/modules/auth/types';
import { ThemeColors } from '../../styles/colors';
import { IMyRentals } from '../Home';
import {
  Container,
  FirstContainer,
  FullNameContainer,
  FullNameText,
  FunctionalitiesButton,
  LogOutButton,
  LogOutButtonContainer,
  LogOutButtonText,
  NameContainer,
  RentalsContainer,
  SecondContainer,
  SectionSeparator,
  ThirdContainer,
  UserInfoContainer,
  UserNameContainer,
  UserNameText,
  UserPhoto
} from './styles';

export const Profile = () => {
  //* redux hooks
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector<RootState, IAuthState>(
    (state) => state.auth,
  );
  const cars = useTypedSelector<RootState, IMyRentals>(
    (state) => state.rent.rent,
  );

  //* handlers
  const handlerSignOut = async () => {
    await dispatch(signOut());
  };

  //* render
  return (
    <Container>
      <FirstContainer>
        <UserInfoContainer>
          <NameContainer>
            <FullNameContainer>
              <FullNameText>
                {user?.firstName + ' ' + user?.lastName}
              </FullNameText>
            </FullNameContainer>
            <UserNameContainer>
              <MaterialIcons
                name="verified"
                size={18}
                color={ThemeColors.dark}
              />
              <UserNameText>{user?.username}</UserNameText>
            </UserNameContainer>
          </NameContainer>
          <UserPhoto source={require('../../../assets/20221231_225307.jpg')} />
        </UserInfoContainer>
        <LogOutButtonContainer>
          <LogOutButton onPress={handlerSignOut}>
            <LogOutButtonText>Log out</LogOutButtonText>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="black"
              style={{
                marginLeft: 10,
              }}
            />
          </LogOutButton>
        </LogOutButtonContainer>
      </FirstContainer>
      <SectionSeparator />
      <SecondContainer>
        <FunctionalitiesButton>
          <FontAwesome name="life-buoy" size={30} color="black" />
        </FunctionalitiesButton>
        <FunctionalitiesButton>
          <Entypo name="info-with-circle" size={30} color="black" />
        </FunctionalitiesButton>
        <FunctionalitiesButton>
          <Ionicons name="settings-sharp" size={30} color="black" />
        </FunctionalitiesButton>
      </SecondContainer>
      <SectionSeparator />
      <ThirdContainer>
        <RentalsContainer>
          <YourRentalsHeader showButton={false} />
          <YourRentalsList
            data={cars.filter((car) => car.car.status === RENT_STATUS.RENTED)}
          />
        </RentalsContainer>
      </ThirdContainer>
    </Container>
  );
};
