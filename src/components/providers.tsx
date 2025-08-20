'use client';

import { useState, useEffect } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!mounted) {
    return <>{children}</>;
  }

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#f7931a',
          showWalletLoginFirst: true,
          landingHeader: 'Welcome to JackRoll',
          landingSubheader: 'Connect your wallet to start playing',
        },
        loginMethods: ['wallet', 'email'],
        defaultChain: sepolia,
      }}
    >
      {children}
    </PrivyProvider>
  );
}