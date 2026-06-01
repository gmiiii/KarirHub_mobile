import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { Badge, AvatarInitial, Button } from '../../src/components/ui';
import { recruiterStats, applicants } from '../../src/data';
import { C } from '../../src/theme';

const statusTone = { Baru: 'info', Review: 'warning', Shortlist: 'verified' } as const;

export default function DashRekruter() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface-container-low" style={{ paddingTop: insets.top }}>
      <AppHeader title="Dashboard Rekruter" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {recruiterStats.map((s) => (
            <StatCard key={s.label} icon={s.icon as MaterialIconName} label={s.label} value={s.value} delta={s.delta} />
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

        <Button label="Pasang lowongan baru" icon="add" fullWidth onPress={() => router.push('/(tabs)/lowongan')} />
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
