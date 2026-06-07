import { Tabs, Redirect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { FloatingTabBar } from '../../src/components/FloatingTabBar';
import { useMode, roleMeta } from '../../src/mode';

export default function TabsLayout() {
  const { role } = useMode();
  // Tab kandidat hanya untuk mode "pencari". Role lain dialihkan ke home-nya -
  // tiap role independen, hanya bisa dimasuki lewat ganti mode.
  if (role !== 'pencari') return <Redirect href={roleMeta[role].home as never} />;
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
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
