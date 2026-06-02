import { Modal, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from './Icon';
import { AvatarInitial } from './ui';
import { useMode, roleMeta, ROLE_ORDER, type Role } from '../mode';
import { C } from '../theme';

/**
 * Bottom sheet menu akun — padanan mobile dari menu avatar web. Identitas +
 * ganti mode (Model A) dengan mode aktif tersorot. Dibuka dari avatar AppHeader,
 * jadi tersedia sama di setiap layar ketiga role.
 */
export function ModeMenu({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { role, setRole } = useMode();
  const router = useRouter();

  const choose = (r: Role) => {
    onClose();
    if (r !== role) {
      setRole(r);
      // replace (bukan push) — tiap role adalah "dunia" terpisah; tak ada back
      // ke pengalaman role sebelumnya.
      router.replace(roleMeta[r].home as never);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable className="flex-1 justify-end bg-black/40" onPress={onClose}>
        <Pressable onPress={() => {}} className="rounded-t-2xl bg-surface-container-lowest px-md pb-8 pt-3">
          <View className="mb-2 h-1 w-10 self-center rounded-full bg-outline-variant" />

          {/* Identitas akun */}
          <View className="flex-row items-center gap-3 px-1 py-2">
            <AvatarInitial name="Rina Hapsari" className="h-11 w-11" />
            <View className="flex-1">
              <Text className="text-label-md font-bold text-on-surface">Rina Hapsari</Text>
              <Text className="text-caption text-on-surface-variant">Mode: {roleMeta[role].label}</Text>
            </View>
          </View>

          <View className="my-2 h-px bg-outline-variant" />
          <Text className="px-1 pb-1 text-caption font-semibold uppercase tracking-wider text-on-surface-variant">
            Ganti mode akun
          </Text>

          {ROLE_ORDER.map((r) => {
            const m = roleMeta[r];
            const current = r === role;
            return (
              <Pressable
                key={r}
                onPress={() => choose(r)}
                accessibilityRole="button"
                accessibilityState={{ selected: current }}
                className={`flex-row items-center gap-3 rounded-xl px-2 py-3 ${
                  current ? 'bg-primary-fixed' : 'active:bg-surface-container-low'
                }`}
              >
                <View
                  className={`h-10 w-10 items-center justify-center rounded-full ${
                    current ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <Icon name={m.icon} size={20} color={current ? C.onPrimary : C.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-label-md font-semibold text-on-surface">{m.label}</Text>
                  <Text className="text-caption text-on-surface-variant">{m.desc}</Text>
                </View>
                {current && <Icon name="check-circle" size={20} color={C.primary} />}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
