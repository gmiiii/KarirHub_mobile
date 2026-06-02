import { useEffect, useState } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { C, MOTION } from '../theme';

const H_MARGIN = 16; // jarak bar dari tepi kiri/kanan layar
const BAR_HEIGHT = 64;
const PILL_H_INSET = 8; // gap horizontal pill di dalam slot
const PILL_V_INSET = 8; // gap vertikal pill terhadap bar

/** Ruang yang harus disisakan konten tiap tab agar tak tertutup bar melayang. */
export const TAB_BAR_SPACE = BAR_HEIGHT + 12 + 24; // tinggi + offset bawah + napas

type IconFn = (props: { focused: boolean; color: string; size: number }) => React.ReactNode;

function TabItem({
  focused,
  label,
  width,
  icon,
  reduceMotion,
  onPress,
}: {
  focused: boolean;
  label: string;
  width: number;
  icon?: IconFn;
  reduceMotion: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const color = focused ? C.primary : C.onSurfaceVariant;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = reduceMotion ? 1 : withTiming(MOTION.pressScale, { duration: MOTION.press, easing: MOTION.easing });
      }}
      onPressOut={() => {
        scale.value = reduceMotion ? 1 : withTiming(1, { duration: MOTION.press, easing: MOTION.easing });
      }}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      style={{ width, height: '100%' }}
      className="items-center justify-center"
    >
      <Animated.View style={style} className="items-center justify-center gap-0.5">
        {icon?.({ focused, color, size: 24 })}
        <Text style={{ color }} className="text-[11px] font-semibold leading-none">
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

/** Floating bottom nav dengan highlight pill yang meluncur antar tab. */
export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [barWidth, setBarWidth] = useState(Dimensions.get('window').width - H_MARGIN * 2);

  const count = state.routes.length;
  const itemWidth = barWidth / count;
  const tx = useSharedValue(state.index * itemWidth + PILL_H_INSET);

  useEffect(() => {
    const target = state.index * itemWidth + PILL_H_INSET;
    tx.value = reduceMotion ? target : withTiming(target, { duration: MOTION.duration, easing: MOTION.easing });
  }, [state.index, itemWidth, reduceMotion]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
    width: Math.max(itemWidth - PILL_H_INSET * 2, 0),
  }));

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: H_MARGIN, right: H_MARGIN, bottom: insets.bottom + 12 }}
    >
      <View
        onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        className="flex-row overflow-hidden rounded-full border border-outline-variant bg-surface-container-lowest shadow-level-3"
        style={{ height: BAR_HEIGHT }}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            { position: 'absolute', top: PILL_V_INSET, bottom: PILL_V_INSET, left: 0, borderRadius: 9999, backgroundColor: C.primaryFixed },
            pillStyle,
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const label = (options.title ?? route.name) as string;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          return (
            <TabItem
              key={route.key}
              focused={focused}
              label={label}
              width={itemWidth}
              icon={options.tabBarIcon as IconFn | undefined}
              reduceMotion={reduceMotion}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}
