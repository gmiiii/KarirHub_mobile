import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { Badge, AvatarInitial } from '../../src/components/ui';
import { useMode, roleMeta } from '../../src/mode';
import { recruiterStats, applicants } from '../../src/data';
import { C } from '../../src/theme';

const statusTone = { Baru: 'info', Review: 'warning', Shortlist: 'verified' } as const;

const rekruterNav: { icon: MaterialIconName; label: string; href: string }[] = [
  { icon: 'add-box', label: 'Pasang Lowongan', href: '/pasang-lowongan' },
  { icon: 'groups', label: 'Cari Talenta', href: '/talenta' },
  { icon: 'workspace-premium', label: 'Paket Premium', href: '/paket-rekruter' },
  { icon: 'receipt-long', label: 'Transaksi', href: '/transaksi' },
];

const activeJobs = [
  { title: 'Senior UI/UX Designer', applicants: 420 },
  { title: 'Back-End Engineer (Go/Node)', applicants: 318 },
  { title: 'Data Analyst', applicants: 510 },
];

const rekruterTips: { icon: MaterialIconName; text: string }[] = [
  { icon: 'fact-check', text: '64 pelamar menunggu direview.' },
  { icon: 'schedule', text: '2 lowongan akan kedaluwarsa minggu ini.' },
  { icon: 'workspace-premium', text: 'Tingkatkan ke paket Growth untuk slot lebih banyak.' },
];

export default function DashRekruter() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { role } = useMode();
  // Hanya bisa diakses dalam mode rekruter; role lain dialihkan ke home-nya.
  if (role !== 'rekruter') return <Redirect href={roleMeta[role].home as never} />;
  return (
    <View className="flex-1 bg-surface-container-low" style={{ paddingTop: insets.top }}>
      <AppHeader title="Dashboard Rekruter" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {recruiterStats.map((s) => (
            <StatCard key={s.label} icon={s.icon as MaterialIconName} label={s.label} value={s.value} delta={s.delta} />
          ))}
        </View>

        {/* Aksi cepat */}
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {rekruterNav.map((n) => (
            <Pressable
              key={n.href}
              onPress={() => router.push(n.href as never)}
              style={{ width: '47.5%' }}
              className="flex-grow flex-row items-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-md active:bg-surface-container-low"
            >
              <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed">
                <Icon name={n.icon} size={20} color={C.primary} />
              </View>
              <Text className="flex-1 text-label-md font-semibold text-on-surface">{n.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="rounded-xl border border-outline-variant bg-surface-container-lowest">
          <View className="flex-row items-center justify-between border-b border-outline-variant p-lg">
            <Text className="text-title-lg font-semibold text-on-surface">Pelamar terbaru</Text>
          </View>
          {applicants.map((a, i) => (
            <View key={a.name} className={`flex-row items-center gap-md p-lg ${i > 0 ? 'border-t border-outline-variant' : ''}`}>
              <AvatarInitial name={a.name} className="h-10 w-10" />
              <View className="flex-1">
                <Text className="text-label-md font-semibold text-on-surface">{a.name}</Text>
                <Text className="text-caption text-on-surface-variant" numberOfLines={1}>{a.role} · {a.match}% cocok</Text>
              </View>
              <Badge label={a.status} tone={statusTone[a.status as keyof typeof statusTone]} />
            </View>
          ))}
        </View>

        {/* Lowongan aktif */}
        <View className="gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Lowongan aktif</Text>
          {activeJobs.map((j, i) => (
            <View
              key={j.title}
              className={`flex-row items-center justify-between ${i > 0 ? 'border-t border-outline-variant pt-3' : ''}`}
            >
              <View className="flex-1 pr-2">
                <Text className="text-label-md font-semibold text-on-surface" numberOfLines={1}>{j.title}</Text>
                <Text className="text-caption text-on-surface-variant">{j.applicants} pelamar</Text>
              </View>
              <Badge label="Aktif" tone="verified" />
            </View>
          ))}
        </View>

        {/* Saran tindakan */}
        <View className="gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Saran tindakan</Text>
          {rekruterTips.map((t) => (
            <View key={t.text} className="flex-row items-start gap-md">
              <Icon name={t.icon} size={20} color={C.primary} />
              <Text className="flex-1 text-body-md text-on-surface-variant">{t.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, label, value, delta }: { icon: MaterialIconName; label: string; value: string; delta?: string }) {
  return (
    <View style={{ width: '47.5%' }} className="flex-grow rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed">
        <Icon name={icon} size={22} color={C.primary} />
      </View>
      <Text className="mt-2 text-headline-md font-bold text-on-surface">{value}</Text>
      <Text className="text-label-md text-on-surface-variant">{label}</Text>
      {delta && <Text className="mt-1 text-caption text-tertiary">{delta}</Text>}
    </View>
  );
}
