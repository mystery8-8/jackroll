'use client';

import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wallet, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const { login, logout, ready, authenticated, user } = usePrivy();
  const router = useRouter();

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
    const walletAddress = user.wallet?.address;
    
    const handleProfileClick = () => {
      router.push('/profile');
    };
    
    return (
      <div className="flex items-center gap-2">
        {walletAddress && (
          <div 
            onClick={handleProfileClick}
            className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded-md p-2 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-[#f7931a] text-black text-xs">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
          </div>
        )}
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