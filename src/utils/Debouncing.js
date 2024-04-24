import React from 'react';

export default function Debouncing(fun, delay = 1000) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    setTimeout(() => {
      fun();
    }, delay);
  };
}
