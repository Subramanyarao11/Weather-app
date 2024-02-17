'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

const MyButton = ({ path }: { path: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(path);
      }}
    >
      Get detailed forecast
    </Button>
  );
};

export default MyButton;

