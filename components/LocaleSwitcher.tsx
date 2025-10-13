'use client';

import { usePathname, useRouter } from '@/src/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: 'it' | 'en') => {
    router.replace({ pathname }, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <Button
        variant={locale === 'it' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('it')}
        className="px-3 py-1 text-sm"
      >
        IT
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('en')}
        className="px-3 py-1 text-sm"
      >
        EN
      </Button>
    </div>
  );
}
