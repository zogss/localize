interface SettingsProps {
  env: string;
  apiUrl: string;
  googleMapsKey: string;
}

export const settings: SettingsProps = {
  env: process.env.EXPO_PUBLIC_ENV ?? 'development',
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333',
  googleMapsKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY ?? '',
};
