import React from 'react';
import { View, type LayoutChangeEvent, type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';
import { useRevealScroll } from './RevealScrollView';
import { MOTION } from '../../theme';

type RevealProps = ViewProps & {
  /** Jarak translateY awal dalam px (default 24). */
  y?: number;
  /** Bagian viewport tempat item mulai reveal, 0..1 (default 0.9 = sedikit sebelum tepi bawah). */
  threshold?: number;
};

/**
 * Bungkus satu section agar fade + rise saat tergulir masuk viewport.
 * Harus berada di dalam <RevealScrollView>. Di luar konteks itu — atau saat
 * reduced-motion aktif — item tampil penuh tanpa animasi (tanpa gating).
 */
export function Reveal({ children, y = 24, threshold = 0.9, style, onLayout, ...props }: RevealProps) {
  const ctx = useRevealScroll();
  const reduce = useReducedMotion();

  const top = useSharedValue(0);
  const height = useSharedValue(0);
  const measured = useSharedValue(0);

  // Berulang: item dianggap "terlihat" saat bagian atasnya sudah melewati garis
  // pemicu DAN bagian bawahnya belum tergulir ke atas viewport. Animasi main
  // setiap kali masuk dan mundur setiap kali keluar layar (dua arah).
  const progress = useDerivedValue(() => {
    if (!ctx || measured.value === 0) return 0;
    const enter = ctx.scrollY.value + ctx.viewportH * threshold;
    const visible = top.value < enter && top.value + height.value > ctx.scrollY.value;
    return withTiming(visible ? 1 : 0, { duration: MOTION.duration, easing: MOTION.easing });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * y }],
  }));

  // Tanpa konteks scroll atau reduced-motion: render statis penuh.
  if (!ctx || reduce) {
    return (
      <View style={style} onLayout={onLayout} {...props}>
        {children}
      </View>
    );
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    top.value = e.nativeEvent.layout.y;
    height.value = e.nativeEvent.layout.height;
    measured.value = 1;
    onLayout?.(e);
  };

  return (
    <Animated.View style={[style, animatedStyle]} onLayout={handleLayout} {...props}>
      {children}
    </Animated.View>
  );
}
