import type { TAILWIND_COLORS } from '../constants/colors';

export type ColorPair = {
  text: string;
  color: ColorName;
};

export type ColorName = keyof typeof TAILWIND_COLORS;
