import React from 'react';

interface ILowPriority {
  className?: string;
}
const LowPriority = ({ className }: ILowPriority) => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M2 20h.034" stroke="#4A4A4A" />
      <path d="M7 20v-4" stroke="#4A4A4A" /> {/* Verde */}
      <path d="M12 20v-8" stroke="#B0B0B0" /> {/* Azul */}
      <path d="M17 20V8" stroke="#B0B0B0" /> {/* Laranja */}
    </svg>
  );
};

export default LowPriority;
