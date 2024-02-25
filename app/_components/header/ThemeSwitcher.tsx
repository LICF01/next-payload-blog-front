'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Select, SelectItem } from '@/_components/ui/Select';
import capitalize from '@/_utils/capitalize';
import { Button, Key, PressEvent } from 'react-aria-components';
import { IconButton } from '../ui/IconButton';

enum Theme {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSelectionChange = (e: PressEvent) => {
    setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      as='button'
      icon={theme === Theme.dark ? <Sun /> : <Moon />}
      aria-label='Theme switcher'
      onPress={handleSelectionChange}
    />
  );
}
