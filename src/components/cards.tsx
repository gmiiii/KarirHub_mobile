import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import type { Job, Service } from '../data';
import { formatRupiah } from '../data';
import { Icon } from './Icon';
import { Badge, VerifiedBadge, StarRating, Placeholder, AvatarInitial } from './ui';
import { C } from '../theme';

export function JobCard({ job }: { job: Job }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/lowongan/${job.id}`)}
      className="rounded-xl border border-outline-variant bg-surface-container-lowest p-md active:scale-[0.98] active:opacity-95"
    >
      <View className="flex-row gap-md">
        <Placeholder icon="apartment" color={job.logoColor} className="h-14 w-14" size={26} />
        <View className="flex-1">
          <Text className="text-title-lg font-semibold text-on-surface" numberOfLines={1}>
            {job.title}
          </Text>
          <Text className="text-body-md text-on-surface-variant" numberOfLines={1}>
            {job.company}
          </Text>
          <View className="mt-1 flex-row flex-wrap gap-1">
            <Badge label={job.location} icon="location-on" />
            <Badge label={job.type} tone="type" />
            {job.verified && <VerifiedBadge />}
          </View>
        </View>
      </View>
      <View className="mt-md flex-row items-center justify-between border-t border-outline-variant pt-md">
        <Text className="text-label-md font-semibold text-on-surface">{job.salary}</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-caption text-on-surface-variant">{job.postedAgo}</Text>
          <Icon name="chevron-right" size={16} color={C.primary} />
        </View>
      </View>
    </Pressable>
  );
}

export function ServiceCard({ service, width }: { service: Service; width?: number }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/layanan/${service.id}`)}
      style={width ? { width } : undefined}
      className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest active:scale-[0.98] active:opacity-95"
    >
      <View className="relative">
        <Placeholder icon="brush" color={service.thumbColor} className="h-28 w-full rounded-none" size={30} />
        {service.verified && (
          <View className="absolute right-2 top-2">
            <VerifiedBadge label="Terverifikasi" />
          </View>
        )}
      </View>
      <View className="gap-1 p-md">
        <View className="flex-row items-center gap-1">
          <AvatarInitial name={service.seller} className="h-6 w-6" textClass="text-[10px]" />
          <Text className="text-caption text-on-surface-variant">{service.seller}</Text>
        </View>
        <Text className="text-label-md font-bold text-on-surface" numberOfLines={2}>
          {service.title}
        </Text>
        <StarRating value={service.rating} reviews={service.reviews} />
        <View className="mt-1 flex-row items-center justify-between border-t border-outline-variant pt-2">
          <View className="flex-row items-center gap-1">
            <Icon name="schedule" size={13} color={C.onSurfaceVariant} />
            <Text className="text-caption text-on-surface-variant">{service.deliveryDays} hari</Text>
          </View>
          <Text className="text-label-md font-bold text-on-surface">{formatRupiah(service.priceFrom)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
