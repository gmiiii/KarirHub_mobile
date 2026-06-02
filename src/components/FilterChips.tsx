import { ScrollView, Pressable, Text } from 'react-native';
import { Icon } from './Icon';
import { C } from '../theme';

/**
 * Baris chip filter melayang penuh-lebar. Chip terpilih ditandai jelas: isi
 * primary + ikon centang + glow tipis. Tanpa efek tepi (scroll biasa).
 *
 * Bleed -16px melewati padding induk; sisipkan di dalam wadah ber-`px-md`.
 */
export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -16 }}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className={`h-9 flex-row items-center gap-1 rounded-full px-md active:scale-[0.96] ${
              active
                ? 'bg-primary'
                : 'border border-outline-variant bg-surface-container-lowest'
            }`}
            style={
              active
                ? {
                    shadowColor: C.primary,
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 3 },
                    elevation: 3,
                  }
                : undefined
            }
          >
            {active && <Icon name="check" size={15} color={C.onPrimary} />}
            <Text
              className={`text-label-md ${
                active ? 'font-semibold text-on-primary' : 'font-medium text-on-surface-variant'
              }`}
            >
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
