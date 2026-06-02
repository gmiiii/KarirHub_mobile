import React, { createContext, useContext } from 'react';
import { Dimensions, type ScrollViewProps } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';

type RevealCtx = {
  /** Offset scroll konten saat ini (px). */
  scrollY: SharedValue<number>;
  /** Tinggi viewport (px) untuk menghitung ambang reveal. */
  viewportH: number;
};

const Ctx = createContext<RevealCtx | null>(null);

/** Dipakai oleh <Reveal> untuk mengikuti posisi scroll induknya. */
export const useRevealScroll = () => useContext(Ctx);

/**
 * Pengganti ScrollView yang melacak offset scroll dan membaginya ke setiap
 * <Reveal> di dalamnya. <Reveal> harus menjadi anak langsung dari
 * contentContainer agar posisi (layout.y) selaras dengan offset konten.
 */
export function RevealScrollView({
  children,
  onScroll,
  ...props
}: ScrollViewProps) {
  const scrollY = useSharedValue(0);
  const viewportH = Dimensions.get('window').height;

  const handler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <Ctx.Provider value={{ scrollY, viewportH }}>
      <Animated.ScrollView {...props} onScroll={handler} scrollEventThrottle={16}>
        {children}
      </Animated.ScrollView>
    </Ctx.Provider>
  );
}
