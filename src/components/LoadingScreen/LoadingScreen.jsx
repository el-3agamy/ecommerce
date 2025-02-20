import React from 'react' ;
import { Spinner } from '@heroui/react';

export default function LoadingScreen() {
  return (
    <div className="h-[70vh] flex justify-center item-center">
    <Spinner color="primary" size="lg" />

    </div>
  )
}
