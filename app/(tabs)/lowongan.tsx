import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon } from '../../src/components/Icon';
import { JobCard } from '../../src/components/cards';
import { jobs, jobTypes } from '../../src/data';
import { C } from '../../src/theme';

export default function JobBoardScreen() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState('Semua');
  const filters = ['Semua', ...jobTypes];
  const list = active === 'Semua' ? jobs : jobs.filter((j) => j.type === active);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Lowongan Kerja" />
      <View className="gap-3 px-md pt-md">
        <View className="flex-row items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md">
          <Icon name="search" size={20} color={C.onSurfaceVariant} />
          <TextInput
            placeholder="Posisi atau kata kunci"
            placeholderTextColor={C.onSurfaceVariant}
            className="flex-1 py-3 text-body-md text-on-surface"
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {filters.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActive(f)}
              className={`rounded-full px-md py-2 active:opacity-70 ${active === f ? 'bg-primary' : 'border border-outline-variant bg-surface-container-lowest'}`}
            >
              <Text className={`text-label-md font-medium ${active === f ? 'text-on-primary' : 'text-on-surface-variant'}`}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={list}
        keyExtractor={(j) => j.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <Text className="pb-1 text-body-md text-on-surface-variant">
            Menampilkan <Text className="font-semibold text-on-surface">{list.length}</Text> lowongan
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
