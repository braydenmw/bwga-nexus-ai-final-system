
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => (
  <div style={style} className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-5 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export default Card;