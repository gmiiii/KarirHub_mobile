import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModeProvider } from '../src/mode';
import { ToastProvider } from '../src/components/Toast';
import { C } from '../src/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ModeProvider>
        <ToastProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: C.surface },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ToastProvider>
      </ModeProvider>
    </SafeAreaProvider>
  );
}
