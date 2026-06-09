import { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Button } from '../src/components/ui';
import { jobTypes, experiences } from '../src/data';
import { C } from '../src/theme';

export default function PasangLowongan() {
  const insets = useSafeAreaInsets();
  const [jobType, setJobType] = useState<string>(jobTypes[0]);
  const [exp, setExp] = useState<string>(experiences[0]);
  const [highlight, setHighlight] = useState(false);

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Pasang Lowongan" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Text className="text-body-md text-on-surface-variant">
          Lengkapi detail di bawah untuk menayangkan lowongan baru.
        </Text>

        {/* Informasi dasar */}
        <Card title="Informasi dasar">
          <Field label="Judul posisi" placeholder="mis. Senior UI/UX Designer" />
          <Field label="Nama perusahaan" placeholder="PT. Contoh Indonesia" />
          <Field label="Lokasi" placeholder="Kota atau Remote" />

          <Text className="text-label-md font-medium text-on-surface">Tipe pekerjaan</Text>
          <ChipRow options={jobTypes} value={jobType} onChange={setJobType} />

          <Text className="text-label-md font-medium text-on-surface">Pengalaman</Text>
          <ChipRow options={experiences} value={exp} onChange={setExp} />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Field label="Gaji minimum" placeholder="8000000" keyboardType="numeric" />
            </View>
            <View className="flex-1">
              <Field label="Gaji maksimum" placeholder="15000000" keyboardType="numeric" />
            </View>
          </View>
        </Card>

        {/* Deskripsi & kualifikasi */}
        <Card title="Deskripsi & kualifikasi">
          <Field label="Deskripsi pekerjaan" placeholder="Jelaskan peran, tim, dan tujuan posisi ini." multiline />
          <Field label="Tanggung jawab" placeholder="Tulis satu poin per baris." multiline />
          <Field label="Kualifikasi" placeholder="Tulis satu poin per baris." multiline />
          <Field label="Keahlian (pisahkan dengan koma)" placeholder="Figma, Design System, Prototyping" />
        </Card>

        {/* Penayangan */}
        <Card title="Penayangan">
          <Pressable
            onPress={() => setHighlight((v) => !v)}
            className={`flex-row items-center justify-between rounded-lg border p-md ${highlight ? 'border-primary bg-primary-fixed/40' : 'border-outline-variant'}`}
          >
            <View className="flex-1 pr-2">
              <Text className="text-label-md font-semibold text-on-surface">Sorot lowongan</Text>
              <Text className="text-caption text-on-surface-variant">Tampil di urutan teratas selama 7 hari.</Text>
            </View>
            <Icon name={highlight ? 'check-box' : 'check-box-outline-blank'} size={24} color={highlight ? C.primary : C.onSurfaceVariant} />
          </Pressable>
          <View className="flex-row gap-2 rounded-lg bg-surface-container-low p-md">
            <Icon name="info" size={16} color={C.primary} />
            <Text className="flex-1 text-caption text-on-surface-variant">
              Lowongan ditinjau maksimal 1x24 jam sebelum tayang.
            </Text>
          </View>
        </Card>
      </ScrollView>

      <View className="gap-2 border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button label="Tayangkan Lowongan" icon="publish" fullWidth />
        <Button label="Simpan Draf" variant="secondary" icon="save" fullWidth />
      </View>
    </View>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
      <Text className="text-title-lg font-semibold text-on-surface">{title}</Text>
      {children}
    </View>
  );
}

function Field({
  label,
  placeholder,
  multiline,
  keyboardType,
}: {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
}) {
  return (
    <View className="gap-1">
      <Text className="text-label-md font-medium text-on-surface">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={C.onSurfaceVariant}
        multiline={multiline}
        keyboardType={keyboardType}
        className={`rounded-lg border border-outline-variant bg-surface px-md text-body-md text-on-surface ${multiline ? 'h-24 py-2' : 'h-12'}`}
        style={multiline ? { textAlignVertical: 'top' } : undefined}
      />
    </View>
  );
}

function ChipRow({ options, value, onChange }: { options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View className="flex-row flex-wrap" style={{ gap: 8 }}>
      {options.map((o) => {
        const active = value === o;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            className={`rounded-full border px-md py-2 ${active ? 'border-primary bg-primary-fixed' : 'border-outline-variant'}`}
          >
            <Text className={`text-label-md font-medium ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
