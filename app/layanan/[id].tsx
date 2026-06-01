import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon } from '../../src/components/Icon';
import { VerifiedBadge, StarRating, Placeholder, AvatarInitial, Button } from '../../src/components/ui';
import { getService, formatRupiah } from '../../src/data';
import { C } from '../../src/theme';

export default function ServiceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const service = getService(String(id));
  const [pkg, setPkg] = useState(1);

  if (!service) {
    return (
      <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
        <AppHeader title="Jasa" back />
        <View className="flex-1 items-center justify-center p-lg">
          <Text className="text-body-md text-on-surface-variant">Jasa tidak ditemukan.</Text>
        </View>
      </View>
    );
  }

  const selected = service.packages[pkg];

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Detail Jasa" back />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Placeholder icon="brush" color={service.thumbColor} className="h-48 w-full rounded-none" size={44} />
        <View className="gap-md p-md">
          <Text className="text-headline-md font-bold text-on-surface">{service.title}</Text>
          <View className="flex-row items-center gap-2">
            <AvatarInitial name={service.seller} className="h-8 w-8" textClass="text-caption" />
            <Text className="text-label-md font-semibold text-on-surface">{service.seller}</Text>
            {service.verified && <VerifiedBadge label="Terverifikasi" />}
          </View>
          <StarRating value={service.rating} reviews={service.reviews} size={16} />

          <View className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <Text className="mb-2 text-title-lg font-semibold text-on-surface">Tentang jasa</Text>
            <Text className="text-body-md leading-6 text-on-surface-variant">{service.description}</Text>
          </View>

          {/* Paket */}
          <Text className="text-title-lg font-semibold text-on-surface">Pilih paket</Text>
          <View className="gap-2">
            {service.packages.map((p, i) => (
              <Pressable
                key={p.name}
                onPress={() => setPkg(i)}
                className={`rounded-xl border p-md ${pkg === i ? 'border-primary bg-primary-fixed/40' : 'border-outline-variant bg-surface-container-lowest'}`}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-label-md font-bold text-on-surface">{p.name}</Text>
                  <Text className="text-title-lg font-bold text-primary">{formatRupiah(p.price)}</Text>
                </View>
                <Text className="mt-1 text-caption text-on-surface-variant">{p.desc}</Text>
                <View className="mt-2 gap-1">
                  {p.features.map((f) => (
                    <View key={f} className="flex-row items-center gap-1">
                      <Icon name="check" size={14} color={C.tertiary} />
                      <Text className="text-caption text-on-surface-variant">{f}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="flex-row items-center gap-md border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <View>
          <Text className="text-caption text-on-surface-variant">Total</Text>
          <Text className="text-title-lg font-bold text-on-surface">{formatRupiah(selected.price)}</Text>
        </View>
        <View className="flex-1">
          <Button label="Pesan sekarang" icon="shopping-cart" fullWidth onPress={() => router.push('/checkout')} />
        </View>
      </View>
    </View>
  );
}
