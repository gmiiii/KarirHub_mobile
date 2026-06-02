import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Badge, Placeholder, Button } from '../../src/components/ui';
import { incomingOrders, services, formatRupiah } from '../../src/data';
import { Icon } from '../../src/components/Icon';
import { C } from '../../src/theme';

const tabs = ['Semua', 'Dikerjakan', 'Selesai'] as const;
const tone = { Menunggu: 'warning', Dikerjakan: 'info', Selesai: 'verified' } as const;

export default function PesananScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]>('Semua');
  const list = tab === 'Semua' ? incomingOrders : incomingOrders.filter((o) => o.status === tab);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Pesanan Saya" />
      <View className="flex-row gap-2 border-b border-outline-variant px-md">
        {tabs.map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} className={`border-b-2 px-2 pb-2 pt-3 ${tab === t ? 'border-primary' : 'border-transparent'}`}>
            <Text className={`text-label-md ${tab === t ? 'font-semibold text-primary' : 'text-on-surface-variant'}`}>{t}</Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: TAB_BAR_SPACE }} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View className="items-center gap-2 py-16">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
              <Icon name="inbox" size={28} color={C.onSurfaceVariant} />
            </View>
            <Text className="text-label-md font-semibold text-on-surface">Belum ada pesanan</Text>
            <Text className="text-caption text-on-surface-variant">Pesananmu akan muncul di sini.</Text>
          </View>
        ) : (
          list.map((o) => {
            const thumb = services.find((s) => s.title.startsWith(o.service.split(' ')[0]))?.thumbColor ?? C.primary;
            return (
              <View key={o.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
                <View className="flex-row gap-md">
                  <Placeholder icon="brush" color={thumb} className="h-14 w-14" size={24} />
                  <View className="flex-1">
                    <Text className="text-label-md font-bold text-on-surface" numberOfLines={1}>{o.service}</Text>
                    <Text className="text-caption text-on-surface-variant">{o.id} · Paket {o.pkg}</Text>
                    <View className="mt-1 flex-row items-center justify-between">
                      <Text className="text-label-md font-bold text-on-surface">{formatRupiah(o.price)}</Text>
                      <Badge label={o.status} tone={tone[o.status as keyof typeof tone]} />
                    </View>
                  </View>
                </View>
                <View className="mt-md flex-row items-center justify-between border-t border-outline-variant pt-md">
                  <Text className="text-caption text-on-surface-variant">Tenggat: {o.due}</Text>
                  <Pressable onPress={() => router.push('/transaksi')}>
                    <Text className="text-label-md font-semibold text-primary">Lihat detail</Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
        <Button label="Jelajahi jasa karir" variant="secondary" icon="storefront" onPress={() => router.push('/layanan')} fullWidth />
      </ScrollView>
    </View>
  );
}
