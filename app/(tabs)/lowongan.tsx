import { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { TAB_BAR_SPACE } from '../../src/components/FloatingTabBar';
import { Icon } from '../../src/components/Icon';
import { FilterChips } from '../../src/components/FilterChips';
import { StickyHeaderBlur } from '../../src/components/StickyHeaderBlur';
import { JobCard } from '../../src/components/cards';
import { RevealItem } from '../../src/components/motion';
import { jobs, jobTypes } from '../../src/data';
import { C } from '../../src/theme';

export default function JobBoardScreen() {
  const [active, setActive] = useState('Semua');
  const [query, setQuery] = useState('');
  const [headerH, setHeaderH] = useState(200); // estimasi awal; dikoreksi onLayout
  const filters = ['Semua', ...jobTypes];
  const q = query.trim().toLowerCase();
  const list = jobs.filter((j) => {
    const okType = active === 'Semua' || j.type === active;
    const okQuery = !q || [j.title, j.company, ...j.tags].join(' ').toLowerCase().includes(q);
    return okType && okQuery;
  });

  return (
    <View className="flex-1 bg-surface-container-low">
      {/* Sheet galeri: sudut atas membulat, latar surface; konten menggulir di
          atasnya & di belakang header blur */}
      <View
        pointerEvents="none"
        className="absolute left-0 right-0 bg-surface"
        style={{ top: headerH, bottom: 0, borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
      />
      <FlatList
        data={list}
        keyExtractor={(j) => j.id}
        renderItem={({ item, index }) => (
          <RevealItem index={index}>
            <JobCard job={item} />
          </RevealItem>
        )}
        contentContainerStyle={{
          paddingTop: headerH + 24,
          paddingHorizontal: 16,
          gap: 12,
          paddingBottom: TAB_BAR_SPACE,
        }}
        ListHeaderComponent={
          <Text className="pb-1 text-body-md text-on-surface-variant">
            Menampilkan <Text className="font-semibold text-on-surface">{list.length}</Text> lowongan
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
      <StickyHeaderBlur title="Lowongan Kerja" onHeight={setHeaderH}>
        <View className="flex-row items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md">
          <Icon name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Posisi atau kata kunci"
            placeholderTextColor={C.onSurfaceVariant}
            className="flex-1 py-3 text-body-md text-on-surface"
          />
        </View>
        <FilterChips options={filters} value={active} onChange={setActive} />
      </StickyHeaderBlur>
    </View>
  );
}
