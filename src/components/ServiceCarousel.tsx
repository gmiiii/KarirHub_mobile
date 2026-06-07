import { useEffect, useRef } from 'react';
import {
  FlatList,
  AccessibilityInfo,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { ServiceCard } from './cards';
import type { Service } from '../data';

const GAP = 12;
const PAGE_PAD = 16; // padding horizontal layar (di RevealScrollView)
const AUTOPLAY_MS = 2800;

// Carousel "Jasa populer": snap per kartu + peek + loop mulus dua arah
// (data digandakan 3x, recenter tak terlihat saat masuk salinan tepi).
export function ServiceCarousel({ services }: { services: Service[] }) {
  const { width: screenW } = useWindowDimensions();
  const cardWidth = Math.round(screenW * 0.62);
  const itemWidth = cardWidth + GAP;
  const side = Math.round((screenW - cardWidth) / 2); // agar kartu aktif ter-center

  const N = services.length;
  const data = [...services, ...services, ...services]; // 3 salinan untuk loop dua arah
  const listRef = useRef<FlatList<Service>>(null);
  const index = useRef(N); // mulai di salinan tengah
  const interacting = useRef(false);
  const didInit = useRef(false);

  const offsetOf = (i: number) => i * itemWidth; // scrollOffset yang men-center kartu i

  // Autoplay maju satu kartu; berhenti saat disentuh, nonaktif bila reduce-motion.
  useEffect(() => {
    if (N < 2) return;
    let id: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (cancelled || reduce) return;
      id = setInterval(() => {
        if (interacting.current) return;
        index.current += 1;
        listRef.current?.scrollToOffset({ offset: index.current * itemWidth, animated: true });
        // Bila melewati salinan tengah, balik ke kartu identik tanpa animasi.
        if (index.current >= 2 * N) {
          setTimeout(() => {
            index.current -= N;
            listRef.current?.scrollToOffset({ offset: index.current * itemWidth, animated: false });
          }, 420);
        }
      }, AUTOPLAY_MS);
    });
    return () => {
      cancelled = true;
      if (id) clearInterval(id);
    };
  }, [N, itemWidth]);

  // Loop mulus untuk geser manual: jaga posisi tetap di salinan tengah.
  const recenter = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const raw = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    let i = raw;
    if (i < N) i += N;
    else if (i >= 2 * N) i -= N;
    if (i !== raw) {
      listRef.current?.scrollToOffset({ offset: offsetOf(i), animated: false });
    }
    index.current = i;
  };

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(item, i) => `${item.id}-${i}`}
      horizontal
      style={{ marginHorizontal: -PAGE_PAD }} // full-bleed agar peek menyentuh tepi
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: side, gap: GAP }}
      snapToInterval={itemWidth}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      windowSize={3}
      removeClippedSubviews
      onLayout={() => {
        if (didInit.current) return;
        didInit.current = true;
        listRef.current?.scrollToOffset({ offset: offsetOf(N), animated: false });
      }}
      renderItem={({ item }) => <ServiceCard service={item} width={cardWidth} />}
      onScrollBeginDrag={() => {
        interacting.current = true;
      }}
      onMomentumScrollEnd={(e) => {
        interacting.current = false;
        recenter(e);
      }}
    />
  );
}
