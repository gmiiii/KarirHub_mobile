import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, Placeholder, Button } from '../src/components/ui';
import { formatRupiah } from '../src/data';
import { C } from '../src/theme';

const styles = [
  { name: 'Formal Kantor', color: '#1e293b' },
  { name: 'Bisnis Kasual', color: '#0f766e' },
  { name: 'Latar Biru', color: '#1d4ed8' },
  { name: 'Latar Abu', color: '#475569' },
];

export default function AiFotoCv() {
  const insets = useSafeAreaInsets();
  const [sel, setSel] = useState(0);
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="AI Foto CV" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          <Badge label="Didukung AI" tone="info" icon="auto-awesome" />
          <Text className="text-headline-md font-bold text-on-surface">Foto CV formal siap pakai</Text>
          <Text className="text-body-md text-on-surface-variant">
            Ubah swafoto biasa menjadi pasfoto profesional dengan latar dan pencahayaan studio.
          </Text>
        </View>

        {/* Upload */}
        <View className="items-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest px-lg py-xl">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-fixed">
            <Icon name="add-a-photo" size={28} color={C.primary} />
          </View>
          <Text className="text-label-md font-semibold text-on-surface">Unggah swafoto</Text>
          <Text className="text-center text-caption text-on-surface-variant">JPG/PNG, maks 10MB. Wajah menghadap depan.</Text>
          <Button label="Pilih foto" variant="secondary" icon="folder-open" />
        </View>

        {/* Gaya */}
        <Text className="text-title-lg font-semibold text-on-surface">Pilih gaya</Text>
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {styles.map((s, i) => (
            <Pressable key={s.name} onPress={() => setSel(i)} style={{ width: '47.5%' }} className="flex-grow">
              <View className={`overflow-hidden rounded-lg ${sel === i ? 'border-2 border-primary' : ''}`}>
                <Placeholder icon="person" color={s.color} className="h-32 w-full rounded-none" size={36} />
              </View>
              <Text className="mt-1 text-center text-caption font-medium text-on-surface">{s.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Paket */}
        <View className="gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Paket Standar</Text>
          <Text className="text-headline-md font-bold text-primary">{formatRupiah(99000)}</Text>
          {['30 hasil foto', '3 pilihan latar', 'Resolusi tinggi', 'Selesai 1 hari'].map((f) => (
            <View key={f} className="flex-row items-center gap-2">
              <Icon name="check-circle" size={18} color={C.tertiary} />
              <Text className="text-body-md text-on-surface-variant">{f}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label="Proses sekarang" icon="auto-awesome" fullWidth />
      </View>
    </View>
  );
}
