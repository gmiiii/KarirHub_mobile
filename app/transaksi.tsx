import { View, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../src/components/Icon';
import { Badge } from '../src/components/ui';
import { transactions, formatRupiah } from '../src/data';

const tone = { Berhasil: 'verified', Gagal: 'danger', Pending: 'warning' } as const;
const icon: Record<string, { name: MaterialIconName; bg: string; color: string }> = {
  Berhasil: { name: 'check-circle', bg: 'bg-tertiary-fixed', color: '#006329' },
  Gagal: { name: 'cancel', bg: 'bg-error-container', color: '#ba1a1a' },
  Pending: { name: 'schedule', bg: 'bg-surface-container-highest', color: '#434655' },
};

export default function Transaksi() {
  const insets = useSafeAreaInsets();
  const totalBerhasil = transactions.filter((t) => t.status === 'Berhasil').reduce((a, t) => a + t.amount, 0);
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Riwayat Transaksi" back />
      <FlatList
        data={transactions}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-1 rounded-xl bg-primary-container p-lg">
            <Text className="text-caption text-on-primary-container opacity-90">Total transaksi berhasil</Text>
            <Text className="text-headline-md font-bold text-on-primary-container">{formatRupiah(totalBerhasil)}</Text>
          </View>
        }
        renderItem={({ item: t }) => {
          const ic = icon[t.status];
          return (
            <View className="flex-row items-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
              <View className={`h-11 w-11 items-center justify-center rounded-full ${ic.bg}`}>
                <Icon name={ic.name} size={22} color={ic.color} />
              </View>
              <View className="flex-1">
                <Text className="text-label-md font-semibold text-on-surface" numberOfLines={1}>{t.item}</Text>
                <Text className="text-caption text-on-surface-variant">{t.id} · {t.date} · {t.method}</Text>
              </View>
              <View className="items-end">
                <Text className="text-label-md font-bold text-on-surface">{formatRupiah(t.amount)}</Text>
                <Badge label={t.status} tone={tone[t.status as keyof typeof tone]} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
