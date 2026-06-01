import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon } from '../../src/components/Icon';
import { Badge, Button } from '../../src/components/ui';
import { formatRupiah } from '../../src/data';
import { C } from '../../src/theme';

const total = 169000;
const trxId = 'KH-882910394';

export default function Qris() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [secs, setSecs] = useState(15 * 60);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Pembayaran QRIS" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Status + timer */}
        <View className="items-center gap-1 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Badge label="Menunggu Pembayaran" tone="warning" icon="schedule" />
          <Text className="mt-2 text-caption text-on-surface-variant">Batas waktu pembayaran</Text>
          <Text className="text-display-lg font-bold text-primary">{mm}:{ss}</Text>
        </View>

        {/* QR */}
        <View className="items-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <View className="h-56 w-56 items-center justify-center rounded-lg bg-surface-container-high">
            <Icon name="qr-code-2" size={180} color={C.onSurface} />
          </View>
          <Text className="text-caption text-on-surface-variant">Pindai dengan aplikasi e-wallet apa pun</Text>
          <View className="w-full border-t border-outline-variant pt-md">
            <Text className="text-caption text-on-surface-variant">Total pembayaran</Text>
            <Text className="text-headline-md font-bold text-on-surface">{formatRupiah(total)}</Text>
          </View>
        </View>

        {/* Detail */}
        <View className="gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <DetailRow label="Nomor transaksi" value={trxId} />
          <DetailRow label="Metode" value="QRIS Dynamic" />
          <DetailRow label="Status" value="Menunggu" />
        </View>

        <View className="flex-row items-start gap-2 rounded-lg bg-surface-container-low p-md">
          <Icon name="info" size={18} color={C.primary} />
          <Text className="flex-1 text-caption text-on-surface-variant">
            Pembayaran terverifikasi otomatis. Jangan tutup halaman ini sampai proses selesai.
          </Text>
        </View>
      </ScrollView>

      <View className="gap-2 border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label="Saya sudah bayar" icon="check-circle" fullWidth onPress={() => router.replace('/pembayaran/berhasil')} />
        <Button label="Simulasikan gagal" variant="ghost" onPress={() => router.replace('/pembayaran/gagal')} />
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-body-md text-on-surface-variant">{label}</Text>
      <Text className="text-label-md font-semibold text-on-surface">{value}</Text>
    </View>
  );
}
