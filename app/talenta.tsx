import { useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, VerifiedBadge, StarRating, AvatarInitial, Button } from '../src/components/ui';
import { useToast } from '../src/components/Toast';
import { talents } from '../src/data';
import { C } from '../src/theme';

export default function Talenta() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = talents.filter(
    (t) => !q || [t.name, t.title, ...t.skills].join(' ').toLowerCase().includes(q),
  );

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Cari Talenta" back />
      <View className="px-md pt-md">
        <View className="flex-row items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md">
          <Icon name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari keahlian, mis. React"
            placeholderTextColor={C.onSurfaceVariant}
            className="flex-1 py-3 text-body-md text-on-surface"
          />
        </View>
      </View>
      <FlatList
        data={list}
        keyExtractor={(t) => t.name}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: t }) => (
          <View className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <View className="flex-row gap-md">
              <AvatarInitial name={t.name} className="h-12 w-12" textClass="text-title-lg" />
              <View className="flex-1">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-label-md font-bold text-on-surface">{t.name}</Text>
                    <Text className="text-caption text-on-surface-variant">{t.title}</Text>
                  </View>
                  {t.open && <VerifiedBadge label="Terbuka" />}
                </View>
                <View className="mt-1 flex-row flex-wrap items-center gap-x-3 gap-y-1">
                  <View className="flex-row items-center gap-1">
                    <Icon name="location-on" size={13} color={C.onSurfaceVariant} />
                    <Text className="text-caption text-on-surface-variant">{t.location}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Icon name="work-history" size={13} color={C.onSurfaceVariant} />
                    <Text className="text-caption text-on-surface-variant">{t.exp}</Text>
                  </View>
                  <StarRating value={t.rating} size={13} />
                </View>
              </View>
            </View>
            <View className="mt-md flex-row flex-wrap gap-2">
              {t.skills.map((s) => (
                <Badge key={s} label={s} tone="info" />
              ))}
            </View>
            <View className="mt-md flex-row gap-2">
              <View className="flex-1">
                <Button label="Lihat profil" variant="secondary" size="sm" icon="visibility" fullWidth onPress={() => toast(`Membuka profil ${t.name}`, 'info')} />
              </View>
              <View className="flex-1">
                <Button label="Hubungi" size="sm" icon="mail" fullWidth onPress={() => toast(`Pesan terkirim ke ${t.name}`)} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
