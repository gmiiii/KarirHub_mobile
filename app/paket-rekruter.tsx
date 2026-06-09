import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, Button } from '../src/components/ui';
import { recruiterPlans, formatRupiah } from '../src/data';
import { C } from '../src/theme';

export default function PaketRekruter() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Paket Premium" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="gap-1">
          <Badge label="Untuk Rekruter" tone="info" icon="workspace-premium" />
          <Text className="text-headline-md font-bold text-on-surface">Rekrut lebih cepat</Text>
          <Text className="text-body-md text-on-surface-variant">
            Lebih banyak slot lowongan, akses talent pool penuh, dan skor kecocokan lanjutan.
          </Text>
        </View>

        {recruiterPlans.map((p) => (
          <View
            key={p.name}
            className={`rounded-xl border bg-surface-container-lowest p-lg ${p.highlight ? 'border-primary' : 'border-outline-variant'}`}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-title-lg font-bold text-on-surface">{p.name}</Text>
              {p.highlight && <Badge label="Populer" tone="info" icon="star" />}
            </View>
            <View className="mt-1 flex-row items-baseline gap-1">
              <Text className="text-headline-md font-bold text-on-surface">{formatRupiah(p.price)}</Text>
              <Text className="text-body-md text-on-surface-variant">/{p.period}</Text>
            </View>
            <View className="mt-md gap-2">
              {p.features.map((f) => (
                <View key={f} className="flex-row items-center gap-2">
                  <Icon name="check-circle" size={18} color={C.tertiary} />
                  <Text className="text-body-md text-on-surface-variant">{f}</Text>
                </View>
              ))}
            </View>
            <View className="mt-lg">
              <Button label={p.cta} variant={p.highlight ? 'primary' : 'secondary'} fullWidth />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
