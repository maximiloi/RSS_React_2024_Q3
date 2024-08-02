'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../pages/App'), { ssr: false });

const ClientOnly = () => {
  return <App />;
};

export default ClientOnly;
