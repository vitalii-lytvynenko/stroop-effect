import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants/colors';
import type { ColorPair, ColorName } from '../types';
import classNames from 'classnames';
import { generateColorPairs } from '../utils/ColorUtils';
import { ColorWord } from './ColorWord';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const ColorQuiz: React.FC = () => {
  const [pairs, setPairs] = useState<ColorPair[]>([]);
  const [userAnswers, setUserAnswers] = useState<ColorName[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setPairs(generateColorPairs(20));
  }, []);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const QUIZ_TIME = 45;

  const WIDTH_CLASSES = [
    { percent: 90, class: 'w-full' },
    { percent: 75, class: 'w-4/5' },
    { percent: 60, class: 'w-3/5 bg-yellow' },
    { percent: 35, class: 'w-2/5 bg-yellow' },
    { percent: 15, class: 'w-1/5 bg-orange' },
    { percent: 0, class: 'w-1/12 bg-red' },
  ];

  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);

  const progressWidthClass = getTailwindWidthClass(timeLeft, QUIZ_TIME);

  function getTailwindWidthClass(timeLeft: number, total: number): string {
    const percent = (timeLeft / total) * 100;

    for (const { percent: p, class: cls } of WIDTH_CLASSES) {
      if (percent >= p) {
        return cls;
      }
    }

    return 'w-0';
  }

  useEffect(() => {
    if (showResult || userAnswers.length === pairs.length) {
      return;
    }

    setTimeLeft(QUIZ_TIME);
    timerRef.current = setTimeout(() => {
      if (userAnswers.length < pairs.length) {
        handleRetry();
      }
    }, QUIZ_TIME * 1000);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
        <div className='min-h-[60vh] flex items-center justify-center px-4'>
          <div className='w-full max-w-4xl'>
            <div className='mb-6 flex justify-center flex-col items-center'>
              <div className='w-64 rounded-full h-5 relative bg-gray-200'>
                <div
                  className={classNames(
                    'absolute left-1/2 top-0 rounded-full h-full bg-green transition-all duration-300 transform -translate-x-1/2',
                    progressWidthClass
                  )}
                />
                <span className='absolute inset-0 flex items-center justify-center font-bold text-sm text-gray-900'>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <ul
              className='mb-6 grid gap-2 grid-cols-2 
             sm:grid-cols-3 
             md:grid-cols-4 
             lg:grid-cols-5'
            >
              {pairs.map((pair, id) => (
                <li
                  key={id}
                  className={classNames(
                    'flex items-center justify-center rounded-md px-4 py-2 border-2 text-center transition',
                    {
                      'border-gray-300 shadow-md': id === userAnswers.length,
                      'border-transparent': id !== userAnswers.length,
                    }
                  )}
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

            <p className='text-center mb-4 font-medium'>
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
          </div>
        </div>
      ) : (
        <div className='flex min-h-[60vh] flex-col items-center justify-center text-center'>
          <div className='flex items-center justify-center mb-6'>
            <DotLottieReact
              autoplay
              src='https://lottie.host/eb206c33-ff05-4a6c-a60b-f718f4351452/sbYCn74p3H.lottie'
              className='h-56 w-56'
            />
          </div>
          <h3 className='mb-4 text-2xl font-bold text-gray-800'>
            Result: {correctCount} / {pairs.length}
          </h3>
          <button
            className='rounded-md bg-gray-400 px-6 py-2 font-semibold transition hover:bg-blue'
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
