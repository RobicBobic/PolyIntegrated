import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Activity, DollarSign, Users, ChevronRight, Search, Menu, X,
  Shield, Zap, Globe, BarChart3, Wallet, Trophy, Clock, Star,
  CheckCircle, ArrowUpRight, ArrowDownRight, Eye, MessageCircle,
  Award, Target, Flame, TrendingDown, Lock, Unlock, Bell, Settings, ChevronDown
} from 'lucide-react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('trending');
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [showMarketModal, setShowMarketModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ title: '', content: '' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if Phantom wallet is already connected
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } catch (error) {
        console.log('Wallet not connected');
      }
    };
    checkIfWalletIsConnected();
  }, []);

  // Show info modal
  const showInfo = (title, content) => {
    setInfoModalContent({ title, content });
    setShowInfoModal(true);
  };

  // Connect Phantom Wallet
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const { solana } = window;
      
      if (!solana || !solana.isPhantom) {
        showInfo('Install Phantom Wallet', 
          'Phantom wallet is not installed. Phantom is a crypto wallet for Solana. Click below to install it from the official website.'
        );
        setTimeout(() => {
          window.open('https://phantom.app/', '_blank');
        }, 2000);
        setIsConnecting(false);
        return;
      }

      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showInfo('Connection Failed', 'Failed to connect wallet. Please make sure Phantom is unlocked and try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect Wallet
  const disconnectWallet = async () => {
    try {
      const { solana } = window;
      if (solana) {
        await solana.disconnect();
        setWalletAddress(null);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Handle market selection
  const openMarket = (market) => {
    setSelectedMarket(market);
    setShowMarketModal(true);
  };

  // Handle trading (placeholder)
  const handleTrade = (market, position) => {
    if (!walletAddress) {
      showInfo('Connect Wallet Required', 
        'Please connect your Phantom wallet to start trading. Click the "Connect Phantom" button in the top navigation.'
      );
      return;
    }
    
    showInfo(`Trade ${position} - ${market.title}`, 
      `You're about to buy ${position} shares at ${position === 'YES' ? market.yesPrice : market.noPrice}¢ per share.\n\nMarket ends: ${market.endDate}\nCurrent volume: ${market.volume}\n\nThis is a demo. In production, this would process your trade on the Solana blockchain.`
    );
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const categories = ['All', 'Politics', 'Crypto', 'Sports', 'Tech', 'Finance', 'Entertainment', 'Science', 'Business'];

  const markets = [
    {
      id: 1,
      title: 'Will BTC reach $120K by Q2 2026?',
      category: 'Crypto',
      yesPrice: 67,
      noPrice: 33,
      volume: '$2.4M',
      traders: 1247,
      trending: true,
      liquidity: '$890K',
      endDate: 'Jun 30, 2026'
    },
    {
      id: 2,
      title: 'Next Fed Interest Rate Decision',
      category: 'Finance',
      yesPrice: 45,
      noPrice: 55,
      volume: '$1.8M',
      traders: 892,
      liquidity: '$650K',
      endDate: 'Mar 15, 2026'
    },
    {
      id: 3,
      title: 'AI Regulation Bill Passage in 2026',
      category: 'Tech',
      yesPrice: 58,
      noPrice: 42,
      volume: '$950K',
      traders: 634,
      trending: true,
      liquidity: '$420K',
      endDate: 'Dec 31, 2026'
    },
    {
      id: 4,
      title: 'US Presidential Approval Rating Above 50%',
      category: 'Politics',
      yesPrice: 38,
      noPrice: 62,
      volume: '$3.1M',
      traders: 2103,
      liquidity: '$1.2M',
      endDate: 'Feb 28, 2026'
    },
    {
      id: 5,
      title: 'S&P 500 New All-Time High by March',
      category: 'Finance',
      yesPrice: 72,
      noPrice: 28,
      volume: '$1.2M',
      traders: 756,
      liquidity: '$540K',
      endDate: 'Mar 31, 2026'
    },
    {
      id: 6,
      title: 'Super Bowl LVIII Winner Prediction',
      category: 'Sports',
      yesPrice: 51,
      noPrice: 49,
      volume: '$890K',
      traders: 1456,
      trending: true,
      liquidity: '$380K',
      endDate: 'Feb 09, 2026'
    },
    {
      id: 7,
      title: 'Ethereum 2.0 Upgrade Complete by Q3',
      category: 'Crypto',
      yesPrice: 63,
      noPrice: 37,
      volume: '$1.5M',
      traders: 982,
      liquidity: '$720K',
      endDate: 'Sep 30, 2026'
    },
    {
      id: 8,
      title: 'Major Tech IPO Valuation Over $100B',
      category: 'Business',
      yesPrice: 41,
      noPrice: 59,
      volume: '$780K',
      traders: 567,
      liquidity: '$310K',
      endDate: 'Dec 31, 2026'
    },
    {
      id: 9,
      title: 'NASA Mars Mission Launch Success',
      category: 'Science',
      yesPrice: 78,
      noPrice: 22,
      volume: '$650K',
      traders: 445,
      trending: true,
      liquidity: '$280K',
      endDate: 'Nov 15, 2026'
    },
    {
      id: 10,
      title: 'Netflix Subscribers Reach 300M',
      category: 'Entertainment',
      yesPrice: 55,
      noPrice: 45,
      volume: '$920K',
      traders: 823,
      liquidity: '$410K',
      endDate: 'Dec 31, 2026'
    },
    {
      id: 11,
      title: 'Electric Vehicle Sales Surpass 20M Units',
      category: 'Business',
      yesPrice: 69,
      noPrice: 31,
      volume: '$1.1M',
      traders: 691,
      liquidity: '$490K',
      endDate: 'Dec 31, 2026'
    },
    {
      id: 12,
      title: 'Gold Price Above $2500/oz by Year End',
      category: 'Finance',
      yesPrice: 47,
      noPrice: 53,
      volume: '$840K',
      traders: 512,
      liquidity: '$360K',
      endDate: 'Dec 31, 2026'
    }
  ];

  const stats = [
    { icon: DollarSign, label: 'Total Volume', value: '$847M', change: '+12.4%' },
    { icon: Users, label: 'Active Traders', value: '142K', change: '+8.2%' },
    { icon: Activity, label: 'Live Markets', value: '1,248', change: '+24' },
    { icon: TrendingUp, label: '24h Volume', value: '$12.4M', change: '+18.9%' }
  ];

  const leaderboard = [
    { rank: 1, user: 'CryptoWhale', profit: '+$124,567', trades: 342, winRate: '78%', badge: 'gold' },
    { rank: 2, user: 'MarketMaster', profit: '+$98,234', trades: 289, winRate: '75%', badge: 'silver' },
    { rank: 3, user: 'TrendSeeker', profit: '+$87,901', trades: 256, winRate: '72%', badge: 'bronze' },
    { rank: 4, user: 'BullRunner', profit: '+$76,543', trades: 234, winRate: '71%', badge: 'regular' },
    { rank: 5, user: 'DiamondHands', profit: '+$65,432', trades: 198, winRate: '69%', badge: 'regular' }
  ];

  const recentActivity = [
    { user: 'Alex_Trader', action: 'bought YES', market: 'BTC reach $120K', amount: '$5,200', time: '2m ago' },
    { user: 'Sarah_M', action: 'bought NO', market: 'Fed Interest Rate', amount: '$3,800', time: '5m ago' },
    { user: 'CryptoKing', action: 'bought YES', market: 'AI Regulation Bill', amount: '$8,500', time: '8m ago' },
    { user: 'MarketPro', action: 'bought YES', market: 'S&P 500 ATH', amount: '$12,000', time: '12m ago' },
    { user: 'TradeMaster', action: 'bought NO', market: 'Presidential Approval', amount: '$6,700', time: '15m ago' }
  ];

  const news = [
    { 
      title: 'Bitcoin Reaches New Monthly High',
      category: 'Crypto',
      time: '1 hour ago',
      source: 'CryptoNews'
    },
    { 
      title: 'Federal Reserve Hints at Rate Changes',
      category: 'Finance',
      time: '3 hours ago',
      source: 'Bloomberg'
    },
    { 
      title: 'AI Companies Face New Regulatory Pressure',
      category: 'Tech',
      time: '5 hours ago',
      source: 'TechCrunch'
    },
    { 
      title: 'Super Bowl Betting Reaches Record Levels',
      category: 'Sports',
      time: '6 hours ago',
      source: 'ESPN'
    }
  ];

  const filteredMarkets = selectedCategory === 'All' 
    ? markets 
    : markets.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-green-50 font-sans overflow-x-hidden scanline-effect bg-grid">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex: 0}}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3,
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-green-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <img 
                src="/logo.png" 
                alt="Poly Integrated" 
                className="h-8 md:h-10 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <div className="hidden lg:flex space-x-6">
                <button onClick={() => scrollToSection('markets')} className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  Markets
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('leaderboard')} className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  Leaderboard
                </button>
                <button onClick={() => scrollToSection('activity')} className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  Activity
                </button>
                <button onClick={() => scrollToSection('news')} className="text-green-400 hover:text-green-300 transition-colors font-medium">
                  News
                </button>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Bell 
                className="text-green-400 cursor-pointer hover:text-green-300 transition-colors" 
                size={20}
                onClick={() => showInfo('Notifications', 
                  'Stay updated with real-time notifications about:\n\n• Market outcomes and settlements\n• Price movements on your positions\n• New markets in your favorite categories\n• Leaderboard rank changes\n• Trading activity from top traders\n\nEnable notifications in your account settings once you connect your wallet.'
                )}
              />
              <Settings 
                className="text-green-400 cursor-pointer hover:text-green-300 transition-colors" 
                size={20}
                onClick={() => showInfo('Settings', 
                  'Customize your trading experience:\n\n• Default trade size preferences\n• Notification preferences\n• Favorite market categories\n• Display currency (USD/Crypto)\n• Theme customization\n• Privacy settings\n\nConnect your wallet to access full settings.'
                )}
              />
              
              {walletAddress ? (
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-mono text-sm">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </div>
                  <button 
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-400 transition-all font-semibold glow-border disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Wallet size={18} />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Phantom'}</span>
                </button>
              )}
            </div>
            
            <button 
              className="md:hidden text-green-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 border-t border-green-500/20 slide-in">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('markets')} className="block w-full text-left text-green-400 hover:text-green-300 py-2">Markets</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-green-400 hover:text-green-300 py-2">How It Works</button>
              <button onClick={() => scrollToSection('leaderboard')} className="block w-full text-left text-green-400 hover:text-green-300 py-2">Leaderboard</button>
              <button onClick={() => scrollToSection('activity')} className="block w-full text-left text-green-400 hover:text-green-300 py-2">Activity</button>
              <button onClick={() => scrollToSection('news')} className="block w-full text-left text-green-400 hover:text-green-300 py-2">News</button>
              
              {walletAddress ? (
                <>
                  <div className="w-full px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-mono text-sm text-center mt-2">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </div>
                  <button 
                    onClick={disconnectWallet}
                    className="w-full px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg"
                  >
                    Disconnect Wallet
                  </button>
                </>
              ) : (
                <button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full px-4 py-2 bg-green-500 text-black rounded-lg font-semibold disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Phantom'}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        
        {/* Radial Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6">
              PREDICT THE FUTURE
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-green-300 mb-8 font-light tracking-wide">
              Trade on real-world events with crypto-powered prediction markets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search markets..." 
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    if (searchTerm) {
                      const category = categories.find(cat => 
                        cat.toLowerCase().includes(searchTerm)
                      );
                      if (category) setSelectedCategory(category);
                    }
                  }}
                  className="pl-12 pr-4 py-3 w-80 bg-black/60 border border-green-500/50 rounded-lg text-green-100 placeholder-green-600 focus:outline-none focus:border-green-400 glow-border"
                />
                <Search className="absolute left-4 top-3.5 text-green-500" size={20} />
              </div>
              <button 
                onClick={() => scrollToSection('markets')}
                className="px-8 py-3 bg-green-500 text-black rounded-lg font-bold hover:bg-green-400 transition-all glow-border flex items-center space-x-2"
              >
                <span>Explore Markets</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 fade-in" style={{animationDelay: '0.2s'}}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="gradient-border rounded-xl p-6 glow-hover backdrop-blur-lg shadow-glow relative overflow-hidden group"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" size={32} />
                    <span className="text-green-400 text-sm font-medium px-3 py-1 bg-green-500/20 rounded-full border border-green-500/40">{stat.change}</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold mb-1 number-ticker">
                    {stat.value}
                  </div>
                  <div className="text-green-600 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">
            HOW IT WORKS
          </h3>
          <p className="text-xl text-green-400 max-w-3xl mx-auto">
            Start predicting real-world events in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="gradient-border rounded-xl p-8 text-center fade-in glow-hover">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-border">
              <Wallet className="text-green-400" size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-3 text-green-300">Connect Wallet</h4>
            <p className="text-green-600">
              Link your crypto wallet to get started with secure, decentralized trading
            </p>
          </div>

          <div className="gradient-border rounded-xl p-8 text-center fade-in glow-hover" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-border">
              <Search className="text-green-400" size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-3 text-green-300">Browse Markets</h4>
            <p className="text-green-600">
              Explore thousands of prediction markets across politics, crypto, sports, and more
            </p>
          </div>

          <div className="gradient-border rounded-xl p-8 text-center fade-in glow-hover" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-border">
              <Target className="text-green-400" size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-3 text-green-300">Make Predictions</h4>
            <p className="text-green-600">
              Buy YES or NO shares based on your belief about future outcomes
            </p>
          </div>

          <div className="gradient-border rounded-xl p-8 text-center fade-in glow-hover" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-border">
              <Trophy className="text-green-400" size={32} />
            </div>
            <h4 className="text-xl font-display font-bold mb-3 text-green-300">Earn Rewards</h4>
            <p className="text-green-600">
              Collect profits when your predictions are correct and climb the leaderboard
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        <div className="relative">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">
              WHY POLY INTEGRATED?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gradient-border rounded-xl p-8 fade-in glow-hover">
              <Shield className="text-green-400 mb-4" size={40} />
              <h4 className="text-2xl font-display font-bold mb-3 text-green-300">Decentralized</h4>
              <p className="text-green-600 leading-relaxed">
                Powered by blockchain technology, ensuring transparency and security. Your trades are verifiable and trustless.
              </p>
            </div>

            <div className="gradient-border rounded-xl p-8 fade-in glow-hover" style={{animationDelay: '0.1s'}}>
              <Zap className="text-green-400 mb-4" size={40} />
              <h4 className="text-2xl font-display font-bold mb-3 text-green-300">Instant Trades</h4>
              <p className="text-green-600 leading-relaxed">
                Lightning-fast execution with real-time price discovery. Buy and sell positions instantly without delays.
              </p>
            </div>

            <div className="gradient-border rounded-xl p-8 fade-in glow-hover" style={{animationDelay: '0.2s'}}>
              <Globe className="text-green-400 mb-4" size={40} />
              <h4 className="text-2xl font-display font-bold mb-3 text-green-300">Global Access</h4>
              <p className="text-green-600 leading-relaxed">
                Trade 24/7 from anywhere in the world. Participate in global markets with no restrictions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Section */}
      <div id="markets" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h3 className="text-4xl font-display font-bold mb-2">LIVE MARKETS</h3>
            <p className="text-green-500">Trade on {markets.length}+ active prediction markets</p>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'trending'
                  ? 'bg-green-500 text-black glow-border'
                  : 'bg-black/40 text-green-400 border border-green-500/30 hover:border-green-500/60'
              }`}
            >
              <Flame size={18} />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('high-volume')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                activeTab === 'high-volume'
                  ? 'bg-green-500 text-black glow-border'
                  : 'bg-black/40 text-green-400 border border-green-500/30 hover:border-green-500/60'
              }`}
            >
              <BarChart3 size={18} />
              <span>High Volume</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-green-500 text-black glow-border'
                    : 'bg-black/40 text-green-400 border border-green-500/30 hover:border-green-500/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market, index) => (
            <div 
              key={market.id}
              className="gradient-border rounded-xl p-6 glow-hover market-card cursor-pointer fade-in relative overflow-hidden group backdrop-blur-lg"
              style={{animationDelay: `${0.05 * index}s`}}
              onClick={() => openMarket(market)}
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 blur-2xl group-hover:bg-green-500/20 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/40 backdrop-blur-sm">
                    {market.category}
                  </span>
                  {market.trending && (
                    <div className="flex items-center space-x-1 text-green-400 pulse-glow px-2 py-1 bg-green-500/20 rounded-full border border-green-500/40">
                      <TrendingUp size={16} />
                      <span className="text-xs font-semibold">Trending</span>
                    </div>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold mb-4 text-green-50 leading-tight min-h-[3rem] group-hover:text-green-300 transition-colors">
                  {market.title}
                </h4>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrade(market, 'YES');
                    }}
                    className="px-4 py-3 rounded-lg bg-green-500/20 border-2 border-green-500/40 hover:bg-green-500/30 hover:border-green-500/60 transition-all group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative">
                      <div className="text-xs text-green-600 mb-1 group-hover/btn:text-green-500 transition-colors font-semibold">YES</div>
                      <div className="text-2xl font-display font-bold text-green-400 group-hover/btn:scale-110 transition-transform">{market.yesPrice}¢</div>
                    </div>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrade(market, 'NO');
                    }}
                    className="px-4 py-3 rounded-lg bg-red-500/20 border-2 border-red-500/40 hover:bg-red-500/30 hover:border-red-500/60 transition-all group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative">
                      <div className="text-xs text-red-600 mb-1 group-hover/btn:text-red-500 transition-colors font-semibold">NO</div>
                      <div className="text-2xl font-display font-bold text-red-400 group-hover/btn:scale-110 transition-transform">{market.noPrice}¢</div>
                    </div>
                  </button>
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between text-green-600 py-1 px-2 rounded bg-black/20">
                    <span className="flex items-center space-x-2">
                      <DollarSign size={14} className="text-green-500" />
                      <span className="font-medium">Volume:</span>
                    </span>
                    <span className="text-green-400 font-semibold">{market.volume}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600 py-1 px-2 rounded bg-black/20">
                    <span className="flex items-center space-x-2">
                      <Users size={14} className="text-green-500" />
                      <span className="font-medium">Traders:</span>
                    </span>
                    <span className="text-green-400 font-semibold">{market.traders}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600 py-1 px-2 rounded bg-black/20">
                    <span className="flex items-center space-x-2">
                      <Activity size={14} className="text-green-500" />
                      <span className="font-medium">Liquidity:</span>
                    </span>
                    <span className="text-green-400 font-semibold">{market.liquidity}</span>
                  </div>
                  <div className="flex items-center justify-between text-green-600 py-1 px-2 rounded bg-black/20">
                    <span className="flex items-center space-x-2">
                      <Clock size={14} className="text-green-500" />
                      <span className="font-medium">Ends:</span>
                    </span>
                    <span className="text-green-400 font-semibold">{market.endDate}</span>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openMarket(market);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-500/10 to-green-500/20 border border-green-500/40 rounded-lg text-green-400 hover:from-green-500/20 hover:to-green-500/30 hover:border-green-500/60 transition-all flex items-center justify-center space-x-2 font-semibold relative overflow-hidden group/trade"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent translate-x-[-100%] group-hover/trade:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative">Trade Now</span>
                  <ChevronRight size={18} className="relative group-hover/trade:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('trending');
              scrollToSection('markets');
            }}
            className="px-8 py-4 bg-green-500 text-black rounded-lg font-bold hover:bg-green-400 transition-all glow-border text-lg"
          >
            View All {markets.length} Markets
          </button>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-4">
            TOP TRADERS
          </h3>
          <p className="text-xl text-green-400">Compete with the best prediction market traders worldwide</p>
        </div>

        <div className="gradient-border rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            {leaderboard.map((trader, index) => (
              <div 
                key={trader.rank}
                className="flex items-center justify-between p-6 bg-black/40 border border-green-500/20 rounded-xl hover:border-green-500/50 transition-all cursor-pointer fade-in"
                style={{animationDelay: `${0.1 * index}s`}}
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-xl
                    ${trader.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-500/50' : 
                      trader.rank === 2 ? 'bg-gray-400/20 text-gray-300 border-2 border-gray-400/50' :
                      trader.rank === 3 ? 'bg-orange-600/20 text-orange-400 border-2 border-orange-600/50' :
                      'bg-green-500/20 text-green-400 border border-green-500/40'}`}>
                    #{trader.rank}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${trader.rank === 1 ? 'bg-yellow-500/30' : 
                      trader.rank === 2 ? 'bg-gray-400/30' :
                      trader.rank === 3 ? 'bg-orange-600/30' :
                      'bg-green-500/30'}`}>
                    {trader.rank <= 3 ? <Trophy className="text-green-300" size={20} /> : <Star className="text-green-400" size={20} />}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-100">{trader.user}</div>
                    <div className="text-sm text-green-600">{trader.trades} trades • {trader.winRate} win rate</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-green-400">{trader.profit}</div>
                  <div className="text-sm text-green-600">Total Profit</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => showInfo('Full Leaderboard', 
                'Top 100 Traders Rankings\n\nCompete with the best prediction market traders worldwide. The leaderboard is updated in real-time based on:\n\n• Total profit/loss\n• Win rate percentage\n• Number of trades\n• Market accuracy\n• Consistency score\n\nRankings reset monthly. Top 10 traders receive exclusive rewards and badges.\n\nConnect your wallet and start trading to join the leaderboard!'
              )}
              className="px-8 py-3 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400 hover:bg-green-500/30 transition-all font-semibold"
            >
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Activity + News */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Activity */}
          <div id="activity">
            <h3 className="text-3xl font-display font-bold mb-8 flex items-center space-x-3">
              <Activity className="text-green-400" />
              <span>RECENT ACTIVITY</span>
            </h3>
            
            <div className="gradient-border rounded-xl p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-4 bg-black/40 border border-green-500/10 rounded-lg hover:border-green-500/30 transition-all fade-in"
                  style={{animationDelay: `${0.05 * index}s`}}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-green-400 font-semibold">{activity.user}</span>
                      <span className="text-green-600 text-sm">{activity.action}</span>
                    </div>
                    <div className="text-green-100 text-sm mb-2">{activity.market}</div>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-green-500 font-semibold">{activity.amount}</span>
                      <span className="text-green-700">{activity.time}</span>
                    </div>
                  </div>
                  <div className={activity.action.includes('YES') ? 'text-green-400' : 'text-red-400'}>
                    {activity.action.includes('YES') ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => showInfo('Live Trading Activity', 
                  'Real-Time Market Activity Feed\n\nSee what traders are doing right now:\n\n• Recent buy/sell orders\n• Large position movements\n• Market sentiment indicators\n• Popular trading pairs\n• Volume spikes and trends\n\nFollow top traders to get notified when they make moves. Use activity data to inform your trading strategy.\n\nActivity updates every 5 seconds.'
                )}
                className="w-full py-3 bg-green-500/10 border border-green-500/40 rounded-lg text-green-400 hover:bg-green-500/20 transition-all font-semibold mt-4"
              >
                View All Activity
              </button>
            </div>
          </div>

          {/* News Feed */}
          <div id="news">
            <h3 className="text-3xl font-display font-bold mb-8 flex items-center space-x-3">
              <MessageCircle className="text-green-400" />
              <span>MARKET NEWS</span>
            </h3>
            
            <div className="gradient-border rounded-xl p-6 space-y-4">
              {news.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => showInfo(item.title, 
                    `${item.title}\n\nCategory: ${item.category}\nSource: ${item.source}\nPublished: ${item.time}\n\nThis market-moving news could affect prediction outcomes. Stay informed about:\n\n• Regulatory changes\n• Major announcements\n• Industry developments\n• Economic indicators\n• Breaking news\n\nUse news insights to make better predictions and trade more profitably.`
                  )}
                  className="p-5 bg-black/40 border border-green-500/10 rounded-lg hover:border-green-500/30 transition-all cursor-pointer fade-in group"
                  style={{animationDelay: `${0.05 * index}s`}}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/40">
                      {item.category}
                    </span>
                    <span className="text-xs text-green-700">{item.time}</span>
                  </div>
                  <h4 className="text-green-100 font-semibold mb-2 group-hover:text-green-300 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600">{item.source}</span>
                    <Eye size={14} className="text-green-500" />
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => showInfo('Market News & Analysis', 
                  'Stay Ahead with Market Intelligence\n\nGet comprehensive coverage of:\n\n📊 Market Analysis\n• Expert predictions and insights\n• Technical analysis reports\n• Sentiment indicators\n\n📰 Breaking News\n• Real-time updates\n• Market-moving events\n• Regulatory announcements\n\n🎯 Trading Tips\n• Strategy guides\n• Risk management\n• Winning techniques\n\nSubscribe to news alerts to never miss important updates that could impact your positions.'
                )}
                className="w-full py-3 bg-green-500/10 border border-green-500/40 rounded-lg text-green-400 hover:bg-green-500/20 transition-all font-semibold mt-4"
              >
                Read More News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="gradient-border rounded-2xl p-12 md:p-16 text-center bg-grid relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-transparent"></div>
          <div className="relative">
            <h3 className="text-4xl md:text-6xl font-display font-black mb-6">
              START TRADING TODAY
            </h3>
            <p className="text-xl md:text-2xl text-green-300 mb-10 max-w-3xl mx-auto">
              Join thousands of traders predicting the future and earning rewards on Poly Integrated
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={connectWallet}
                disabled={isConnecting || walletAddress}
                className="px-10 py-4 bg-green-500 text-black rounded-lg font-bold hover:bg-green-400 transition-all glow-border text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet size={24} />
                <span>{walletAddress ? 'Wallet Connected' : isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="px-10 py-4 bg-black/60 text-green-400 border-2 border-green-500/50 rounded-lg font-bold hover:bg-green-500/10 transition-all text-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
          FREQUENTLY ASKED QUESTIONS
        </h3>
        
        <div className="space-y-4">
          {[
            {
              q: "What is a prediction market?",
              a: "Prediction markets allow you to trade shares that represent outcomes of future events. If you're correct, you profit!"
            },
            {
              q: "How do I get started?",
              a: "Simply connect your crypto wallet, browse markets, and buy YES or NO shares based on your predictions."
            },
            {
              q: "What fees do you charge?",
              a: "We charge a small 2% fee on winning trades. There are no fees for deposits or withdrawals."
            },
            {
              q: "Is my money safe?",
              a: "Yes! All funds are held in smart contracts on the blockchain, ensuring complete transparency and security."
            },
            {
              q: "Can I withdraw anytime?",
              a: "Absolutely. You can withdraw your funds at any time, subject to standard blockchain transaction times."
            }
          ].map((faq, index) => (
            <div 
              key={index}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="gradient-border rounded-xl p-6 fade-in glow-hover cursor-pointer"
              style={{animationDelay: `${0.05 * index}s`}}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-green-300 flex items-center space-x-2">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span>{faq.q}</span>
                </h4>
                <ChevronDown 
                  className={`text-green-400 transition-transform flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`}
                  size={20}
                />
              </div>
              {expandedFaq === index && (
                <p className="text-green-600 leading-relaxed pl-7 mt-3 fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-500/20 mt-20 py-16 bg-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-2xl mb-4">POLY INTEGRATED</h4>
              <p className="text-green-600 text-sm mb-6 leading-relaxed max-w-md">
                The world's leading decentralized prediction markets platform. Trade on real-world events with complete transparency and security powered by blockchain technology.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.open('https://twitter.com/', '_blank')}
                  className="w-10 h-10 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-all"
                  title="Follow us on X (Twitter)"
                >
                  <span className="text-green-400 font-bold text-sm">X</span>
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com/', '_blank')}
                  className="w-10 h-10 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-all"
                  title="Connect on LinkedIn"
                >
                  <span className="text-green-400 font-bold text-sm">in</span>
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-10 h-10 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-all"
                  title="Back to top"
                >
                  <Globe className="text-green-400" size={18} />
                </button>
                <button 
                  onClick={() => window.open('https://discord.com/', '_blank')}
                  className="w-10 h-10 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-all"
                  title="Join our Discord"
                >
                  <MessageCircle className="text-green-400" size={18} />
                </button>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-green-300 text-lg">Markets</h5>
              <div className="space-y-3 text-sm">
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Politics'); scrollToSection('markets'); }}>Politics</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Crypto'); scrollToSection('markets'); }}>Cryptocurrency</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Sports'); scrollToSection('markets'); }}>Sports</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Finance'); scrollToSection('markets'); }}>Finance</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Tech'); scrollToSection('markets'); }}>Technology</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => { setSelectedCategory('Entertainment'); scrollToSection('markets'); }}>Entertainment</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-green-300 text-lg">Resources</h5>
              <div className="space-y-3 text-sm">
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Documentation', 
                  'Getting Started with Poly Integrated\n\n📚 Quick Start Guide\n• Connect your wallet\n• Fund your account\n• Place your first trade\n• Understand market mechanics\n\n🔧 Platform Features\n• Market types and categories\n• Order types and execution\n• Settlement process\n• Fees and limits\n\n💡 Best Practices\n• Risk management strategies\n• Research techniques\n• Reading market indicators\n\nScroll to "How It Works" section to learn more!'
                )}>Documentation</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('API Reference', 
                  'Developer API Documentation\n\n🔌 REST API\n• Market data endpoints\n• Trading operations\n• Account management\n• WebSocket streams\n\n📊 Data Access\n• Real-time price feeds\n• Historical data\n• Market statistics\n• User portfolios\n\n🛠️ Integration\n• Authentication\n• Rate limits\n• Error handling\n• Code examples\n\nAPI keys available after wallet connection.'
                )}>API Reference</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => scrollToSection('faq')}>Help Center</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Blog', 
                  'Poly Integrated Blog\n\n📝 Latest Articles\n• Market analysis and insights\n• Trading strategies\n• Platform updates\n• Community highlights\n\n🎓 Educational Content\n• Beginner guides\n• Advanced techniques\n• Case studies\n• Expert interviews\n\n📈 Market Research\n• Trend analysis\n• Event predictions\n• Statistical studies\n\nNew articles published weekly!'
                )}>Blog</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Whitepaper', 
                  'Poly Integrated Whitepaper\n\n📄 Technical Overview\n• Platform architecture\n• Blockchain integration\n• Smart contract design\n• Security measures\n\n💰 Tokenomics\n• Token utility\n• Distribution model\n• Governance structure\n• Incentive mechanisms\n\n🎯 Vision & Roadmap\n• Project goals\n• Future developments\n• Community governance\n• Ecosystem growth\n\nBuilding the future of prediction markets!'
                )}>Whitepaper</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => scrollToSection('how-it-works')}>Tutorials</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-green-300 text-lg">Company</h5>
              <div className="space-y-3 text-sm">
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('About Poly Integrated', 
                  'About Us\n\nPoly Integrated is a decentralized prediction markets platform built on Solana blockchain, enabling users to trade on real-world events with complete transparency and security.\n\n🎯 Our Mission\nDemocratize access to prediction markets and harness collective intelligence to forecast future events.\n\n⚡ Our Technology\nLightning-fast Solana blockchain ensures instant settlements and minimal fees.\n\n🌍 Our Community\n142,000+ active traders worldwide making millions in predictions daily.\n\n💎 Our Values\n• Transparency\n• Decentralization\n• User empowerment\n• Innovation\n\nJoin us in building the future of forecasting!'
                )}>About Us</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Careers', 
                  'Join Our Team\n\nWe\'re building the future of prediction markets and looking for passionate individuals to join us.\n\n🚀 Open Positions\n• Blockchain Engineers\n• Frontend Developers\n• Product Designers\n• Marketing Specialists\n• Community Managers\n• Data Scientists\n\n💼 What We Offer\n• Competitive salary\n• Token grants\n• Remote work\n• Health benefits\n• Learning budget\n• Amazing team culture\n\n🌟 Why Join Us\n• Work on cutting-edge Web3 technology\n• Shape the future of prediction markets\n• Global, diverse team\n• Fast-paced startup environment\n\nInterested? Connect with us on LinkedIn!'
                )}>Careers</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Press Kit', 
                  'Press & Media Kit\n\n📸 Brand Assets\n• Logos (all formats)\n• Color palette\n• Typography guidelines\n• Brand guidelines\n\n📰 Press Releases\n• Latest announcements\n• Product launches\n• Partnership news\n• Milestone updates\n\n📊 Company Facts\n• Founded: 2024\n• Platform: Solana\n• Users: 142,000+\n• Volume: $847M+\n• Markets: 1,200+\n\n📧 Media Contact\nFor press inquiries and interviews, reach out through our contact page.\n\nHelping media tell our story accurately!'
                )}>Press Kit</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Contact Us', 
                  'Get in Touch\n\n📧 Support Email\nsupport@polyintegrated.com\n24/7 response time\n\n💬 Community\n• Discord: Join our active community\n• Twitter: @PolyIntegrated\n• Telegram: t.me/polyintegrated\n\n🏢 Business Inquiries\npartnerships@polyintegrated.com\n\n🐛 Bug Reports\nbugs@polyintegrated.com\nResponsible disclosure encouraged\n\n⚖️ Legal\nlegal@polyintegrated.com\n\nWe typically respond within 24 hours!'
                )}>Contact</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Partners', 
                  'Our Partners\n\n🤝 Blockchain Partners\n• Solana Foundation\n• Leading validators\n• DeFi protocols\n\n💼 Business Partners\n• Market data providers\n• Payment processors\n• Liquidity providers\n\n🎓 Research Partners\n• Universities\n• Think tanks\n• Research institutions\n\n🌟 Become a Partner\nInterested in partnering with us?\n• Technology integration\n• Data partnerships\n• Market making\n• Co-marketing\n\nReach out to explore opportunities!'
                )}>Partners</div>
                <div className="text-green-600 hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Affiliate Program', 
                  'Affiliate Program\n\n💰 Earn by Referring\nEarn commission for every user you refer to Poly Integrated.\n\n📊 Commission Structure\n• 10% of trading fees (lifetime)\n• Bonus for active traders\n• Monthly payouts\n• No minimum threshold\n\n🎯 Benefits\n• Custom tracking links\n• Real-time dashboard\n• Marketing materials\n• Dedicated support\n\n📈 Top Affiliates Earn\n$5,000 - $50,000 per month\n\n✅ Join Today\nConnect your wallet and access the affiliate dashboard to get started!\n\nGrow with us and earn passive income!'
                )}>Affiliates</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-500/20 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-wrap gap-4 text-xs text-green-600">
                <span className="hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Terms of Service', 
                  'Terms of Service\n\nBy using Poly Integrated, you agree to:\n\n1. User Responsibilities\n• You are 18+ years old\n• Comply with local laws\n• Secure your wallet\n• Trade responsibly\n\n2. Platform Usage\n• No market manipulation\n• No automated abuse\n• Honest participation\n\n3. Risk Disclosure\n• Trading involves risk\n• Past performance ≠ future results\n• Only invest what you can afford to lose\n\n4. Intellectual Property\n• Platform content is protected\n• Fair use policies apply\n\nLast updated: Feb 2026'
                )}>Terms of Service</span>
                <span className="hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Privacy Policy', 
                  'Privacy Policy\n\nYour privacy is important to us.\n\n🔒 Data Collection\n• Wallet addresses (public)\n• Trading activity\n• Platform usage\n• No personal emails stored\n\n🛡️ Data Usage\n• Improve platform\n• Prevent fraud\n• Analyze trends\n• Never sold to third parties\n\n🌐 Blockchain Data\n• All trades are public on Solana\n• Wallet addresses visible on-chain\n• Decentralized and transparent\n\n✅ Your Rights\n• Access your data\n• Request deletion\n• Opt-out of analytics\n\nLast updated: Feb 2026'
                )}>Privacy Policy</span>
                <span className="hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Cookie Policy', 
                  'Cookie Policy\n\n🍪 We Use Cookies\n\nEssential Cookies:\n• Keep you logged in\n• Remember preferences\n• Platform functionality\n\nAnalytics Cookies:\n• Usage statistics\n• Performance monitoring\n• User experience improvements\n\n🎯 Marketing Cookies:\n• Not used currently\n\n⚙️ Manage Cookies\nYou can control cookies through your browser settings. Blocking essential cookies may affect platform functionality.\n\n📱 Third-Party Cookies\n• None currently used\n\nLast updated: Feb 2026'
                )}>Cookie Policy</span>
                <span className="hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Disclaimer', 
                  'Disclaimer\n\n⚠️ Important Notice\n\n1. Not Financial Advice\nPoly Integrated provides a platform for prediction markets. Nothing on this platform constitutes financial, legal, or investment advice.\n\n2. Risk Warning\n• All trading involves risk\n• You can lose your entire investment\n• Past performance does not guarantee future results\n• Markets can be volatile\n\n3. No Guarantees\n• Platform provided "as is"\n• No guaranteed uptime\n• No guaranteed profits\n• Technical issues may occur\n\n4. Your Responsibility\n• Do your own research\n• Understand the risks\n• Trade responsibly\n• Consult professionals\n\n5. Regulatory Status\nCheck your local regulations regarding prediction markets.'
                )}>Disclaimer</span>
                <span className="hover:text-green-400 transition-colors cursor-pointer" onClick={() => showInfo('Responsible Trading', 
                  'Responsible Trading Guidelines\n\n🎯 Trade Smart, Stay Safe\n\n✅ Best Practices\n• Only invest what you can afford to lose\n• Set personal limits\n• Take regular breaks\n• Don\'t chase losses\n• Keep emotions in check\n\n⚠️ Warning Signs\n• Trading beyond your means\n• Hiding trading activity\n• Neglecting responsibilities\n• Feeling anxious or stressed\n\n🛟 Get Help\nIf trading is affecting your life negatively:\n• Take a break\n• Set deposit limits\n• Seek professional help\n• Self-exclude if needed\n\n📞 Resources\n• National Problem Gambling Helpline\n• Financial counseling services\n• Mental health support\n\nYour wellbeing matters most!'
                )}>Responsible Trading</span>
              </div>
              <div className="text-xs text-green-700 md:text-right">
                <p className="mb-1">Risk Warning: Trading prediction markets involves risk.</p>
                <p>Only trade with funds you can afford to lose.</p>
              </div>
            </div>
            
            <div className="text-center text-green-600 text-sm pt-6 border-t border-green-500/10">
              <p className="mb-2">© 2026 Poly Integrated. All rights reserved.</p>
              <p className="text-xs text-green-700">
                Powered by blockchain technology • Secured by smart contracts • Trusted by 142,000+ traders worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Market Detail Modal */}
      {showMarketModal && selectedMarket && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowMarketModal(false)}
        >
          <div 
            className="gradient-border rounded-2xl p-8 max-w-2xl w-full bg-black glow-border fade-in relative overflow-hidden shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/40 mb-3 inline-block">
                    {selectedMarket.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-green-100 mb-2">
                    {selectedMarket.title}
                  </h2>
                  <p className="text-green-500 flex items-center space-x-2">
                    <Clock size={16} />
                    <span>Ends: {selectedMarket.endDate}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setShowMarketModal(false)}
                  className="text-green-400 hover:text-green-300 transition-colors hover:rotate-90 transform duration-300"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => handleTrade(selectedMarket, 'YES')}
                  className="p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500/40 hover:border-green-500/60 hover:from-green-500/30 hover:to-green-500/20 transition-all group relative overflow-hidden shadow-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative">
                    <div className="text-sm text-green-600 mb-2 group-hover:text-green-500 font-bold uppercase tracking-wider">BUY YES</div>
                    <div className="text-5xl font-display font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">{selectedMarket.yesPrice}¢</div>
                    <div className="text-xs text-green-700">per share</div>
                  </div>
                </button>
                <button 
                  onClick={() => handleTrade(selectedMarket, 'NO')}
                  className="p-6 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 border-2 border-red-500/40 hover:border-red-500/60 hover:from-red-500/30 hover:to-red-500/20 transition-all group relative overflow-hidden shadow-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative">
                    <div className="text-sm text-red-600 mb-2 group-hover:text-red-500 font-bold uppercase tracking-wider">BUY NO</div>
                    <div className="text-5xl font-display font-bold text-red-400 mb-2 group-hover:scale-110 transition-transform">{selectedMarket.noPrice}¢</div>
                    <div className="text-xs text-red-700">per share</div>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 p-6 bg-black/40 border border-green-500/20 rounded-xl backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-1 font-medium">Trading Volume</div>
                  <div className="text-3xl font-display font-bold text-green-400">{selectedMarket.volume}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-1 font-medium">Active Traders</div>
                  <div className="text-3xl font-display font-bold text-green-400">{selectedMarket.traders}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-1 font-medium">Liquidity</div>
                  <div className="text-2xl font-display font-bold text-green-400">{selectedMarket.liquidity}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-1 font-medium">Market Ends</div>
                  <div className="text-lg font-semibold text-green-400">{selectedMarket.endDate}</div>
                </div>
              </div>

              <div className="text-center text-sm text-green-700 mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                {walletAddress ? 'Wallet connected. Ready to trade!' : 'Connect your wallet to start trading'}
              </div>

              <button 
                onClick={() => setShowMarketModal(false)}
                className="w-full py-3 bg-gradient-to-r from-green-500/10 to-green-500/20 border border-green-500/40 rounded-lg text-green-400 hover:from-green-500/20 hover:to-green-500/30 transition-all font-semibold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowInfoModal(false)}
        >
          <div 
            className="gradient-border rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-black glow-border fade-in relative overflow-hidden shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5 opacity-50"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-green-100">
                  {infoModalContent.title}
                </h2>
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0 ml-4 hover:rotate-90 transform duration-300"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="text-green-300 leading-relaxed whitespace-pre-line mb-6 p-6 bg-black/40 rounded-xl border border-green-500/20 backdrop-blur-sm">
                {infoModalContent.content}
              </div>

              <button 
                onClick={() => setShowInfoModal(false)}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-lg font-bold hover:from-green-400 hover:to-green-500 transition-all glow-border relative overflow-hidden group text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Got It!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;