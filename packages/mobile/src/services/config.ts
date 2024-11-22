interface SettingsProps {
  env: string;
  appUrl: string;
  apiUrl: string;
  googleMapsKey: string;
}

export const settings: SettingsProps = {
  env: process.env.EXPO_PUBLIC_ENV ?? 'development',
  appUrl: process.env.EXPO_PUBLIC_APP_URL ?? 'http://localhost:19006',
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333',
  googleMapsKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY ?? '',
};
