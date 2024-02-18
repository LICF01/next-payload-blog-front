'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Select, SelectItem } from '@/_components/ui/Select';
import capitalize from '@/_utils/capitalize';
import { Key } from 'react-aria-components';

enum Theme {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSelectionChange = (key: Key) => {
    setTheme(key as string);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log('theme', theme);
  return (
    <Select
      defaultSelectedKey={theme}
      arial-label='Select a theme'
      onSelectionChange={handleSelectionChange}
    >
      <SelectItem id={Theme.light} aria-label={Theme.light}>
        <Sun />
        <span>{capitalize(Theme.light)}</span>
      </SelectItem>
      <SelectItem id={Theme.dark} aria-label={Theme.dark}>
        <Moon />
        <span>{capitalize(Theme.dark)}</span>
      </SelectItem>
      <SelectItem id={Theme.system} aria-label={Theme.system}>
        <Monitor />
        <span>{capitalize(Theme.system)}</span>
      </SelectItem>
    </Select>
  );
}
