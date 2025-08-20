'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Wallet, Trophy, TrendingUp, Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { authenticated, ready, user, logout } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const handleBackToGame = () => {
    router.push('/');
  };

  if (!ready || !authenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f7931a] mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const walletAddress = user.wallet?.address;

  // Mock data - in real app, fetch from backend/blockchain
  const mockStats = {
    totalPots: 47,
    wins: 23,
    losses: 24,
    winRate: 48.9,
    totalVolume: 12.7,
    favoritePotType: 'Degen Pots',
    joinDate: 'November 2024',
    reputation: 'Trusted Trader',
    longestStreak: 7
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={handleBackToGame}
              variant="ghost"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Game
            </Button>
            <div className="flex items-center gap-3">
              <Button
                onClick={logout}
                variant="outline"
                className="border-[#f7931a] text-[#f7931a] hover:bg-[#f7931a] hover:text-black"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-[#f7931a] text-black text-2xl">
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>Anonymous Trader</CardTitle>
                <CardDescription>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {mockStats.reputation}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Wallet Address</div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-8)}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => walletAddress && handleCopyAddress(walletAddress)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Member Since</div>
                  <div className="text-sm">{mockStats.joinDate}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Favorite Game Mode</div>
                  <div className="text-sm">{mockStats.favoritePotType}</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-semibold text-green-600">{mockStats.winRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Volume</span>
                  <span className="font-semibold">{mockStats.totalVolume} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Longest Streak</span>
                  <span className="font-semibold">{mockStats.longestStreak} wins</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="h-5 w-5 text-[#f7931a]" />
                  </div>
                  <div className="text-2xl font-bold">{mockStats.totalPots}</div>
                  <div className="text-xs text-muted-foreground">Total Pots</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{mockStats.wins}</div>
                  <div className="text-xs text-muted-foreground">Wins</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-5 w-5 bg-red-500 rounded-full" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{mockStats.losses}</div>
                  <div className="text-xs text-muted-foreground">Losses</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Wallet className="h-5 w-5 text-[#f7931a]" />
                  </div>
                  <div className="text-2xl font-bold">{mockStats.totalVolume}</div>
                  <div className="text-xs text-muted-foreground">ETH Volume</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest pot participations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <div className="font-medium text-sm">
                            {i % 2 === 0 ? 'Won' : 'Lost'} Pot #{Math.floor(Math.random() * 1000)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? 'Degen Pot' : 'Jacked Pot'} • {Math.random().toFixed(2)} ETH
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.floor(Math.random() * 24)}h ago
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}