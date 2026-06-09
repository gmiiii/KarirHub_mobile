import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, Button, Placeholder } from '../src/components/ui';
import { myServices, services, formatRupiah } from '../src/data';
import { C } from '../src/theme';

export default function LayananSaya() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Layanan Saya" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Text className="text-body-md text-on-surface-variant">
          Kelola, aktifkan, atau jeda layanan yang kamu tawarkan.
        </Text>

        {myServices.map((m) => {
          const thumb = services.find((s) => s.id === m.id)?.thumbColor ?? C.primary;
          return (
            <View key={m.id} className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
              <View className="flex-row gap-md">
                <Placeholder icon="brush" color={thumb} className="h-16 w-16" size={26} />
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="flex-1 text-label-md font-bold text-on-surface" numberOfLines={1}>{m.title}</Text>
                    <Badge label={m.active ? 'Aktif' : 'Dijeda'} tone={m.active ? 'verified' : 'neutral'} />
                  </View>
                  <View className="mt-1 flex-row flex-wrap gap-x-md gap-y-1">
                    <Stat icon="shopping-bag" text={`${m.orders} pesanan`} />
                    <Stat icon="visibility" text={`${m.impressions} dilihat`} />
                    <Stat icon="sell" text={`Mulai ${formatRupiah(m.price)}`} />
                  </View>
                </View>
              </View>
              <View className="mt-md flex-row gap-2 border-t border-outline-variant pt-md">
                <View className="flex-1">
                  <Button label="Edit" variant="secondary" icon="edit" size="sm" fullWidth />
                </View>
                <View className="flex-1">
                  <Button
                    label={m.active ? 'Jeda' : 'Aktifkan'}
                    variant="ghost"
                    icon={m.active ? 'pause' : 'play-arrow'}
                    size="sm"
                    fullWidth
                  />
                </View>
              </View>
            </View>
          );
        })}

        {/* Empty-state tambah layanan */}
        <View className="mt-2 items-center gap-2 rounded-xl border-2 border-dashed border-outline-variant p-xl">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primary-fixed">
            <Icon name="add" size={26} color={C.primary} />
          </View>
          <Text className="text-label-md font-semibold text-on-surface">Tawarkan layanan baru</Text>
          <Text className="text-center text-caption text-on-surface-variant">
            Paket Pro memungkinkan layanan tak terbatas. Tambah jasa untuk menjangkau lebih banyak pembeli.
          </Text>
          <Button label="Lihat paket" variant="secondary" icon="workspace-premium" onPress={() => router.push('/langganan')} />
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, text }: { icon: Parameters<typeof Icon>[0]['name']; text: string }) {
  return (
    <View className="flex-row items-center gap-1">
      <Icon name={icon} size={14} color={C.onSurfaceVariant} />
      <Text className="text-caption text-on-surface-variant">{text}</Text>
    </View>
  );
}
