import { useRef, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Button } from '../src/components/ui';
import { CvDocument } from '../src/components/cv/CvDocument';
import { C } from '../src/theme';
import { cvData } from '../src/data';

type Status = 'idle' | 'preparing' | 'ready';

export default function CvSayaScreen() {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<Status>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Demo: tombol cetak hanya memunculkan notifikasi 2 tahap.
  const handlePrint = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStatus('preparing');
    timers.current.push(
      setTimeout(() => setStatus('ready'), 1300),
      setTimeout(() => setStatus('idle'), 4300),
    );
  };

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="CV Saya" back />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 16 }} showsVerticalScrollIndicator={false}>
        <Text className="text-body-md text-on-surface-variant">
          Dokumen CV yang disusun otomatis dari profilmu. Cetak atau unduh sebagai Word untuk dilampirkan saat melamar.
        </Text>
        <Button
          label={status === 'preparing' ? 'Menyiapkan...' : 'Cetak ke Word'}
          icon="description"
          fullWidth
          onPress={handlePrint}
        />
        <CvDocument cv={cvData} />
      </ScrollView>

      {status !== 'idle' && (
        <View
          pointerEvents="none"
          style={{ position: 'absolute', left: 16, right: 16, bottom: insets.bottom + 24 }}
        >
          <View className="flex-row items-center gap-2 self-center rounded-xl bg-inverse-surface px-lg py-3">
            <Icon
              name={status === 'preparing' ? 'hourglass-empty' : 'check-circle'}
              size={20}
              color={status === 'preparing' ? C.onSurfaceVariant : C.tertiary}
            />
            <Text className="text-label-md text-inverse-on-surface">
              {status === 'preparing'
                ? 'Menyiapkan CV untuk diunduh ke Word...'
                : 'CV siap diunduh sebagai dokumen Word (demo).'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
