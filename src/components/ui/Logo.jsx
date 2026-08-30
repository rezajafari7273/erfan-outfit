'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/images/logo.png';

export default function Logo({
  width = 130,
  height = 38,
  className = '',
  href = '/',
  priority = false,
}) {
  return (
    <Link 
      href={href} 
      className={`inline-flex items-center shrink-0 ${className}`}
    >
      <Image
        src={logoImg}
        alt="لوگوی عرفان - ERFAN"
        width={width}
        height={height}
        priority={priority}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="object-contain"
      />
    </Link>
  );
}