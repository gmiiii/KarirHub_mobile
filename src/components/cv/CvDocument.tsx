import { View, Text } from 'react-native';
import { Icon, type MaterialIconName } from '../Icon';
import { C } from '../../theme';
import type { CvData } from '../../data';

// Dokumen CV (mobile): panel biru identitas di atas, konten utama di bawah.
export function CvDocument({ cv }: { cv: CvData }) {
  return (
    <View className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
      {/* Panel biru (isi sidebar template B) */}
      <View className="gap-md bg-primary px-lg py-lg">
        <View>
          <Text className="text-headline-md font-bold text-on-primary">{cv.name}</Text>
          <Text className="text-body-md text-on-primary opacity-80">{cv.headline}</Text>
        </View>

        <View className="gap-1.5">
          <ContactRow icon="location-on" text={cv.location} />
          <ContactRow icon="email" text={cv.contact.email} />
          <ContactRow icon="phone" text={cv.contact.phone} />
          <ContactRow icon="link" text={cv.contact.linkedin} />
        </View>

        <View className="gap-1.5">
          <SidebarTitle>Keahlian</SidebarTitle>
          <View className="flex-row flex-wrap gap-2">
            {cv.skills.map((s) => (
              <View key={s} className="rounded-full bg-on-primary/15 px-3 py-1">
                <Text className="text-caption font-medium text-on-primary">{s}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-1">
          <SidebarTitle>Pendidikan</SidebarTitle>
          {cv.education.map((e) => (
            <View key={e.degree}>
              <Text className="text-label-md font-semibold text-on-primary">{e.degree}</Text>
              <Text className="text-caption text-on-primary opacity-80">
                {e.school} · {e.period}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Konten utama */}
      <View className="gap-lg p-lg">
        <View className="gap-2">
          <MainTitle>Tentang</MainTitle>
          <Text className="text-body-md leading-5 text-on-surface-variant">{cv.about}</Text>
        </View>

        <View className="gap-md">
          <MainTitle>Pengalaman</MainTitle>
          {cv.experience.map((e) => (
            <View key={`${e.role}-${e.company}`} className="border-l-2 border-outline-variant pl-md">
              <View className="flex-row flex-wrap items-baseline justify-between">
                <Text className="text-label-md font-bold text-on-surface">{e.role}</Text>
                <Text className="text-caption text-on-surface-variant">{e.period}</Text>
              </View>
              <Text className="text-body-md font-medium text-primary">{e.company}</Text>
              <View className="mt-1 gap-1">
                {e.bullets.map((b) => (
                  <View key={b} className="flex-row gap-2">
                    <Text className="text-on-surface-variant">{'•'}</Text>
                    <Text className="flex-1 text-body-md text-on-surface-variant">{b}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ContactRow({ icon, text }: { icon: MaterialIconName; text: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <Icon name={icon} size={15} color={C.onPrimary} />
      <Text className="text-body-md text-on-primary opacity-90">{text}</Text>
    </View>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text className="text-label-md font-bold uppercase tracking-wider text-on-primary opacity-70">
      {children}
    </Text>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text className="self-start border-b-2 border-primary pb-0.5 text-label-md font-bold uppercase tracking-wider text-primary">
      {children}
    </Text>
  );
}
