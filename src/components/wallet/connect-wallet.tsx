'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const { login, logout, ready, authenticated, user } = usePrivy();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) {
    return (
      <Button disabled className="bg-[#f7931a] hover:bg-[#e8860f]">
        Loading...
      </Button>
    );
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {user.wallet?.address?.slice(0, 6)}...{user.wallet?.address?.slice(-4)}
        </span>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="border-[#f7931a] text-[#f7931a] hover:bg-[#f7931a] hover:text-black"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={login}
      className="bg-[#f7931a] hover:bg-[#e8860f] text-black font-medium"
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  );
}