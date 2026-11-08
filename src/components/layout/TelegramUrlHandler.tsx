'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAstra } from '@/lib/store';

export const TelegramUrlHandler: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { triggerHaptic } = useAstra();

  useEffect(() => {
    // If user opened with ?profile (e.g. Telegram Mini App direct profile link)
    const hasProfileParam = searchParams.has('profile') || searchParams.get('startapp') === 'profile';
    if (hasProfileParam && pathname !== '/profile') {
      triggerHaptic('light');
      router.replace('/profile');
    }
  }, [searchParams, pathname, router, triggerHaptic]);

  return null;
};
