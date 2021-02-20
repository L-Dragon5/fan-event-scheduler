import React from 'react';

const ExternalLink = ({ href, className, style, children }) => {
  return (
    <a
      href={href}
      className={`external-link ${className}`}
      style={style}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
