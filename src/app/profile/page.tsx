'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Wallet, Trophy, TrendingUp, Clock, Copy, Share2, Users, Gift, Star, QrCode, Twitter, MessageCircle } from 'lucide-react';
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

  const handleCopyReferralCode = async (code: string) => {
    try {
      const referralLink = `https://jackroll.io/r/${code}`;
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy referral link');
    }
  };

  const handleShareToTwitter = (code: string) => {
    const text = encodeURIComponent(`🎲 Join me on JackRoll - the ultimate NFT gaming platform! Use my referral code: ${code}\n\nStake NFTs, win big, and experience true Web3 gaming! 🚀`);
    const url = encodeURIComponent(`https://jackroll.io/r/${code}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareToDiscord = (code: string) => {
    const message = `🎲 **JackRoll Invitation** 🎲\n\nJoin me on the ultimate NFT gaming platform!\n\n🔗 Use referral code: **${code}**\n🎯 Stake NFTs, win big, experience true Web3 gaming!\n\n👉 https://jackroll.io/r/${code}`;
    navigator.clipboard.writeText(message);
    toast.success('Discord message copied to clipboard!');
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

  // Mock referral data
  const mockReferralData = {
    referralCode: `JACK-${walletAddress?.slice(2, 8).toUpperCase()}-${walletAddress?.slice(-4).toUpperCase()}`,
    customCode: null, // Premium feature
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 2.34,
    thisMonthEarnings: 0.89,
    referralVolume: 45.2,
    tier: 'Bronze',
    nextTierProgress: 65, // % to next tier
    achievements: [
      { id: 1, name: 'Talent Scout', description: 'Referred your first user', unlocked: true },
      { id: 2, name: 'Network Builder', description: '5+ active referrals', unlocked: true },
      { id: 3, name: 'Community Leader', description: '25+ total referrals', unlocked: false },
    ],
    recentReferrals: [
      { address: '0x1234...5678', joinDate: '2 days ago', volume: 2.1, active: true },
      { address: '0xABCD...EFGH', joinDate: '1 week ago', volume: 5.7, active: true },
      { address: '0x9876...4321', joinDate: '2 weeks ago', volume: 1.2, active: false },
    ]
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

            {/* Referral Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Referral Program - "Bring Your Crew"</CardTitle>
                <CardDescription>Earn rewards by inviting friends to JackRoll</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Referral Code & Sharing */}
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Your Referral Code</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted p-3 rounded-md font-mono text-sm">
                        {mockReferralData.referralCode}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCopyReferralCode(mockReferralData.referralCode)}
                        className="bg-[#f7931a] hover:bg-[#e8860f] text-black"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShareToTwitter(mockReferralData.referralCode)}
                      className="flex-1"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Share on X
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShareToDiscord(mockReferralData.referralCode)}
                      className="flex-1"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Discord
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      QR Code
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Referral Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-[#f7931a]">{mockReferralData.totalReferrals}</div>
                    <div className="text-xs text-muted-foreground">Total Referrals</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-green-600">{mockReferralData.activeReferrals}</div>
                    <div className="text-xs text-muted-foreground">Active This Month</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold">{mockReferralData.totalEarnings} ETH</div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold">{mockReferralData.referralVolume} ETH</div>
                    <div className="text-xs text-muted-foreground">Referred Volume</div>
                  </div>
                </div>

                <Separator />

                {/* Tier Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Referral Tier: {mockReferralData.tier}</div>
                      <div className="text-sm text-muted-foreground">
                        {mockReferralData.nextTierProgress}% to Silver Tier
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {mockReferralData.tier}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-[#f7931a] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mockReferralData.nextTierProgress}%` }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Achievements */}
                <div className="space-y-3">
                  <div className="font-medium">Referral Achievements</div>
                  <div className="grid gap-2">
                    {mockReferralData.achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`flex items-center gap-3 p-2 rounded-md ${
                          achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-muted/50'
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? 'bg-green-500' : 'bg-muted-foreground/20'
                        }`}>
                          <Star className={`h-4 w-4 ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${achievement.unlocked ? 'text-green-700' : 'text-muted-foreground'}`}>
                            {achievement.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Recent Referrals */}
                <div className="space-y-3">
                  <div className="font-medium">Recent Referrals</div>
                  <div className="space-y-2">
                    {mockReferralData.recentReferrals.map((referral, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${referral.active ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <div>
                            <div className="font-medium text-sm font-mono">{referral.address}</div>
                            <div className="text-xs text-muted-foreground">
                              Joined {referral.joinDate} • {referral.volume} ETH volume
                            </div>
                          </div>
                        </div>
                        <Badge variant={referral.active ? "default" : "secondary"}>
                          {referral.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}