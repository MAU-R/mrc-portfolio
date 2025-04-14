import { useEffect, useState } from 'react';

const GLITCH_CHARS = ['@', '#', '$', '%', '&', '*', '!', '?', '/', '\\'];

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function glitchString(original: string, intensity = 0.3) {
  return original
    .split('')
    .map((char) => (Math.random() < intensity && char !== ' ' ? randomChar() : char))
    .join('');
}

export const useGlitch = (text: string, interval = 100, glitchDuration = 300, intensity = 0.3) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let glitchTimeout: NodeJS.Timeout;
    const intervalId = setInterval(() => {
      const glitched = glitchString(text, intensity);
      setDisplayText(glitched);

      glitchTimeout = setTimeout(() => {
        setDisplayText(text);
      }, glitchDuration);
    }, interval);

    return () => {
      clearInterval(intervalId);
      clearTimeout(glitchTimeout);
    };
  }, [text, interval, glitchDuration, intensity]);

  return displayText;
};
