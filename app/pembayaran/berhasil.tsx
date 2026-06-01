import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../src/components/Icon';
import { Button } from '../../src/components/ui';
import { formatRupiah } from '../../src/data';

const total = 169000;
const trxId = 'KH-882910394';

export default function Berhasil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }}>
      <View className="flex-1 items-center justify-center px-lg">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-tertiary-fixed">
          <Icon name="check-circle" size={64} color="#006329" />
        </View>
        <Text className="mt-lg text-headline-md font-bold text-on-surface">Pembayaran berhasil</Text>
        <Text className="mt-1 text-center text-body-md text-on-surface-variant">
          Terima kasih. Pesananmu sedang diproses oleh seller.
        </Text>

        <View className="mt-xl w-full gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Row label="Nomor transaksi" value={trxId} />
          <Row label="Jumlah dibayar" value={formatRupiah(total)} />
          <Row label="Metode" value="QRIS" />
          <Row label="Waktu" value="31 Mei 2026, 14:32" />
        </View>
      </View>

      <View className="gap-2 px-md">
        <Button label="Lihat pesanan saya" icon="receipt-long" fullWidth onPress={() => router.replace('/(tabs)/pesanan')} />
        <Button label="Kembali ke beranda" variant="ghost" onPress={() => router.replace('/(tabs)')} />
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-body-md text-on-surface-variant">{label}</Text>
      <Text className="text-label-md font-semibold text-on-surface">{value}</Text>
    </View>
  );
}
