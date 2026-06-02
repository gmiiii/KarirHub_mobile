import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Icon } from '../../src/components/Icon';
import { ServiceCard } from '../../src/components/cards';
import { services, serviceCategories } from '../../src/data';
import { C } from '../../src/theme';

export default function LayananScreen() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState('Semua');
  const cats = ['Semua', ...serviceCategories.map((c) => c.label)];
  const list = active === 'Semua' ? services : services.filter((s) => s.category === active);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Jasa Karir" />
      <View className="gap-3 px-md pt-md">
        <View className="flex-row items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md">
          <Icon name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput placeholder="Cari jasa, mis. review CV" placeholderTextColor={C.onSurfaceVariant} className="flex-1 py-3 text-body-md text-on-surface" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {cats.map((c) => (
            <Pressable
              key={c}
              onPress={() => setActive(c)}
              className={`rounded-full px-md py-2 active:opacity-70 ${active === c ? 'bg-primary' : 'border border-outline-variant bg-surface-container-lowest'}`}
            >
              <Text className={`text-label-md font-medium ${active === c ? 'text-on-primary' : 'text-on-surface-variant'}`}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={list}
        keyExtractor={(s) => s.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View className="flex-1">
            <ServiceCard service={item} />
          </View>
        )}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: TAB_BAR_SPACE }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
