import { ScrollView, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { ServiceCard } from '../../src/components/cards';
import { JobCard } from '../../src/components/cards';
import { Button } from '../../src/components/ui';
import { services, jobs } from '../../src/data';
import { C } from '../../src/theme';

const shortcuts: { icon: MaterialIconName; label: string; href: string }[] = [
  { icon: 'photo-camera', label: 'AI Foto CV', href: '/ai-foto-cv' },
  { icon: 'work-history', label: 'Jasa Karir', href: '/layanan' },
  { icon: 'apartment', label: 'Lowongan', href: '/lowongan' },
  { icon: 'person-search', label: 'Talenta', href: '/talenta' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader brand />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: TAB_BAR_SPACE }} showsVerticalScrollIndicator={false}>
        {/* Hero card */}
        <View className="overflow-hidden rounded-xl bg-primary p-lg">
          <Text className="max-w-[85%] text-headline-md font-bold text-on-primary">
            Satu platform untuk semua kebutuhan karirmu
          </Text>
          <Text className="mt-2 max-w-[92%] text-body-md text-on-primary opacity-90">
            Akses lowongan impian dan jasa karir profesional dalam satu genggaman.
          </Text>
          <Pressable
            onPress={() => router.push('/lowongan')}
            className="mt-md self-start rounded-lg bg-surface px-lg py-3 active:scale-[0.97] active:opacity-95"
          >
            <Text className="text-label-md font-bold text-primary">Mulai sekarang</Text>
          </Pressable>
        </View>

        {/* Grid pintasan 2x2 */}
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {shortcuts.map((s) => (
            <Pressable
              key={s.label}
              onPress={() => router.push(s.href as never)}
              style={{ width: '47.5%' }}
              className="flex-grow items-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-md active:scale-[0.98] active:opacity-95"
            >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-container-high">
                <Icon name={s.icon} size={22} color={C.primary} />
              </View>
              <Text className="text-label-md font-semibold text-on-surface">{s.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Jasa populer (scroll horizontal) */}
        <View className="gap-md">
          <View className="flex-row items-center justify-between">
            <Text className="text-title-lg font-semibold text-on-surface">Jasa populer</Text>
            <Pressable onPress={() => router.push('/layanan')} hitSlop={10} className="-mr-1 px-1 py-1 active:opacity-60">
              <Text className="text-label-md font-semibold text-primary">Lihat semua</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingRight: 8 }}
          >
            {services.slice(0, 5).map((s) => (
              <ServiceCard key={s.id} service={s} width={240} />
            ))}
          </ScrollView>
        </View>

        {/* Lowongan terbaru */}
        <View className="gap-md">
          <View className="flex-row items-center justify-between">
            <Text className="text-title-lg font-semibold text-on-surface">Lowongan terbaru</Text>
            <Pressable onPress={() => router.push('/lowongan')} hitSlop={10} className="-mr-1 px-1 py-1 active:opacity-60">
              <Text className="text-label-md font-semibold text-primary">Lihat semua</Text>
            </Pressable>
          </View>
          <View className="gap-md">
            {jobs.slice(0, 3).map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </View>
        </View>

        <Button label="Tingkatkan profil dengan jasa karir" icon="auto-awesome" onPress={() => router.push('/layanan')} fullWidth />
      </ScrollView>
    </View>
  );
}
