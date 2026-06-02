import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';
import { MOTION } from '../theme';

/**
 * Pressable dengan feedback scale halus (spec motion bersama).
 * className visual tetap di Pressable (NativeWind-aware); konten dibungkus
 * Animated.View untuk efek scale. Reduced-motion → tanpa animasi.
 */
export function PressableScale({
  children,
  scaleTo = MOTION.pressScale,
  contentClassName,
  onPressIn,
  onPressOut,
  ...rest
}: Omit<PressableProps, 'children'> & {
  children?: React.ReactNode;
  scaleTo?: number;
  contentClassName?: string;
}) {
  const scale = useSharedValue(1);
  const reduce = useReducedMotion();
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPressIn={(e) => {
        scale.value = reduce ? 1 : withTiming(scaleTo, { duration: MOTION.press, easing: MOTION.easing });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = reduce ? 1 : withTiming(1, { duration: MOTION.press, easing: MOTION.easing });
        onPressOut?.(e);
      }}
      {...rest}
    >
      <Animated.View style={style} className={contentClassName}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
