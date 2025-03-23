"use client";

import { useState } from 'react';
import styles from './ProtocolLogo.module.css';

type ProtocolLogoProps = {
  name: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ProtocolLogo({ name, logoUrl, size = 'md' }: ProtocolLogoProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      {(!logoUrl || imageError) && (
        <span className={styles.fallback}>{name.charAt(0)}</span>
      )}
      {logoUrl && !imageError && (
        <img
          src={logoUrl}
          alt={name}
          className={styles.image}
          onError={handleImageError}
        />
      )}
    </div>
  );
}
