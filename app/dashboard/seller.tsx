import { View, Text, ScrollView } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { Badge, Button } from '../../src/components/ui';
import { useMode, roleMeta } from '../../src/mode';
import { sellerStats, incomingOrders, formatRupiah } from '../../src/data';
import { C } from '../../src/theme';

const orderTone = { Menunggu: 'warning', Dikerjakan: 'info', Selesai: 'verified' } as const;
const revenue = [40, 65, 50, 80, 72, 95, 88];
const days = ['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'];

export default function DashSeller() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { role } = useMode();
  // Hanya bisa diakses dalam mode seller; role lain dialihkan ke home-nya.
  if (role !== 'seller') return <Redirect href={roleMeta[role].home as never} />;
  const max = Math.max(...revenue);
  return (
    <View className="flex-1 bg-surface-container-low" style={{ paddingTop: insets.top }}>
      <AppHeader title="Dashboard Seller" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {sellerStats.map((s) => (
            <StatCard key={s.label} icon={s.icon as MaterialIconName} label={s.label} value={s.value} delta={s.delta} />
          ))}
        </View>

        {/* Grafik */}
        <View className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <View className="mb-md flex-row items-center justify-between">
            <Text className="text-title-lg font-semibold text-on-surface">Pendapatan 7 hari</Text>
            <Badge label="+24%" tone="verified" icon="trending-up" />
          </View>
          <View className="h-36 flex-row items-end justify-between" style={{ gap: 8 }}>
            {revenue.map((v, i) => (
              <View key={i} className="flex-1 items-center" style={{ gap: 6 }}>
                <View className="w-full rounded-t-md bg-primary" style={{ height: `${(v / max) * 100}%` }} />
                <Text className="text-caption text-on-surface-variant">{days[i]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pesanan */}
        <View className="rounded-xl border border-outline-variant bg-surface-container-lowest">
          <View className="flex-row items-center justify-between border-b border-outline-variant p-lg">
            <Text className="text-title-lg font-semibold text-on-surface">Pesanan masuk</Text>
          </View>
          {incomingOrders.map((o, i) => (
            <View key={o.id} className={`p-lg ${i > 0 ? 'border-t border-outline-variant' : ''}`}>
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-2">
                  <Text className="text-label-md font-semibold text-on-surface" numberOfLines={1}>{o.service}</Text>
                  <Text className="text-caption text-on-surface-variant">{o.id} · {o.buyer} · {o.due}</Text>
                </View>
                <Badge label={o.status} tone={orderTone[o.status as keyof typeof orderTone]} />
              </View>
              <Text className="mt-1 text-label-md font-bold text-on-surface">{formatRupiah(o.price)}</Text>
            </View>
          ))}
        </View>

        <Button label="Lihat transaksi" variant="secondary" icon="receipt-long" fullWidth onPress={() => router.push('/transaksi')} />
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
      <Text className="mt-2 text-title-lg font-bold text-on-surface" numberOfLines={1}>{value}</Text>
      <Text className="text-caption text-on-surface-variant">{label}</Text>
      {delta && <Text className="mt-1 text-caption text-tertiary">{delta}</Text>}
    </View>
  );
}
