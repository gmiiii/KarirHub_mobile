import { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from './Icon';
import { PressableScale } from './PressableScale';
import { AvatarInitial } from './ui';
import { ModeMenu } from './ModeMenu';
import { C } from '../theme';

/** Top app bar bersama. `back` menampilkan tombol kembali; default judul "KarirHub".
 *  `transparent` menghilangkan latar & garis bawah agar bisa duduk di atas blur. */
export function AppHeader({
  title = 'KarirHub',
  back = false,
  brand = false,
  transparent = false,
}: {
  title?: string;
  back?: boolean;
  brand?: boolean;
  transparent?: boolean;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <View
      className={`flex-row items-center justify-between px-md py-3 ${
        transparent ? '' : 'border-b border-outline-variant bg-surface'
      }`}
    >
      <View className="flex-row items-center gap-2">
        {back && (
          <PressableScale
            onPress={() => router.back()}
            hitSlop={8}
            accessibilityLabel="Kembali"
            className="h-10 w-10 items-center justify-center rounded-full active:bg-surface-container"
          >
            <Icon name="arrow-back" size={24} color={C.onSurface} />
          </PressableScale>
        )}
        <Text className={brand ? 'text-headline-md font-bold text-primary' : 'text-title-lg font-semibold text-on-surface'}>
          {title}
        </Text>
      </View>
      <View className="flex-row items-center gap-1">
        <PressableScale hitSlop={8} accessibilityLabel="Notifikasi" className="h-10 w-10 items-center justify-center rounded-full active:bg-surface-container">
          <Icon name="notifications" size={24} color={C.onSurfaceVariant} />
        </PressableScale>
        <PressableScale
          onPress={() => setMenuOpen(true)}
          hitSlop={8}
          accessibilityLabel="Akun & ganti mode"
          className="rounded-full"
        >
          <AvatarInitial name="Rina Hapsari" className="h-9 w-9" textClass="text-caption" />
        </PressableScale>
      </View>

      <ModeMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}
