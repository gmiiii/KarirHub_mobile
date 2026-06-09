import { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../src/components/AppHeader';
import { Icon } from '../src/components/Icon';
import { Badge, Button } from '../src/components/ui';
import { CvDocument } from '../src/components/cv/CvDocument';
import { cvData, FREE_CV_CREDITS, CREDIT_PER_GENERATE, type CvData } from '../src/data';
import { C } from '../src/theme';

/** Syarat foto wajah yang diunggah agar hasil AI maksimal. */
const PHOTO_GUIDE = [
  'Wajah terlihat jelas dan menghadap kamera',
  'Pencahayaan merata, tidak gelap atau silau',
  'Latar belakang polos atau tidak ramai',
  'Tanpa kacamata hitam, masker, atau topi',
];

/** Gaya foto formal yang dihasilkan AI dari foto yang diunggah. */
const PHOTO_STYLES = [
  { id: 'formal', name: 'Formal Kantor' },
  { id: 'kasual', name: 'Bisnis Kasual' },
  { id: 'biru', name: 'Latar Biru' },
  { id: 'abu', name: 'Latar Abu' },
];

/** Ringkasan "Tentang" disusun otomatis dari data yang diisi pengguna. */
function generateAbout(headline: string, location: string, skills: string[]): string {
  const topSkills = skills.slice(0, 3).join(', ');
  const skillPhrase = topSkills ? ` dengan keahlian utama di ${topSkills}` : '';
  return `${headline} yang berbasis di ${location}. Berpengalaman menghasilkan kerja yang rapi dan terukur${skillPhrase}. Terbiasa berkolaborasi lintas tim untuk mencapai target bersama.`;
}

export default function AiFotoCv() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Foto wajah yang diunggah boleh informal; AI menghasilkan pasfoto formal sesuai
  // gaya yang dipilih. Pemrosesan AI disimulasikan (front-end dummy).
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [style, setStyle] = useState('formal');

  // Form diisi awal dengan data contoh agar pratinjau langsung lengkap saat dicoba.
  const [name, setName] = useState(cvData.name);
  const [headline, setHeadline] = useState(cvData.headline);
  const [location, setLocation] = useState(cvData.location);
  const [email, setEmail] = useState(cvData.contact.email);
  const [phone, setPhone] = useState(cvData.contact.phone);
  const [linkedin, setLinkedin] = useState(cvData.contact.linkedin);
  const [skills, setSkills] = useState(cvData.skills.join(', '));
  const [eduDegree, setEduDegree] = useState(cvData.education[0].degree);
  const [eduSchool, setEduSchool] = useState(cvData.education[0].school);
  const [eduPeriod, setEduPeriod] = useState(cvData.education[0].period);
  const [expRole, setExpRole] = useState(cvData.experience[0].role);
  const [expCompany, setExpCompany] = useState(cvData.experience[0].company);
  const [expPeriod, setExpPeriod] = useState(cvData.experience[0].period);

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<CvData | null>(null);
  // Saldo kredit disimulasikan (front-end dummy). Pengguna baru dapat kredit gratis.
  const [credits, setCredits] = useState(FREE_CV_CREDITS);

  const styleName = PHOTO_STYLES.find((s) => s.id === style)?.name ?? 'Formal Kantor';
  const hasCredit = credits >= CREDIT_PER_GENERATE;

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Izin diperlukan', 'Beri izin akses galeri untuk mengunggah foto wajah.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!res.canceled) setPhotoUri(res.assets[0].uri);
  }

  function handleGenerate() {
    if (!hasCredit || !photoUri) return;
    setCredits((c) => c - CREDIT_PER_GENERATE);
    setGenerating(true);
    const skillList = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Simulasi proses AI (front-end dummy). Saat backend siap, ganti dengan panggilan API.
    setTimeout(() => {
      setResult({
        name,
        headline,
        location,
        // Pasfoto formal hasil AI (disimulasikan dengan foto yang diunggah).
        photo: { uri: photoUri },
        contact: { email, phone, linkedin },
        about: generateAbout(headline, location, skillList),
        skills: skillList,
        experience: [
          {
            role: expRole,
            company: expCompany,
            period: expPeriod,
            bullets: [
              `Menjalankan peran ${expRole} di ${expCompany} dengan tanggung jawab penuh.`,
              'Berkolaborasi dengan tim lintas fungsi untuk mencapai target bersama.',
            ],
          },
        ],
        education: [{ degree: eduDegree, school: eduSchool, period: eduPeriod }],
      });
      setGenerating(false);
    }, 1200);
  }

  if (result) {
    return (
      <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
        <AppHeader title="CV kamu siap" back />
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <Text className="text-body-md text-on-surface-variant">
            Pasfoto formal (gaya {styleName}) dan ringkasan disusun otomatis oleh AI. Periksa, lalu simpan atau ubah data.
          </Text>
          <CvDocument cv={result} />
        </ScrollView>
        <View className="flex-row gap-3 border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
          <View className="flex-1">
            <Button label="Ubah data" variant="secondary" icon="restart-alt" fullWidth onPress={() => setResult(null)} />
          </View>
          <View className="flex-1">
            <Button label="Simpan" icon="save" fullWidth onPress={() => router.push('/cv-saya')} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      <AppHeader title="Buat CV dengan AI" back />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <Badge label="Didukung AI" tone="info" icon="auto-awesome" />
            <View className="flex-row items-center gap-1 rounded-full border border-outline-variant px-md py-1">
              <Icon name="auto-awesome" size={14} color={C.primary} />
              <Text className="text-label-md font-semibold text-on-surface">{credits} kredit</Text>
            </View>
          </View>
          <Text className="text-headline-md font-bold text-on-surface">Buat CV dengan AI</Text>
          <Text className="text-body-md text-on-surface-variant">
            Unggah fotomu (boleh foto biasa) dan isi data diri singkat. AI mengubah fotomu jadi pasfoto formal sesuai gaya pilihanmu, lalu menyusun ringkasan CV otomatis.
          </Text>
        </View>

        {/* Foto wajah */}
        <Text className="text-title-lg font-semibold text-on-surface">Foto wajah</Text>
        {photoUri ? (
          <View className="flex-row items-center gap-md rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
            <Image source={{ uri: photoUri }} resizeMode="cover" style={{ width: 64, height: 84, borderRadius: 8 }} />
            <View className="flex-1 gap-1">
              <Text className="text-label-md font-semibold text-on-surface">Foto terpasang</Text>
              <Text className="text-caption text-on-surface-variant">AI akan mengubahnya jadi pasfoto formal.</Text>
            </View>
            <Pressable onPress={pickImage} hitSlop={8}>
              <Text className="text-label-md font-semibold text-primary">Ganti</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={pickImage}
            className="items-center gap-2 rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-lowest px-lg py-xl active:opacity-90"
          >
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary-fixed">
              <Icon name="add-a-photo" size={28} color={C.primary} />
            </View>
            <Text className="text-label-md font-semibold text-on-surface">Unggah foto wajah</Text>
            <Text className="text-center text-caption text-on-surface-variant">Cukup foto wajah. JPG/PNG, maks 5MB.</Text>
          </Pressable>
        )}

        {/* Panduan foto */}
        <View className="gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-lg">
          <View className="flex-row items-center gap-2">
            <Icon name="verified" size={18} color={C.primary} />
            <Text className="text-label-md font-semibold text-on-surface">Panduan foto wajah</Text>
          </View>
          {PHOTO_GUIDE.map((g) => (
            <View key={g} className="flex-row items-start gap-2">
              <Icon name="check-circle" size={16} color={C.tertiary} />
              <Text className="flex-1 text-body-md text-on-surface-variant">{g}</Text>
            </View>
          ))}
        </View>

        {/* Gaya foto formal */}
        <Text className="text-label-md font-medium text-on-surface">Gaya foto formal</Text>
        <View className="flex-row flex-wrap" style={{ gap: 8 }}>
          {PHOTO_STYLES.map((s) => {
            const active = style === s.id;
            return (
              <Pressable
                key={s.id}
                onPress={() => setStyle(s.id)}
                className={`rounded-lg border px-md py-2 ${active ? 'border-primary bg-primary-fixed' : 'border-outline-variant'}`}
              >
                <Text className={`text-label-md font-medium ${active ? 'text-primary' : 'text-on-surface-variant'}`}>{s.name}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Data diri */}
        <Text className="text-title-lg font-semibold text-on-surface">Data diri</Text>
        <Field label="Nama lengkap" value={name} onChangeText={setName} />
        <Field label="Posisi / headline" value={headline} onChangeText={setHeadline} />
        <Field label="Lokasi" value={location} onChangeText={setLocation} />
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Telepon" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field label="LinkedIn" value={linkedin} onChangeText={setLinkedin} />
        <Field label="Keahlian (pisahkan dengan koma)" value={skills} onChangeText={setSkills} />

        {/* Pendidikan & pengalaman */}
        <Text className="text-title-lg font-semibold text-on-surface">Pendidikan & pengalaman</Text>
        <Field label="Jurusan / gelar" value={eduDegree} onChangeText={setEduDegree} />
        <Field label="Institusi" value={eduSchool} onChangeText={setEduSchool} />
        <Field label="Periode pendidikan" value={eduPeriod} onChangeText={setEduPeriod} />
        <Field label="Posisi terakhir" value={expRole} onChangeText={setExpRole} />
        <Field label="Perusahaan" value={expCompany} onChangeText={setExpCompany} />
        <Field label="Periode kerja" value={expPeriod} onChangeText={setExpPeriod} />
      </ScrollView>

      <View className="border-t border-outline-variant bg-surface px-md py-3" style={{ paddingBottom: insets.bottom + 12 }}>
        {hasCredit ? (
          <Button
            label={generating ? 'Menyusun CV...' : 'Generate dengan AI (1 kredit)'}
            icon="auto-awesome"
            fullWidth
            onPress={photoUri && !generating ? handleGenerate : undefined}
          />
        ) : (
          <View className="gap-2">
            <Text className="text-center text-body-md text-on-surface-variant">
              Kredit habis. Dapatkan kredit untuk lanjut membuat CV.
            </Text>
            <Button label="Dapatkan kredit" icon="bolt" fullWidth onPress={() => router.push('/langganan')} />
          </View>
        )}
      </View>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) {
  return (
    <View className="gap-1">
      <Text className="text-label-md font-medium text-on-surface">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={C.onSurfaceVariant}
        className="h-12 rounded-lg border border-outline-variant bg-surface px-md text-body-md text-on-surface"
      />
    </View>
  );
}
