import { StoreCarRouteProp } from '@app/navigation';
import { theme } from '@app/themes';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useCallback, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  Container,
  HeaderContainer,
  MapContainer,
  TrackingHeaderCarText,
  TrackingHeaderContainer,
  mapStyle,
} from './track.styles';
import { TouchableOpacity } from 'react-native';

interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const TrackScreen: React.FC = () => {
  //* hooks
  const { params } = useRoute<StoreCarRouteProp>();

  //* states
  const [currentLocation, setCurrentLocation] = useState<ILocation>();
  const [, setHasPermission] = useState(false);

  const ref = useRef<MapView | null>(null);

  //* handlers
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  //* lifecycle
  let intervalId: NodeJS.Timeout;

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await requestLocationPermission();

        if (intervalId) clearInterval(intervalId);

        const intervalFunc = async () => {
          const { coords } = await Location.getCurrentPositionAsync({});

          const location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };

          if (location !== currentLocation) {
            setCurrentLocation(location);
          }
        };

        intervalFunc();

        intervalId = setInterval(intervalFunc, 4200);
        return () => clearInterval(intervalId);
      })();
    }, []),
  );

  //* render
  return (
    <Container nestedScreen>
      <HeaderContainer>
        <TrackingHeaderContainer>
          <TrackingHeaderCarText>{params.car.title}</TrackingHeaderCarText>
          <TouchableOpacity
            onPress={() => {
              if (currentLocation) {
                ref.current?.animateToRegion(currentLocation, 1000);
              }
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={22}
              color={theme.colors.cyan_500}
            />
          </TouchableOpacity>
        </TrackingHeaderContainer>
      </HeaderContainer>
      <MapContainer>
        <MapView
          ref={ref}
          style={{
            height: '100%',
            width: '100%',
          }}
          initialRegion={currentLocation}
          customMapStyle={mapStyle}
          provider="google"
        >
          {currentLocation &&
            currentLocation.latitude &&
            currentLocation.longitude && (
              <Marker
                draggable
                coordinate={currentLocation}
                pinColor={theme.colors.cyan_500}
                title="I am here"
              />
            )}
        </MapView>
      </MapContainer>
    </Container>
  );
};

export default TrackScreen;
