import React from 'react';

export const Button = ({
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${className}`}
  />
);
