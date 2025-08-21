'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, Wallet, Trophy, TrendingUp, Clock, Copy, Share2, Users, Gift, Star, QrCode, Twitter, MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { authenticated, ready, user, logout, linkTwitter, unlinkTwitter } = usePrivy();
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
  const twitterAccount = user.twitter;
  const hasTwitter = !!twitterAccount;

  const handleLinkTwitter = async () => {
    try {
      await linkTwitter();
      toast.success('Twitter linked successfully!');
    } catch (error) {
      toast.error('Failed to link Twitter');
      console.error('Twitter linking error:', error);
    }
  };

  const handleUnlinkTwitter = async () => {
    try {
      await unlinkTwitter(twitterAccount?.subject || '');
      toast.success('Twitter unlinked successfully!');
    } catch (error) {
      toast.error('Failed to unlink Twitter');
      console.error('Twitter unlinking error:', error);
    }
  };

  // Mock data - in real app, fetch from backend/blockchain
  const mockStats = {
    totalPots: 47,
    wins: 23,
    losses: 24,
    winRate: 48.9,
    currentNetworkVolume: 8.3, // Current network only
    lifetimeVolume: 22.7, // Combined across all networks
    favoritePotType: 'Degen Pots',
    joinDate: 'November 2024',
    reputation: 'Admin',
    longestStreak: 7
  };

  // Role progression logic
  const getRoleProgress = (volume: number) => {
    const roles = [
      { name: 'Noob', requirement: 0, color: 'bg-gray-400' },
      { name: 'Jade', requirement: 10, color: 'bg-green-500' },
      { name: 'Ruby', requirement: 15, color: 'bg-red-500' },
      { name: 'OG', requirement: 35, color: 'bg-yellow-500' }
    ];
    
    // Find current role
    let currentRole = roles[0];
    for (let i = roles.length - 1; i >= 0; i--) {
      if (volume >= roles[i].requirement) {
        currentRole = roles[i];
        break;
      }
    }
    
    // Find next role
    const nextRole = roles.find(role => role.requirement > volume);
    
    // Calculate progress percentage
    let progress = 0;
    if (nextRole) {
      const currentReq = currentRole.requirement;
      const nextReq = nextRole.requirement;
      progress = ((volume - currentReq) / (nextReq - currentReq)) * 100;
    } else {
      progress = 100; // Max role achieved
    }
    
    return { currentRole, nextRole, progress: Math.min(progress, 100) };
  };

  const roleProgress = getRoleProgress(mockStats.lifetimeVolume);

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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          
          {/* Hero Profile Section */}
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage 
                  src={hasTwitter && twitterAccount?.profilePictureUrl ? twitterAccount.profilePictureUrl : undefined} 
                  alt="Profile" 
                />
                <AvatarFallback className="bg-[#f7931a] text-black text-3xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">
                  {hasTwitter ? (twitterAccount?.name || twitterAccount?.username) : 'Anonymous Trader'}
                </h1>
                
                <div className="flex items-center justify-center gap-4">
                  {hasTwitter && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span>@{twitterAccount?.username}</span>
                    </div>
                  )}
                  <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1 px-3 py-1">
                    <span>👑</span>
                    {mockStats.reputation}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{mockStats.totalPots}</div>
                <div className="text-sm text-muted-foreground">Pots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{mockStats.wins}</div>
                <div className="text-sm text-muted-foreground">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{mockStats.lifetimeVolume} ETH</div>
                <div className="text-sm text-muted-foreground">Lifetime Volume</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{mockStats.winRate}%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
            </div>

            {/* Role Progress Bar - Only for non-Admin/Mod users */}
            {mockStats.reputation !== 'Admin' && mockStats.reputation !== 'Mod' && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{roleProgress.currentRole.name}</span>
                  {roleProgress.nextRole && (
                    <span className="text-sm text-muted-foreground">{roleProgress.nextRole.name}</span>
                  )}
                </div>
                
                {/* Apple-inspired progress bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#f7931a] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${roleProgress.progress}%` }}
                    />
                  </div>
                  
                  {/* Progress dots */}
                  <div className="absolute top-0 left-0 w-full h-2 flex justify-between items-center">
                    {[0, 33.33, 66.66, 100].map((position, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full ${
                          roleProgress.progress >= position 
                            ? 'bg-[#f7931a]' 
                            : 'bg-gray-300'
                        }`}
                        style={{ 
                          marginLeft: index === 0 ? '0' : '-2px',
                          marginRight: index === 3 ? '0' : '-2px'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {roleProgress.nextRole && (
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    {(roleProgress.nextRole.requirement - mockStats.lifetimeVolume).toFixed(1)} ETH to {roleProgress.nextRole.name}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Referral Section */}
          <Card>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Bring Your Crew</CardTitle>
              <CardDescription className="text-lg">Share your code, earn together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Referral Code */}
              <div className="text-center space-y-4">
                <div className="bg-muted p-6 rounded-lg">
                  <div className="font-mono text-2xl font-bold tracking-wider">
                    {mockReferralData.referralCode}
                  </div>
                </div>
                <Button
                  onClick={() => handleCopyReferralCode(mockReferralData.referralCode)}
                  className="bg-[#f7931a] hover:bg-[#e8860f] text-black font-medium px-8"
                  size="lg"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Button
                  variant="outline"
                  onClick={() => handleShareToTwitter(mockReferralData.referralCode)}
                  size="lg"
                >
                  <X className="h-4 w-4 mr-2" />
                  Share on X
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShareToDiscord(mockReferralData.referralCode)}
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 pt-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#f7931a]">{mockReferralData.totalReferrals}</div>
                  <div className="text-sm text-muted-foreground">Friends Joined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockReferralData.totalEarnings} ETH</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </div>
              </div>
              </CardContent>
            </Card>

          {/* Settings Section */}
          <Card>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Social Connection */}
              <div className="text-center space-y-4">
                {hasTwitter ? (
                  <div className="flex items-center justify-center gap-3">
                    <X className="h-4 w-4" />
                    <span>@{twitterAccount?.username}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUnlinkTwitter}
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={handleLinkTwitter}
                      variant="outline"
                      size="lg"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Connect X (Optional)
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Privacy respected - stay anonymous if you prefer
                    </p>
                  </div>
                )}
              </div>
              
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}