import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon } from '../../src/components/Icon';
import { Badge, Button } from '../../src/components/ui';
import { formatRupiah } from '../../src/data';
import { C } from '../../src/theme';

const total = 169000;
const vaNumber = '8810 8829 1039 4021';

const steps = [
  'Buka aplikasi m-banking dan pilih menu Virtual Account.',
  'Masukkan nomor Virtual Account di atas.',
  'Periksa nominal dan nama penerima, lalu konfirmasi.',
  'Pembayaran terverifikasi otomatis dalam beberapa menit.',
];

export default function VirtualAccount() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [secs, setSecs] = useState(24 * 60 * 60);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = Math.floor(secs / 3600);
  const mm = Math.floor((secs % 3600) / 60);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Virtual Account" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="items-center gap-1 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Badge label="Menunggu Pembayaran" tone="warning" icon="schedule" />
          <Text className="mt-2 text-caption text-on-surface-variant">Bayar dalam</Text>
          <Text className="text-headline-md font-bold text-primary">{hh} jam {mm} menit</Text>
        </View>

        {/* VA number */}
        <View className="gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <View className="flex-row items-center gap-2">
            <View className="h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed">
              <Icon name="account-balance" size={20} color={C.primary} />
            </View>
            <Text className="text-label-md font-semibold text-on-surface">BCA Virtual Account</Text>
          </View>
          <Text className="text-caption text-on-surface-variant">Nomor Virtual Account</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-headline-md font-bold tracking-wider text-on-surface">{vaNumber}</Text>
            <Pressable onPress={() => setCopied(true)} className="flex-row items-center gap-1 rounded-lg bg-surface-container-high px-md py-2 active:opacity-80">
              <Icon name={copied ? 'check' : 'content-copy'} size={16} color={C.primary} />
              <Text className="text-label-md font-semibold text-primary">{copied ? 'Tersalin' : 'Salin'}</Text>
            </Pressable>
          </View>
          <View className="mt-1 flex-row items-center justify-between border-t border-outline-variant pt-md">
            <Text className="text-caption text-on-surface-variant">Total pembayaran</Text>
            <Text className="text-title-lg font-bold text-on-surface">{formatRupiah(total)}</Text>
          </View>
        </View>

        {/* Cara bayar */}
        <View className="gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Cara pembayaran</Text>
          {steps.map((s, i) => (
            <View key={i} className="flex-row gap-md">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                <Text className="text-caption font-bold text-on-primary">{i + 1}</Text>
              </View>
              <Text className="flex-1 text-body-md text-on-surface-variant">{s}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="gap-2 border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label="Cek status pembayaran" icon="refresh" fullWidth onPress={() => router.replace('/pembayaran/berhasil')} />
      </View>
    </View>
  );
}
