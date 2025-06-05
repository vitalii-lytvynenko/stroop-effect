import { COLORS } from '../constants/colors';
import type { ColorPair } from '../types';

export function getRandomColor(exclude: string, prevColor: string): string {
  const filtered = COLORS.filter(color => color !== exclude && color !== prevColor);
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

export function generateColorPairs(count: number): ColorPair[] {
  const result: ColorPair[] = [];
  let prevColor = '';

  for (let i = 0; i < count; i++) {
    const text = COLORS[Math.floor(Math.random() * COLORS.length)];
    const color = getRandomColor(text, prevColor);

    result.push({ text, color });
    prevColor = color;
  }

  return result;
}
