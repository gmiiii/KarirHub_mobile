import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { Icon, type MaterialIconName } from '../../src/components/Icon';
import { Button } from '../../src/components/ui';
import { formatRupiah } from '../../src/data';
import { C } from '../../src/theme';

const total = 169000;

type Method = { id: string; label: string; icon: MaterialIconName; route: '/pembayaran/qris' | '/pembayaran/va' };

const groups: { title: string; items: Method[] }[] = [
  {
    title: 'Instan',
    items: [
      { id: 'qris', label: 'QRIS (semua e-wallet)', icon: 'qr-code-2', route: '/pembayaran/qris' },
      { id: 'gopay', label: 'GoPay', icon: 'account-balance-wallet', route: '/pembayaran/qris' },
      { id: 'ovo', label: 'OVO', icon: 'account-balance-wallet', route: '/pembayaran/qris' },
    ],
  },
  {
    title: 'Virtual Account',
    items: [
      { id: 'bca', label: 'BCA Virtual Account', icon: 'account-balance', route: '/pembayaran/va' },
      { id: 'bni', label: 'BNI Virtual Account', icon: 'account-balance', route: '/pembayaran/va' },
      { id: 'mandiri', label: 'Mandiri Virtual Account', icon: 'account-balance', route: '/pembayaran/va' },
    ],
  },
];

export default function PilihMetode() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [sel, setSel] = useState<Method>(groups[0].items[0]);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Metode Pembayaran" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {groups.map((g) => (
          <View key={g.title} className="gap-2">
            <Text className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant">{g.title}</Text>
            <View className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
              {g.items.map((m, i) => {
                const active = sel.id === m.id;
                return (
                  <Pressable
                    key={m.id}
                    onPress={() => setSel(m)}
                    className={`flex-row items-center gap-md px-lg py-4 ${i > 0 ? 'border-t border-outline-variant' : ''} ${active ? 'bg-primary-fixed/40' : ''}`}
                  >
                    <Icon name={m.icon} size={24} color={C.primary} />
                    <Text className="flex-1 text-body-md text-on-surface">{m.label}</Text>
                    <Icon name={active ? 'radio-button-checked' : 'radio-button-unchecked'} size={22} color={active ? C.primary : C.outline} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-body-md text-on-surface-variant">Total</Text>
          <Text className="text-title-lg font-bold text-on-surface">{formatRupiah(total)}</Text>
        </View>
        <Button label="Bayar sekarang" icon="lock" fullWidth onPress={() => router.push(sel.route)} />
      </View>
    </View>
  );
}
