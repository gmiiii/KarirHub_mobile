import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from './AppHeader';

export type DocSection = { title: string; body: string };

/** Kerangka layar dokumen statis (Bantuan, Ketentuan, Kebijakan Privasi). */
export function DocScreen({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro?: string;
  updated?: string;
  sections: DocSection[];
}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title={title} back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {intro && <Text className="text-body-md text-on-surface-variant">{intro}</Text>}
        {updated && <Text className="text-caption text-on-surface-variant">Terakhir diperbarui: {updated}</Text>}
        {sections.map((s) => (
          <View key={s.title} className="gap-1">
            <Text className="text-title-lg font-semibold text-on-surface">{s.title}</Text>
            <Text className="text-body-md leading-6 text-on-surface-variant">{s.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
