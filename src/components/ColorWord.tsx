import React from 'react';
import { TAILWIND_COLORS } from '../constants/colors';
import type { ColorPair } from '../types';

type ColorWordProps = {
  pair: ColorPair;
};

export const ColorWord: React.FC<ColorWordProps> = ({ pair }) => {
  const className = `${TAILWIND_COLORS[pair.color]} text-2xl font-bold`;

  return <span className={className}>{pair.text}</span>;
};
