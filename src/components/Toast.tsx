import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type MaterialIconName } from './Icon';
import { C } from '../theme';

type Tone = 'success' | 'info' | 'error';

const toneIcon: Record<Tone, MaterialIconName> = {
  success: 'check-circle',
  info: 'info',
  error: 'error',
};

const toneColor: Record<Tone, string> = {
  success: C.tertiary,
  info: C.primary,
  error: C.error,
};

type ShowToast = (message: string, tone?: Tone) => void;

const ToastContext = createContext<ShowToast>(() => {});

/**
 * Provider notifikasi global. Karena belum ada backend, toast dipakai untuk memberi
 * umpan balik atas aksi dummy (mis. "Profil diperbarui", "Pesan terkirim").
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<{ message: string; tone: Tone } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback<ShowToast>((message, tone = 'success') => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, tone });
    timer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && (
        <View pointerEvents="none" style={{ position: 'absolute', left: 16, right: 16, bottom: insets.bottom + 24 }}>
          <View className="flex-row items-center gap-2 self-center rounded-xl bg-inverse-surface px-lg py-3">
            <Icon name={toneIcon[toast.tone]} size={20} color={toneColor[toast.tone]} />
            <Text className="text-label-md text-inverse-on-surface">{toast.message}</Text>
          </View>
        </View>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
