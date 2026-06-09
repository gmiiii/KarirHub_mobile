import { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from './Icon';
import { PressableScale } from './PressableScale';
import { AvatarInitial } from './ui';
import { ModeMenu } from './ModeMenu';
import { useMode, roleMeta, type Role } from '../mode';
import { RINA_PHOTO } from '../data';
import { C } from '../theme';

// Nama persona per mode (selaras dengan web). Foto hanya untuk Pencari Kerja.
const accountName: Record<Role, string> = {
  pencari: 'Rina Hapsari',
  seller: 'Dewi Lestari',
  rekruter: 'PT. Teknologi Masa Depan',
};

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
  const { role } = useMode();
  const [menuOpen, setMenuOpen] = useState(false);
  // Isi kapsul berbeda per mode, tapi ukurannya dijaga sama (lebar teks tetap).
  const photo = role === 'pencari' ? RINA_PHOTO : undefined;
  const name = accountName[role];

  return (
    <View
      className={`flex-row items-center justify-between gap-2 px-md py-3 ${
        transparent ? '' : 'border-b border-outline-variant bg-surface'
      }`}
    >
      <View className="min-w-0 flex-1 flex-row items-center gap-2">
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
        <Text
          numberOfLines={1}
          className={
            brand
              ? 'flex-1 text-headline-md font-bold text-primary'
              : 'flex-1 text-title-lg font-semibold text-on-surface'
          }
        >
          {title}
        </Text>
      </View>

      <View className="flex-row items-center gap-1">
        <PressableScale
          hitSlop={8}
          accessibilityLabel="Notifikasi"
          className="h-10 w-10 items-center justify-center rounded-full active:bg-surface-container"
        >
          <Icon name="notifications" size={24} color={C.onSurfaceVariant} />
        </PressableScale>

        {/* Kapsul akun: avatar + nama + mode + chevron (padanan dropdown web).
            Layout & gaya pill di contentClassName karena PressableScale membungkus
            anak di Animated.View. Lebar teks tetap agar ukuran sama di tiap mode. */}
        <PressableScale
          onPress={() => setMenuOpen(true)}
          hitSlop={8}
          accessibilityLabel="Akun & ganti mode"
          accessibilityRole="button"
          contentClassName="flex-row items-center gap-2 rounded-full border border-outline-variant py-1 pl-1 pr-2"
        >
          <AvatarInitial name={name} source={photo} className="h-8 w-8" textClass="text-caption" />
          <View style={{ width: 104 }}>
            <Text numberOfLines={1} className="text-label-md font-semibold text-on-surface">
              {name}
            </Text>
            <Text numberOfLines={1} className="text-caption text-on-surface-variant">
              {roleMeta[role].label}
            </Text>
          </View>
          <Icon name={menuOpen ? 'expand-less' : 'expand-more'} size={18} color={C.onSurfaceVariant} />
        </PressableScale>
      </View>

      <ModeMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
}
