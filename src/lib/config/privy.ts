import { mainnet, sepolia, polygon } from 'viem/chains';
import type { PrivyClientConfig } from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  config: {
    appearance: {
      theme: 'dark',
      accentColor: '#f7931a', // Bitcoin orange matching project design
      logo: '/logo.svg',
      showWalletLoginFirst: true,
      landingHeader: 'Welcome to JackRoll',
      landingSubheader: 'Connect your wallet to start playing',
    },
    loginMethods: ['wallet', 'email', 'twitter'],
    defaultChain: sepolia,
    supportedChains: [mainnet, sepolia, polygon],
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
    },
    mfa: {
      noPromptOnMfaRequired: false,
    },
  },
};