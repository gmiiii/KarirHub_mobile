import React from 'react';
import { View, type ViewProps } from 'react-native';
import Animated, { FadeInUp, useReducedMotion } from 'react-native-reanimated';
import { MOTION } from '../../theme';

type RevealItemProps = ViewProps & {
  /** Indeks item untuk cascade stagger (jeda 45ms per item, maks 8). */
  index?: number;
};

/**
 * Reveal untuk item di dalam list ter-virtualisasi (FlatList). FlatList me-mount
 * item saat tergulir masuk, sehingga animasi `entering` berperan sebagai scroll
 * reveal alami. Reduced-motion → tampil statis.
 */
export function RevealItem({ children, index = 0, style, ...props }: RevealItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <View style={style} {...props}>
        {children}
      </View>
    );
  }

  return (
    <Animated.View
      entering={FadeInUp.duration(MOTION.duration + 160).delay(Math.min(index, 8) * 45)}
      style={style}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
