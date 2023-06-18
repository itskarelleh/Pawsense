import React, { ReactNode, ButtonHTMLAttributes } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className="rounded-full transition-all ease-in-out h-10 w-10 bg-cyan-500 items-center justify-center flex flex-col hover:bg-purple-400 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    {children}
  </button>
);
