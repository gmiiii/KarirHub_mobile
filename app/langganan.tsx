import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, Button } from '../src/components/ui';
import { sellerPlans, cvCreditPlans, cvCreditTopups, formatRupiah } from '../src/data';
import { C } from '../src/theme';

type Tab = 'kredit' | 'seller';

type Plan = {
  name: string;
  price: number;
  period: string;
  highlight: boolean;
  features: string[];
  cta: string;
};

export default function Langganan() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>('kredit');

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Paket Langganan" back />

      {/* Tab segmen */}
      <View className="flex-row gap-1 rounded-full border border-outline-variant bg-surface-container p-1 mx-md mt-3">
        {(['kredit', 'seller'] as Tab[]).map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className={`flex-1 flex-row items-center justify-center gap-1 rounded-full py-2 ${active ? 'bg-surface-container-lowest' : ''}`}
            >
              <Icon name={t === 'kredit' ? 'auto-awesome' : 'storefront'} size={16} color={active ? C.primary : C.onSurfaceVariant} />
              <Text className={`text-label-md font-semibold ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                {t === 'kredit' ? 'Kredit CV' : 'Seller'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {tab === 'kredit' ? (
          <>
            <View className="gap-1">
              <Badge label="Untuk Pencari Kerja" tone="info" icon="auto-awesome" />
              <Text className="text-headline-md font-bold text-on-surface">Kredit pembuatan CV</Text>
              <Text className="text-body-md text-on-surface-variant">
                1 kredit = 1x membuat CV dengan AI (pasfoto formal + ringkasan otomatis).
              </Text>
            </View>

            {(cvCreditPlans as Plan[]).map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}

            <Text className="mt-2 text-title-lg font-semibold text-on-surface">Beli kredit satuan</Text>
            <Text className="-mt-1 text-body-md text-on-surface-variant">Tanpa langganan, untuk pemakaian sesekali.</Text>
            {cvCreditTopups.map((t) => (
              <View key={t.credits} className="flex-row items-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
                <View className="h-11 w-11 items-center justify-center rounded-full bg-primary-fixed">
                  <Icon name="auto-awesome" size={22} color={C.primary} />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-title-lg font-bold text-on-surface">{t.credits} kredit</Text>
                    {t.note && <Badge label={t.note} tone="verified" />}
                  </View>
                  <Text className="text-body-md font-bold text-primary">{formatRupiah(t.price)}</Text>
                </View>
                <Button label="Beli" variant="secondary" icon="shopping-cart" />
              </View>
            ))}

            <View className="mt-1 flex-row gap-2 rounded-lg bg-primary-fixed/50 p-md">
              <Icon name="info" size={18} color={C.primary} />
              <Text className="flex-1 text-body-md text-on-surface-variant">
                Kredit dipakai otomatis saat menekan "Generate" di fitur Buat CV dengan AI.
              </Text>
            </View>
          </>
        ) : (
          <>
            <View className="gap-1">
              <Badge label="Untuk Seller" tone="info" icon="workspace-premium" />
              <Text className="text-headline-md font-bold text-on-surface">Tumbuhkan bisnis jasamu</Text>
              <Text className="text-body-md text-on-surface-variant">
                Komisi lebih rendah, layanan tak terbatas, dan prioritas di pencarian.
              </Text>
            </View>

            {(sellerPlans as Plan[]).map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function PlanCard({ plan: p }: { plan: Plan }) {
  return (
    <View className={`rounded-xl border bg-surface-container-lowest p-lg ${p.highlight ? 'border-primary' : 'border-outline-variant'}`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-title-lg font-bold text-on-surface">{p.name}</Text>
        {p.highlight && <Badge label="Populer" tone="info" icon="star" />}
      </View>
      <View className="mt-1 flex-row items-baseline gap-1">
        <Text className="text-headline-md font-bold text-on-surface">{p.price === 0 ? 'Gratis' : formatRupiah(p.price)}</Text>
        {p.price > 0 && <Text className="text-body-md text-on-surface-variant">/{p.period}</Text>}
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
  );
}
