import { type ReactNode } from 'react';
import { View, StyleSheet, type LayoutChangeEvent } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from './AppHeader';

/**
 * Header menempel berisi app bar + slot filter dengan backdrop frosted seragam
 * (BlurView lembut) plus drop shadow di bawah bar. Konten list menggulir di
 * belakangnya (frosted). Laporkan tinggi via `onHeight` agar list diberi
 * paddingTop yang pas.
 */
export function StickyHeaderBlur({
  title,
  onHeight,
  children,
}: {
  title: string;
  onHeight: (height: number) => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      onLayout={(e: LayoutChangeEvent) => onHeight(e.nativeEvent.layout.height)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        shadowColor: '#0b1220',
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,
      }}
    >
      <BlurView
        intensity={48}
        tint="light"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View style={{ paddingTop: insets.top }}>
        <AppHeader title={title} transparent />
        <View className="gap-3 px-md pb-3 pt-1">{children}</View>
      </View>
    </View>
  );
}
