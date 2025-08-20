"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectWallet } from "@/components/wallet/connect-wallet"
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  Dice1, 
  Dice2, 
  Dice3, 
  Dice4, 
  Dice5, 
  Dice6,
  Send,
  Users,
  TrendingUp,
  Clock
} from "lucide-react"

interface JackRollLayoutProps {
  children?: React.ReactNode
}

const potTypes = [
  { 
    id: "degen", 
    name: "Degen Pots", 
    icon: Dice1, 
    description: "Safe swap - Always get 1 NFT back",
    risk: "Low Risk",
    color: "text-green-500"
  },
  { 
    id: "jacked", 
    name: "Jacked Pots", 
    icon: Dice6, 
    description: "Winner takes all - High stakes",
    risk: "High Risk",
    color: "text-red-500"
  }
]

const potCategories = [
  { id: "low-tier", name: "Low Tier", description: "< 1 ETH floor price" },
  { id: "high-stakes", name: "High Stakes", description: "≥ 1 ETH floor price" }
]

const dummyChatMessages = [
  { id: 1, user: "Player1", message: "Good luck everyone! 🎲", time: "2m ago" },
  { id: 2, user: "CryptoKing", message: "Just won 0.5 ETH!", time: "3m ago" },
  { id: 3, user: "Dicemaster", message: "Anyone up for mega pot?", time: "5m ago" },
  { id: 4, user: "LuckySeven", message: "gg wp", time: "7m ago" },
  { id: 5, user: "Roller99", message: "New to JackRoll, any tips?", time: "10m ago" }
]

export function JackRollLayout({ children }: JackRollLayoutProps) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [selectedPot, setSelectedPot] = useState("degen")
  const [selectedCategory, setSelectedCategory] = useState("low-tier")
  const [chatMessage, setChatMessage] = useState("")

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In real app, this would send to chat
      setChatMessage("")
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Pot Selection */}
        <div className={`transition-all duration-300 ${isLeftSidebarOpen ? 'w-80' : 'w-16'} border-r border-border bg-card flex flex-col`}>
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              {isLeftSidebarOpen && (
                <div>
                  <h2 className="text-lg font-semibold">Pot Types</h2>
                  <p className="text-sm text-muted-foreground">Choose your game mode</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              >
                {isLeftSidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Pot Types */}
              <div className="space-y-2">
                {potTypes.map((pot) => {
                  const IconComponent = pot.icon
                  return (
                    <Button
                      key={pot.id}
                      variant={selectedPot === pot.id ? "default" : "ghost"}
                      className={`w-full ${isLeftSidebarOpen ? 'justify-start h-auto p-4' : 'justify-center p-2'}`}
                      onClick={() => setSelectedPot(pot.id)}
                    >
                      <IconComponent className={`h-5 w-5 ${isLeftSidebarOpen ? 'mr-3' : ''}`} />
                      {isLeftSidebarOpen && (
                        <div className="text-left flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-base">{pot.name}</div>
                            <Badge 
                              variant={selectedPot === pot.id ? "secondary" : "outline"} 
                              className={selectedPot === pot.id ? pot.color : `${pot.color} border-current`}
                            >
                              <span className="animate-slow-pulse-text">{pot.risk}</span>
                            </Badge>
                          </div>
                          <div className={`text-xs mt-1 ${selectedPot === pot.id ? 'text-white/90' : 'text-muted-foreground'}`}>
                            {pot.description}
                          </div>
                        </div>
                      )}
                    </Button>
                  )
                })}
              </div>

              {/* Categories */}
              {isLeftSidebarOpen && (
                <div className="space-y-2">
                  <Separator />
                  <div className="text-sm font-medium">Categories</div>
                  {potCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold">JackRoll</h1>
                <p className="text-sm text-muted-foreground">
                  {potTypes.find(p => p.id === selectedPot)?.name || "Select a game mode"}
                </p>
              </div>
              {!isLeftSidebarOpen && (
                <div className="flex gap-1">
                  {potCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-xs"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <Users className="h-3 w-3" />
                1,247 online
              </Badge>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                $12.5k in pots
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6">
                {children || (
                  <div className="space-y-6">
                    {/* Active Pots Grid */}
                    <div>
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold">
                          {potTypes.find(p => p.id === selectedPot)?.name} - {potCategories.find(c => c.id === selectedCategory)?.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedPot === "degen" ? "Safe swaps - you always get 1 NFT back" : "Winner takes all - high risk, high reward"}
                        </p>
                      </div>
                      
                      {/* Pots Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Mock Pot Cards */}
                        {Array.from({ length: 12 }, (_, i) => (
                          <Card key={i} className="h-fit hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Pot #{i + 1}</CardTitle>
                                <Badge variant={i % 4 === 0 ? "default" : "secondary"}>
                                  {i % 4 === 0 ? "Full" : `${(i % 3) + 1}/3`}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* NFT Slots */}
                              <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 3 }, (_, j) => (
                                  <div 
                                    key={j} 
                                    className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-xs
                                      ${j < ((i % 3) + 1) 
                                        ? 'bg-primary/10 border-primary' 
                                        : 'bg-muted border-muted-foreground/20'
                                      }`}
                                  >
                                    {j < ((i % 3) + 1) ? '🖼️' : '?'}
                                  </div>
                                ))}
                              </div>
                              
                              {/* Pot Value */}
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Total Value</div>
                                <div className="font-semibold">{((i * 0.3) + 0.1).toFixed(2)} ETH</div>
                              </div>
                              
                              {/* Action Button */}
                              <Button 
                                className="w-full" 
                                variant={i % 4 === 0 ? "secondary" : "default"}
                                disabled={i % 4 === 0}
                              >
                                {i % 4 === 0 ? "Rolling..." : "Join Pot"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right Sidebar - Chat (Fixed) */}
        <div className="w-80 border-l border-border bg-card flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Global Chat</h3>
              <Badge variant="secondary" className="gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="animate-slow-pulse-text">Live</span>
              </Badge>
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {dummyChatMessages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{msg.user}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-sm bg-muted p-2 rounded-md">{msg.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-4 border-t border-border flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="h-16 border-t border-border bg-card px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium">JackRoll</div>
          <div className="flex items-center gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Discord</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Docs</a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ConnectWallet />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}