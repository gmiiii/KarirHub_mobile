import { useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Icon } from '../../src/components/Icon';
import { FilterChips } from '../../src/components/FilterChips';
import { StickyHeaderBlur } from '../../src/components/StickyHeaderBlur';
import { ServiceCard } from '../../src/components/cards';
import { RevealItem } from '../../src/components/motion';
import { services, serviceCategories } from '../../src/data';
import { C } from '../../src/theme';

export default function LayananScreen() {
  const [active, setActive] = useState('Semua');
  const [query, setQuery] = useState('');
  const [headerH, setHeaderH] = useState(200); // estimasi awal; dikoreksi onLayout
  const cats = ['Semua', ...serviceCategories.map((c) => c.label)];
  const q = query.trim().toLowerCase();
  const list = services.filter((s) => {
    const okCat = active === 'Semua' || s.category === active;
    const okQuery = !q || [s.title, s.seller, s.category].join(' ').toLowerCase().includes(q);
    return okCat && okQuery;
  });

  return (
    <View className="flex-1 bg-surface-container-low">
      {/* Sheet galeri: sudut atas membulat, latar surface */}
      <View
        pointerEvents="none"
        className="absolute left-0 right-0 bg-surface"
        style={{ top: headerH, bottom: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
      />
      <FlatList
        data={list}
        keyExtractor={(s) => s.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item, index }) => (
          <RevealItem index={index} style={{ flex: 1 }}>
            <ServiceCard service={item} />
          </RevealItem>
        )}
        contentContainerStyle={{
          paddingTop: headerH + 24,
          paddingHorizontal: 16,
          gap: 12,
          paddingBottom: TAB_BAR_SPACE,
        }}
        showsVerticalScrollIndicator={false}
      />
      <StickyHeaderBlur title="Jasa Karir" onHeight={setHeaderH}>
        <View className="flex-row items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md">
          <Icon name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari jasa, mis. review CV"
            placeholderTextColor={C.onSurfaceVariant}
            className="flex-1 py-3 text-body-md text-on-surface"
          />
        </View>
        <FilterChips options={cats} value={active} onChange={setActive} />
      </StickyHeaderBlur>
    </View>
  );
}
