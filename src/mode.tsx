import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MaterialIconName } from './components/Icon';

/**
 * Mode/peran akun (Model A: satu akun, banyak peran - selaras dengan web).
 * State di memori saja; saat ada auth/DB, sambungkan ke peran asli.
 */
export type Role = 'pencari' | 'seller' | 'rekruter';

export const roleMeta: Record<
  Role,
  { label: string; short: string; home: string; icon: MaterialIconName; desc: string }
> = {
  pencari: {
    label: 'Pencari Kerja',
    short: 'Pencari',
    home: '/',
    icon: 'person-search',
    desc: 'Lamar lowongan & beli jasa karir.',
  },
  seller: {
    label: 'Seller Jasa',
    short: 'Seller',
    home: '/dashboard/seller',
    icon: 'storefront',
    desc: 'Jual jasa karir & kelola pesanan.',
  },
  rekruter: {
    label: 'Rekruter',
    short: 'Rekruter',
    home: '/dashboard/rekruter',
    icon: 'business-center',
    desc: 'Pasang lowongan & cari talenta.',
  },
};

export const ROLE_ORDER: Role[] = ['pencari', 'seller', 'rekruter'];

type ModeCtx = { role: Role; setRole: (role: Role) => void };
const Ctx = createContext<ModeCtx | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('pencari');
  return <Ctx.Provider value={{ role, setRole }}>{children}</Ctx.Provider>;
}

export function useMode() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useMode harus dipakai di dalam <ModeProvider>');
  return ctx;
}
