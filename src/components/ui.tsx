import { Pressable, Text, View, Image, type PressableProps, type ImageSourcePropType } from 'react-native';
import { Icon, type MaterialIconName } from './Icon';
import { C } from '../theme';

/* ---------- Button ---------- */
type Variant = 'primary' | 'secondary' | 'ghost' | 'tonal' | 'danger';

const btnBg: Record<Variant, string> = {
  primary: 'bg-primary',
  secondary: 'bg-surface-container-highest',
  tonal: 'bg-primary-container',
  ghost: 'bg-transparent',
  danger: 'bg-error',
};
const btnText: Record<Variant, string> = {
  primary: 'text-on-primary',
  secondary: 'text-primary',
  tonal: 'text-on-primary',
  ghost: 'text-primary',
  danger: 'text-on-error',
};
const iconColor: Record<Variant, string> = {
  primary: C.onPrimary,
  secondary: C.primary,
  tonal: C.onPrimary,
  ghost: C.primary,
  danger: '#ffffff',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  fullWidth,
  size = 'md',
}: {
  label: string;
  onPress?: PressableProps['onPress'];
  variant?: Variant;
  icon?: MaterialIconName;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const h = size === 'sm' ? 'h-10 px-md' : size === 'lg' ? 'h-14 px-xl' : 'h-12 px-lg';
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      className={`flex-row items-center justify-center gap-2 rounded-lg active:scale-[0.97] active:opacity-95 ${h} ${btnBg[variant]} ${fullWidth ? 'w-full' : ''}`}
      accessibilityRole="button"
    >
      {icon && <Icon name={icon} size={20} color={iconColor[variant]} />}
      <Text className={`text-label-md font-semibold ${btnText[variant]}`}>{label}</Text>
    </Pressable>
  );
}

/* ---------- Badge ---------- */
type Tone = 'neutral' | 'verified' | 'type' | 'info' | 'warning' | 'danger';
const badgeCls: Record<Tone, string> = {
  neutral: 'bg-surface-container-low',
  verified: 'bg-tertiary-fixed',
  type: 'bg-secondary-fixed',
  info: 'bg-primary-fixed',
  warning: 'bg-[#fff3d6]',
  danger: 'bg-error-container',
};
const badgeText: Record<Tone, string> = {
  neutral: 'text-on-surface-variant',
  verified: 'text-on-tertiary-fixed',
  type: 'text-on-secondary-fixed',
  info: 'text-on-primary-fixed',
  warning: 'text-[#7a4f00]',
  danger: 'text-on-error-container',
};

export function Badge({
  label,
  tone = 'neutral',
  icon,
}: {
  label: string;
  tone?: Tone;
  icon?: MaterialIconName;
}) {
  return (
    <View className={`flex-row items-center gap-1 self-start rounded-full px-sm py-1 ${badgeCls[tone]}`}>
      {icon && <Icon name={icon} size={13} color={C.tertiary} />}
      <Text className={`text-caption font-medium ${badgeText[tone]}`}>{label}</Text>
    </View>
  );
}

export function VerifiedBadge({ label = 'Verified' }: { label?: string }) {
  return (
    <View className="flex-row items-center gap-1 self-start rounded-full bg-tertiary-fixed px-sm py-1">
      <Icon name="verified" size={13} color={C.tertiary} />
      <Text className="text-caption font-medium text-on-tertiary-fixed">{label}</Text>
    </View>
  );
}

/* ---------- StarRating ---------- */
export function StarRating({ value, reviews, size = 14 }: { value: number; reviews?: number; size?: number }) {
  return (
    <View className="flex-row items-center gap-1">
      <Icon name="star" size={size} color={C.warning} />
      <Text className="text-label-md font-semibold text-on-surface">
        {value.toLocaleString('id-ID', { minimumFractionDigits: 1 })}
      </Text>
      {reviews !== undefined && (
        <Text className="text-caption text-on-surface-variant">({reviews.toLocaleString('id-ID')})</Text>
      )}
    </View>
  );
}

/* ---------- Card ---------- */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`rounded-xl border border-outline-variant bg-surface-container-lowest p-lg ${className}`}>
      {children}
    </View>
  );
}

/* ---------- Placeholder gambar ---------- */
export function Placeholder({
  icon = 'image',
  color,
  className = '',
  iconColor = 'rgba(255,255,255,0.9)',
  size = 28,
}: {
  icon?: MaterialIconName;
  color?: string;
  className?: string;
  iconColor?: string;
  size?: number;
}) {
  return (
    <View
      className={`items-center justify-center overflow-hidden rounded-lg bg-surface-container-highest ${className}`}
      style={color ? { backgroundColor: color } : undefined}
      accessibilityRole="image"
    >
      <Icon name={icon} size={size} color={color ? iconColor : C.onSurfaceVariant} />
    </View>
  );
}

export function AvatarInitial({
  name,
  className = '',
  textClass = 'text-label-md',
  source,
}: {
  name: string;
  className?: string;
  textClass?: string;
  source?: ImageSourcePropType;
}) {
  // Bila ada foto, tampilkan gambar; jika tidak, fallback ke inisial.
  // Ukuran diatur lewat View pembungkus karena class w/h tidak diterapkan ke Image.
  if (source) {
    return (
      <View className={`overflow-hidden rounded-full bg-surface-container-highest ${className}`}>
        <Image source={source} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      </View>
    );
  }

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
  return (
    <View className={`items-center justify-center rounded-full bg-primary-container ${className}`}>
      <Text className={`font-semibold text-on-primary ${textClass}`}>{initials}</Text>
    </View>
  );
}
