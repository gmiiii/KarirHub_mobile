import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Placeholder, Button } from '../src/components/ui';
import { formatRupiah } from '../src/data';
import { C } from '../src/theme';

const item = { title: 'Review CV profesional + optimasi ATS', seller: 'Dewi Lestari', pkg: 'Standar', price: 150000, color: '#2563eb' };
const fee = 2500;
const tax = Math.round(item.price * 0.11);
const total = item.price + fee + tax;

export default function Checkout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Checkout" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Item */}
        <View className="flex-row gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-md">
          <Placeholder icon="brush" color={item.color} className="h-14 w-14" size={24} />
          <View className="flex-1">
            <Text className="text-label-md font-bold text-on-surface" numberOfLines={2}>{item.title}</Text>
            <Text className="text-caption text-on-surface-variant">{item.seller} · Paket {item.pkg}</Text>
            <Text className="mt-1 text-label-md font-bold text-on-surface">{formatRupiah(item.price)}</Text>
          </View>
        </View>

        {/* Kontak */}
        <View className="gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Detail kontak</Text>
          <Field label="Nama lengkap" placeholder="Nama kamu" />
          <Field label="Email" placeholder="nama@email.com" keyboard="email-address" />
          <Field label="Nomor WhatsApp" placeholder="08xxxxxxxxxx" keyboard="phone-pad" />
        </View>

        {/* Ringkasan */}
        <View className="gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <Text className="text-title-lg font-semibold text-on-surface">Ringkasan</Text>
          <Row label="Harga jasa" value={formatRupiah(item.price)} />
          <Row label="Biaya layanan" value={formatRupiah(fee)} />
          <Row label="PPN 11%" value={formatRupiah(tax)} />
          <View className="mt-1 flex-row items-center justify-between border-t border-outline-variant pt-2">
            <Text className="text-label-md font-semibold text-on-surface">Total</Text>
            <Text className="text-title-lg font-bold text-primary">{formatRupiah(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label={`Pilih pembayaran · ${formatRupiah(total)}`} icon="arrow-forward" fullWidth onPress={() => router.push('/pembayaran/metode')} />
      </View>
    </View>
  );
}

function Field({ label, placeholder, keyboard = 'default' }: { label: string; placeholder: string; keyboard?: 'default' | 'email-address' | 'phone-pad' }) {
  return (
    <View>
      <Text className="mb-1 text-label-md font-medium text-on-surface">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={C.onSurfaceVariant}
        keyboardType={keyboard}
        className="rounded-lg border border-outline-variant bg-surface px-md py-3 text-body-md text-on-surface"
      />
    </View>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-body-md text-on-surface-variant">{label}</Text>
      <Text className="text-body-md text-on-surface">{value}</Text>
    </View>
  );
}
