import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { AvatarInitial, VerifiedBadge, Badge, Button } from '../../src/components/ui';
import { RevealScrollView, Reveal } from '../../src/components/motion';
import { C } from '../../src/theme';

const menus: { icon: MaterialIconName; label: string; href: string }[] = [
  { icon: 'description', label: 'CV Saya', href: '/cv-saya' },
  { icon: 'bookmark', label: 'Lowongan Tersimpan', href: '/lowongan' },
  { icon: 'receipt-long', label: 'Riwayat Transaksi', href: '/transaksi' },
  { icon: 'workspace-premium', label: 'Paket Langganan', href: '/langganan' },
];

const skills = ['Figma', 'Design System', 'User Research', 'Prototyping'];

export default function ProfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Profil" />
      <RevealScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE }} showsVerticalScrollIndicator={false}>
        {/* Header profil - instan */}
        <View className="items-center gap-2 bg-primary-container px-lg pb-lg pt-lg">
          <AvatarInitial name="Rina Hapsari" className="h-20 w-20 border-4 border-surface" textClass="text-headline-md" />
          <View className="flex-row items-center gap-2">
            <Text className="text-title-lg font-bold text-on-primary-container">Rina Hapsari</Text>
            <VerifiedBadge label="Terverifikasi" />
          </View>
          <Text className="text-body-md text-on-primary-container">Senior Product Designer</Text>
          <View className="flex-row items-center gap-1">
            <Icon name="location-on" size={14} color={C.onPrimaryContainer} />
            <Text className="text-caption text-on-primary-container">Jakarta, Indonesia</Text>
          </View>
        </View>

        <View className="gap-lg p-md">
          {/* Kelengkapan profil */}
          <Reveal className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <View className="flex-row items-center justify-between">
              <Text className="text-label-md font-semibold text-on-surface">Kelengkapan profil</Text>
              <Text className="text-label-md font-bold text-on-surface">80%</Text>
            </View>
            <View className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-highest">
              <View className="h-full rounded-full bg-tertiary" style={{ width: '80%' }} />
            </View>
            <Text className="mt-2 text-caption text-on-surface-variant">Lengkapi portofolio untuk mencapai 100%.</Text>
          </Reveal>

          {/* Keahlian */}
          <Reveal className="gap-2">
            <Text className="text-title-lg font-semibold text-on-surface">Keahlian</Text>
            <View className="flex-row flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} label={s} tone="info" />
              ))}
            </View>
          </Reveal>

          {/* Menu */}
          <Reveal className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
            {menus.map((m, i) => (
              <Pressable
                key={m.label}
                onPress={() => router.push(m.href as never)}
                className={`flex-row items-center gap-md px-lg py-4 active:bg-surface-container-low ${i > 0 ? 'border-t border-outline-variant' : ''}`}
              >
                <Icon name={m.icon} size={22} color={C.primary} />
                <Text className="flex-1 text-body-md text-on-surface">{m.label}</Text>
                <Icon name="chevron-right" size={22} color={C.onSurfaceVariant} />
              </Pressable>
            ))}
          </Reveal>

          <Reveal className="gap-3">
            <Button label="Edit profil" variant="secondary" icon="edit" fullWidth />
            <Pressable
              accessibilityRole="button"
              className="h-12 flex-row items-center justify-center gap-2 rounded-lg border border-error/25 bg-error-container active:scale-[0.97] active:opacity-95"
            >
              <Icon name="logout" size={20} color={C.onErrorContainer} />
              <Text className="text-label-md font-semibold text-on-error-container">Keluar</Text>
            </Pressable>
          </Reveal>
        </View>
      </RevealScrollView>
    </View>
  );
}
