import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../src/components/Icon';
import { Button } from '../../src/components/ui';

const reasons = [
  'Saldo e-wallet tidak mencukupi.',
  'Batas waktu pembayaran telah habis.',
  'Transaksi dibatalkan oleh pengguna.',
];

export default function Gagal() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }}>
      <View className="flex-1 items-center justify-center px-lg">
        <View className="h-24 w-24 items-center justify-center rounded-full bg-error-container">
          <Icon name="cancel" size={64} color="#ba1a1a" />
        </View>
        <Text className="mt-lg text-headline-md font-bold text-on-surface">Pembayaran gagal</Text>
        <Text className="mt-1 text-center text-body-md text-on-surface-variant">
          Pembayaran tidak dapat diproses. Kamu bisa mencoba lagi dengan metode lain.
        </Text>

        <View className="mt-xl w-full gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-label-md font-semibold text-on-surface">Kemungkinan penyebab</Text>
          {reasons.map((r) => (
            <View key={r} className="flex-row gap-2">
              <Icon name="info" size={18} color="#ba1a1a" />
              <Text className="flex-1 text-body-md text-on-surface-variant">{r}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-2 px-md">
        <Button label="Coba lagi" icon="refresh" fullWidth onPress={() => router.replace('/pembayaran/metode')} />
        <Button label="Kembali ke beranda" variant="ghost" onPress={() => router.replace('/(tabs)')} />
      </View>
    </View>
  );
}
