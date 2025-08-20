# Jackroll - NFT Gaming dApp Technical Specification

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack & Infrastructure](#technical-stack--infrastructure)
3. [User Authentication & Profile System](#user-authentication--profile-system)
4. [Architecture & Development Approach](#architecture--development-approach)
5. [User Interface Design](#user-interface-design)
6. [Pot System - Core Functionality](#pot-system---core-functionality)
7. [User Journey & Lifecycle](#user-journey--lifecycle)
8. [Randomness & Trust Architecture](#randomness--trust-architecture)
9. [Engagement & Retention Features](#engagement--retention-features)
10. [Scalability Considerations](#scalability-considerations)
11. [Development Roadmap](#development-roadmap)

---

## 1. Project Overview

### 1.1 Vision
Jackroll is a decentralized NFT gaming platform where users can participate in different types of "pots" by staking their NFTs for a chance to win other NFTs or lose it all. The platform operates on complete transparency with blockchain-verified randomness using Gelato VRF.

### 1.2 Key Features
- **Wallet-based authentication** via Privy.io supporting all EVM-compatible wallets
- **Two pot types**: Degen (safe swap) and Jacked (winner-takes-all)
- **Verified randomness** on-chain using Gelato VRF for complete transparency
- **Real-time chat** for community engagement
- **NFT verification** through OpenSea and Magic Eden integration
- **Shareable pot links** with unique IDs for social engagement
- **Interactive spinning wheel** during randomness generation

### 1.3 Development Environment
- **Network**: Ethereum Testnet (initially), future support for Monad
- **Target Audience**: NFT collectors and traders looking for gamified experiences
- **Development Approach**: UI/UX first, then smart contracts and logic implementation

---

## 2. Technical Stack & Infrastructure

### 2.1 Authentication
**Solution: Privy.io**
- Supports all EVM wallets
- Simple integration
- Excellent security practices
- Seamless user experience

### 2.2 Smart Contract Architecture
- Pot management contracts
- Gelato VRF integration for randomness
- NFT escrow functionality
- Winner distribution logic
- All operations must be on-chain for trust and credibility

### 2.3 Frontend Stack
- **Framework**: React/Next.js with TypeScript
- **Language**: TypeScript for type safety and better development experience
- **Styling**: Modern CSS frameworks for responsive design
- **Web3 Integration**: TypeScript-compatible Web3 libraries
- **Real-time Features**: WebSocket integration for live chat
- **Design System**: Component-driven architecture with TypeScript interfaces
- **Modern UI Framework**: Aligned with Gondi.xyz design principles

---

## 3. User Authentication & Profile System

### 3.1 Wallet-Based Identity System
**Core Philosophy: Your Wallet = Your Profile**

JackRoll uses a wallet-centric identity system where connecting your wallet creates your user profile. This approach ensures:
- **Decentralized Identity**: No traditional usernames/passwords - your wallet address is your identity
- **Cross-Platform Consistency**: Same identity across all Web3 platforms
- **Security**: Private key ownership provides maximum security
- **Transparency**: All actions are tied to verifiable on-chain addresses

### 3.2 Authentication Rules & Requirements

**🔐 Logged-In User Requirements:**
- ✅ **Wallet Connection Required**: Users MUST connect wallet to access core features
- ✅ **Chat Access**: Only wallet-connected users can participate in community chat
- ✅ **Pot Participation**: All pot interactions require wallet authentication
- ✅ **Profile Creation**: Wallet connection automatically creates user profile
- ✅ **Transaction Signing**: All interactions require wallet signature approval

**🚫 Guest User Limitations:**
- ❌ Cannot participate in chat
- ❌ Cannot enter pots or place NFTs
- ❌ Cannot view detailed pot information
- ❌ Limited to read-only browsing experience
- ❌ No social features or interactions

### 3.3 User Profile System

**Profile Components:**
- **Primary Identity**: Wallet address (abbreviated as 0x1234...5678)
- **Activity Stats**: 
  - Total pots entered
  - Win/loss ratio
  - Favorite pot types
  - Total volume traded
- **Social Features**:
  - Chat participation history
  - Friend connections (other wallet addresses)
  - Reputation score based on activity
- **NFT Portfolio**: Display connected wallet's NFT collection
- **Transaction History**: On-chain record of all pot participations

**Profile Benefits:**
- **Persistent Identity**: Profile follows you across sessions and devices
- **Trust Building**: Activity history builds reputation in community
- **Personalization**: UI adapts based on user preferences and history
- **Social Connections**: Build network of trusted trading partners

### 3.4 Security & Privacy Considerations

**Security Measures:**
- **Wallet Signature Verification**: All actions require cryptographic proof
- **Session Management**: Secure session handling with wallet state
- **Transaction Validation**: Smart contract validation for all interactions
- **Privacy Options**: Users can choose visibility levels for profile data

**Best Practices:**
- **Burner Wallets Recommended**: Use dedicated wallet for gaming activities
- **Hardware Wallet Support**: Full support for Ledger, Trezor, etc.
- **Multi-Wallet Support**: Easy switching between different wallet addresses
- **Logout Protection**: Secure logout clears all session data

---

## 4. Architecture & Development Approach

### 4.1 Development Philosophy
**UI/UX First Approach**
1. Complete visual design and user experience
2. Implement all frontend components and interactions
3. Add smart contract integration after UI is polished
4. Maintain modularity for easy integration

### 4.2 Core Design Principles

**1. Separation of Concerns**
- Domain Layer: Pure business logic
- Infrastructure Layer: External dependencies (Privy.io, Gelato VRF, APIs)
- Presentation Layer: UI components and user interactions

**2. TypeScript Best Practices**
- Strict type checking enabled
- Strong typing for all interfaces and components
- Type-safe API responses and blockchain interactions
- Interface-driven development for better maintainability

**3. Modular Structure**
- Core business logic modules
- Infrastructure integrations
- Reusable UI components
- Shared utilities and configurations

### 4.3 Development Strategy

**Phase 1: UI/UX Design & Implementation**
- Create comprehensive design system
- Build all UI components with shadcn + tailwind
- Implement user flows and interactions
- Polish animations and transitions

**Phase 2: Smart Contract & Logic Integration**
- Integrate Privy.io authentication
- Connect to smart contracts
- Implement Gelato VRF for randomness
- Add blockchain interactions

---

## 4. User Interface Design

### 4.1 Layout Structure

**Three-Column Layout:**
- **Left Sidebar**: Pot type selection and categories
- **Main Section**: Active pots grid display
- **Right Sidebar**: Live community chat
- **bottom footbar**: Have option to change to darkmode or light mode+ Link to jackroll socials.

### 4.2 Design System

**Modern Design Principles:**
- Clean, minimalist interface inspired by Gondi.xyz
- Smooth animations and micro-interactions
- Clear visual hierarchy
- Responsive design for all screen sizes

**Color Palette:**
- **Light Mode**: 
  - Primary: `#f7931a` (Bitcoin Orange)
  - Background: `#FFFFFF` (White)
  - Text and accents in orange tones
  
- **Dark Mode** (Default):
  - Primary: `#f7931a` (Bitcoin Orange)
  - Background: `#000000` (Black)
  - Orange accents throughout

**Visual States for Pots:**
- **Empty**: Muted appearance with subtle border
- **Partially Filled**: Progressive fill animation
- **Nearly Full**: Pulsing glow effect
- **Full**: Trigger spinning wheel animation
- **Randomizing**: Wheel of Fortune style spinner
  - Smooth physics-based spinning
  - Dramatic slowdown with suspense
  - Celebration effects for winner

### 4.3 UI Inspiration & Guidelines
- **Reference**: Gondi.xyz for clean, modern Web3 aesthetics
- **Design Philosophy**: Apple-inspired clean UI/UX design across the entire application
- **Typography**: Helvetica Now for premium, crisp readability with spurless G and straight-legged R variants
- **Spacing**: Generous whitespace for clarity and breathing room
- **Components**: Card-based design with subtle shadows/borders
- **Interactions**: Smooth hover states and micro-interactions
- **Visual Hierarchy**: Clear, minimalist interface with strong attention to detail
- **Font Smoothing**: Anti-aliased text rendering for premium feel

---

## 5. Pot System - Core Functionality

### 5.1 Pot Types Overview

| Feature | Degen Pot (Safe) | Jacked Pot (High Risk) |
|---------|------------------|---------------------------|
| Risk Level | Low - Always receive 1 NFT back | High - Winner takes all |
| Outcome | 1 NFT in → 1 NFT out (shuffled) | 3 NFTs in → 1 winner gets all 3 |
| Categories | Low Tier (<1 ETH), High Stakes (≥1 ETH) | Low Tier (<1 ETH), High Stakes (≥1 ETH) |

### 5.2 Degen Pot Mechanics
- **Entry**: User deposits 1 verified NFT
- **Outcome**: Guaranteed to receive 1 NFT back (yours or another participant's)
- **Fairness**: Equal probability via Gelato VRF
- **Risk**: Value variance only

### 5.3 Jacked Pot Mechanics - Redesigned for Scale

**Queue-Based System for High Demand:**
- **Entry Queue**: Users join a global queue for their preferred tier
- **Automatic Matching**: System creates pots of 3 from the queue
- **Fair Ordering**: First-come, first-served with on-chain timestamps
- **Instant Pot Creation**: As soon as 3 compatible NFTs are queued

**Entry Process:**
1. User selects NFT and joins tier-specific queue
2. Clear risk warning with typed confirmation
3. Smart contract locks NFT and records queue position
4. Real-time queue position display
5. Auto-match when 2 other compatible NFTs join

**Benefits of Queue System:**
- Handles unlimited concurrent users
- No racing for limited pots
- Fair and transparent ordering
- Reduces gas wars
- Better user experience

### 5.4 Pot Management Rules

**Degen Pots:**
- Maintain 10-15 visible pots per tier
- Auto-generate new pots as they fill
- No time limits - organic filling
- Shareable pot IDs for social engagement

**Jacked Pots:**
- Queue-based with no visible pot limit
- Show queue depth and estimated wait time
- Optional: VIP queue for high-volume users
- Leaderboard for biggest wins

### 5.5 NFT Verification & Pricing
- **Primary Sources**: OpenSea and Magic Eden APIs
- **Verification**: Blue checkmark for verified collections
- **Price Tiers**: Automatic categorization based on floor price
- **Cross-chain Support**: Ethereum, Polygon, and future chains

---

## 6. User Journey & Lifecycle

### 6.1 First-Time User Flow

1. **Landing Page** → Modern, engaging interface showcasing active pots
2. **Connect Wallet** → One-click Privy.io integration
3. **Security Notice** → Clear warning about using burner wallets and restricted jurisdictions
4. **Main Dashboard** → View all pot types and active games
5. **Choose Path** → Select between Degen (safe) or Jacked (high-risk) pots

### 6.2 Pot Participation Flow

**Degen Pot Flow:**
1. Browse available pots or create new one
2. Select NFT from wallet
3. Join pot with single transaction
4. Watch real-time as pot fills
5. Experience spinning wheel animation
6. Receive your NFT outcome

**Jacked Pot Flow (Queue System):**
1. Select tier (Low/High Stakes)
2. View current queue status
3. Select NFT and acknowledge risk
4. Join queue with on-chain transaction
5. Monitor queue position in real-time
6. Auto-matched when 3 participants ready
7. Watch dramatic winner selection
8. Celebrate or commiserate in chat

### 6.3 Social Features
- Share pot links with unique IDs
- Live chat during pot resolution
- Winner announcements and celebrations
- Stats tracking and leaderboards

---

## 7. Randomness & Trust Architecture

### 7.1 Critical Foundation
**All operations MUST be on-chain** - This is non-negotiable for platform credibility and trust. Every action, from pot entry to winner selection, must be verifiable on the blockchain.

### 7.2 Gelato VRF - Exclusive Randomness Solution

**Why Gelato VRF:**
- Proven verifiable randomness on-chain
- Cost-effective compared to alternatives
- Fast and reliable execution
- Fully decentralized and transparent
- No other VRF solution will be considered

**Implementation Flow:**
1. **Pot Completion** → Smart contract detects 3/3 participants
2. **Lock State** → No new entries, pot is sealed
3. **VRF Request** → Automatic request to Gelato network
4. **Random Generation** → Gelato provides verifiable random number
5. **Winner Selection** → Smart contract uses randomness to pick winner
6. **Distribution** → Automatic NFT transfer to winner

### 7.3 Trust Features
- Every random number verifiable on-chain
- Public audit trail for all pots
- Open-source smart contracts
- Real-time blockchain verification
- No backend manipulation possible

---

## 8. Engagement & Retention Features

### 8.1 Gamification Elements
- **Daily Streaks**: Bonus rewards for consecutive daily plays
- **XP System**: Earn experience points for each pot participation
- **Achievements**: 
  - "First Win" - Win your first pot
  - "High Roller" - Enter 10 high-stakes pots
  - "Lucky Seven" - Win 7 pots total
  - "Social Butterfly" - Share 5 pots with friends
- **Leaderboards**: Weekly/Monthly rankings by wins, volume, streak

### 8.2 Social Features
- **Pot Sharing**: 
  - Custom invite links with pot ID
  - Social media integration (Twitter/X share cards)
  - Discord/Telegram notifications
- **Friend System**: 
  - Follow other players
  - See friends' recent activity
  - Private pots for friend groups
- **Spectator Mode**: Watch live pot fills and spins

### 8.3 Reward Mechanisms
- **Loyalty Points**: Earn points for platform activity
- **Fee Discounts**: Reduced fees based on activity level
- **Exclusive Pots**: Special pots for high-activity users
- **NFT Drops**: Periodic airdrops to active users

---

## 9. Scalability Considerations

### 9.1 Concurrent User Challenges
**Problem**: Handling 1000+ simultaneous users competing for limited pots

**Solutions**:
1. **Queue System**
   - Fair ordering for pot entry
   - Prevents front-running

2. **Dynamic Pot Generation**
   - Increase pot availability based on demand
   - Multiple pot rooms/instances

3. **Gas Optimization**
   - Batch transactions where possible
   - Efficient smart contract design

### 9.2 Performance Optimization
- CDN for static assets
- WebSocket connection pooling
- Efficient state management
- Caching strategies for NFT metadata

---

## 10. Development Roadmap

### Phase 1: UI/UX Design & Implementation (Weeks 1-4)
- [ ] Comprehensive design system following Gondi aesthetic
- [ ] Figma mockups for all screens and states
- [ ] Component library with all UI elements
- [ ] Light/dark theme implementation
- [ ] Responsive layouts for all devices
- [ ] Spinning wheel animation prototypes
- [ ] Queue visualization for Jacked pots
- [ ] Interactive prototype with all user flows

### Phase 2: Frontend Development (Weeks 5-7)
- [ ] Next.js project setup with TypeScript configuration
- [ ] Strict TypeScript settings and ESLint rules
- [ ] Type definitions for all interfaces and components
- [ ] Implement all UI components with proper typing
- [ ] Mock data integration with TypeScript interfaces
- [ ] Animation implementations
- [ ] State management setup with typed stores
- [ ] Chat UI (frontend only)
- [ ] Complete UI with no blockchain integration

### Phase 3: Smart Contract Development (Weeks 8-11)
- [ ] Pot management contracts
- [ ] Queue system for Jacked pots
- [ ] Gelato VRF integration
- [ ] NFT escrow and distribution
- [ ] Security measures and testing
- [ ] Testnet deployment

### Phase 4: Integration Phase (Weeks 12-14)
- [ ] Privy.io wallet integration
- [ ] Connect frontend to smart contracts
- [ ] OpenSea/Magic Eden API integration
- [ ] Real-time updates via events
- [ ] Chat system backend
- [ ] Comprehensive testing

### Phase 5: Polish & Launch (Weeks 15-16)
- [ ] Security audit
- [ ] Performance optimization
- [ ] Beta testing program
- [ ] Bug fixes and refinements
- [ ] Mainnet deployment

---

## Development Workflow

### Feature Branch Strategy
Each new feature or major change should be developed on a separate branch to maintain code quality and enable collaborative development:

1. **Create Feature Branch**: `git checkout -b feature/feature-name`
2. **Development**: Make changes and commits on the feature branch
3. **Testing**: Ensure all tests pass and code meets quality standards
4. **Pull Request**: Create PR to merge into main branch
5. **Code Review**: Team review and approval process
6. **Merge**: Integrate feature into main codebase

**Branch Naming Convention:**
- `feature/wallet-integration` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/update-readme` - Documentation updates

---

## Next Steps

1. **Create Comprehensive UI/UX Design**
   - Develop complete Figma designs
   - Define all user interactions
   - Create style guide and component library
   - Design responsive layouts

2. **Build Frontend Without Blockchain**
   - Implement all UI components
   - Create smooth animations
   - Build with mock data
   - Perfect the user experience

3. **Smart Contract Development**
   - Design efficient contract architecture
   - Implement Gelato VRF
   - Build queue system for scale
   - Ensure all operations on-chain

4. **Integration & Testing**
   - Connect all systems
   - Extensive testing on testnet
   - Security audit
   - Performance optimization

---

*This specification prioritizes user experience through UI/UX-first development, ensuring a polished interface before blockchain integration.*