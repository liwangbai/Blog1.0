import type { Locale } from './settings';
import zh from './dictionaries/zh.json';
import en from './dictionaries/en.json';

const dictionaries = { zh, en } as const;

export type Dictionary = typeof zh;

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.zh;
}
