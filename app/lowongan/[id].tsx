import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { Badge, VerifiedBadge, Placeholder, Button } from '../../src/components/ui';
import { getJob } from '../../src/data';
import { C } from '../../src/theme';

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const job = getJob(String(id));

  if (!job) {
    return (
      <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
        <AppHeader title="Lowongan" back />
        <View className="flex-1 items-center justify-center p-lg">
          <Text className="text-body-md text-on-surface-variant">Lowongan tidak ditemukan.</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Detail Lowongan" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row gap-md">
          <Placeholder icon="apartment" color={job.logoColor} className="h-16 w-16" size={28} />
          <View className="flex-1">
            <Text className="text-headline-md font-bold text-on-surface">{job.title}</Text>
            <Text className="text-body-lg text-on-surface-variant">{job.company}</Text>
          </View>
        </View>
        <View className="flex-row flex-wrap gap-2">
          <Badge label={job.location} icon="location-on" />
          <Badge label={job.type} tone="type" />
          <Badge label={job.experience} />
          {job.verified && <VerifiedBadge label="Terverifikasi" />}
        </View>

        <View className="flex-row gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Stat icon="payments" label="Estimasi gaji" value={job.salary} />
        </View>

        <Section title="Deskripsi">
          <Text className="text-body-md leading-6 text-on-surface-variant">{job.description}</Text>
        </Section>
        <Section title="Tanggung jawab">
          <Bullets items={job.responsibilities} />
        </Section>
        <Section title="Kualifikasi">
          <Bullets items={job.requirements} />
        </Section>
        <Section title="Keahlian">
          <View className="flex-row flex-wrap gap-2">
            {job.tags.map((t) => (
              <Badge key={t} label={t} tone="info" />
            ))}
          </View>
        </Section>
      </ScrollView>

      {/* Bottom action bar */}
      <View className="flex-row items-center gap-md border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label="Simpan" variant="secondary" icon="bookmark" onPress={() => {}} />
        <View className="flex-1">
          <Button label="Lamar Sekarang" icon="send" fullWidth onPress={() => router.push('/checkout')} />
        </View>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
      <Text className="mb-2 text-title-lg font-semibold text-on-surface">{title}</Text>
      {children}
    </View>
  );
}
function Stat({ icon, label, value }: { icon: MaterialIconName; label: string; value: string }) {
  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-1">
        <Icon name={icon} size={16} color={C.onSurfaceVariant} />
        <Text className="text-caption text-on-surface-variant">{label}</Text>
      </View>
      <Text className="mt-1 text-label-md font-semibold text-on-surface">{value}</Text>
    </View>
  );
}
function Bullets({ items }: { items: string[] }) {
  return (
    <View className="gap-2">
      {items.map((it) => (
        <View key={it} className="flex-row gap-2">
          <Icon name="check-circle" size={18} color={C.tertiary} />
          <Text className="flex-1 text-body-md text-on-surface-variant">{it}</Text>
        </View>
      ))}
    </View>
  );
}
