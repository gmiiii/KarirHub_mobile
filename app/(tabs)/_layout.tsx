import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { C } from '../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.secondary,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: C.outlineVariant,
          backgroundColor: C.surface,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="layanan"
        options={{
          title: 'Jasa',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="design-services" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="lowongan"
        options={{
          title: 'Lowongan',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="work" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="pesanan"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="assignment" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
