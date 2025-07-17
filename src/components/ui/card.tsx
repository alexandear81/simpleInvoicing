import React from 'react';

export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white shadow-md rounded-xl p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mt-2 ${className}`}>
    {children}
  </div>
);
