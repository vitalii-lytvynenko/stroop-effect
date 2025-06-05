import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants/colors';
import type { ColorPair, ColorName } from '../types';
import classNames from 'classnames';
import { generateColorPairs } from '../utils/ColorUtils';
import { ColorWord } from './ColorWord';

export const ColorQuiz: React.FC = () => {
  const [pairs, setPairs] = useState<ColorPair[]>([]);
  const [userAnswers, setUserAnswers] = useState<ColorName[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setPairs(generateColorPairs(20));
  }, []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (showResult || userAnswers.length === pairs.length) return;

    timerRef.current = setTimeout(() => {
      if (userAnswers.length < pairs.length) {
        handleRetry();
      }
    }, 45000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pairs]);

  useEffect(() => {
    if (userAnswers.length === pairs.length && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [userAnswers.length]);

  const handleSelectColor = (color: ColorName) => {
    if (userAnswers.length < pairs.length) {
      setUserAnswers(prev => [...prev, color]);
    }
  };

  const handleRetry = () => {
    setPairs(generateColorPairs(20));
    setUserAnswers([]);
    setShowResult(false);
  };

  const correctCount = userAnswers.filter((color, i) => color === pairs[i]?.color).length;

  return (
    <div className='mx-auto w-full max-w-xl p-2'>
      {!showResult ? (
        <>
          <ul className='mb-6'>
            {pairs.map((pair, id) => (
              <li
                key={id}
                className={classNames('rounded-md px-3', {
                  'border-2': id === userAnswers.length,
                })}
              >
                <ColorWord pair={pair} />
              </li>
            ))}
          </ul>

          <div className='flex flex-wrap justify-center gap-3 mb-6'>
            {COLORS.map(color => (
              <button
                key={color}
                className={classNames('rounded-md px-4 py-2 font-semibold', {
                  'opacity-50 pointer-events-none': userAnswers.length >= pairs.length,
                })}
                onClick={() => handleSelectColor(color)}
              >
                {color}
              </button>
            ))}
          </div>

          <p className='text-center mb-4'>
            Answers: {userAnswers.length} / {pairs.length}
          </p>

          <div className='text-center'>
            <button
              className='rounded-md px-6 py-2 transition bg-green disabled:cursor-not-allowed disabled:bg-gray-300'
              onClick={() => setShowResult(true)}
              disabled={userAnswers.length < pairs.length}
            >
              Finish
            </button>
          </div>
        </>
      ) : (
        <div className='text-center'>
          <div className='flex items-center justify-center'>
            {/* <DotLottieReact
              autoplay
              src='https://lottie.host/eb206c33-ff05-4a6c-a60b-f718f4351452/sbYCn74p3H.lottie'
              className='h-56 w-56'
            /> */}
          </div>
          <h3 className='mb-4 text-2xl font-bold text-gray-800'>
            Result: {correctCount} / {pairs.length}
          </h3>
          <button className='rounded-md px-6 py-2 transition' onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
