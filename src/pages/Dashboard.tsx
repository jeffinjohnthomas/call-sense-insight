import React, { useState, useEffect } from 'react';
import { Activity, Phone, TrendingUp, Users, AlertCircle, Clock, Mic, MicOff, Zap, Heart, Star, User, Settings, LogOut, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import IncomingCallList from '@/components/IncomingCallList';
import LiveTranscriptPanel from '@/components/LiveTranscriptPanel';

interface Call {
  id: string;
  caller_name: string;
  caller_number: string;
  status: 'incoming' | 'active' | 'ended';
  agent_id?: string;
  started_at: string;
  answered_at?: string;
  duration_seconds: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral' });
  const [emotion, setEmotion] = useState('Neutral');
  const [isRecording, setIsRecording] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  // Get user info from localStorage as fallback
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const userName = localStorage.getItem('userName') || 'User';
  
  // Fetch user profile from Supabase (commented out until profiles table is created)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // TODO: Uncomment this after running the profiles table migration
          /*
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            setUserProfile(profile);
          }
          */
          console.log('User authenticated:', user.email);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDisplayName = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name;
    }
    return userName !== 'User' ? userName : null;
  };

  const getWelcomeMessage = () => {
    const displayName = getDisplayName();
    if (displayName) {
      return `Welcome, ${displayName}!`;
    }
    return 'Welcome!';
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    
    navigate('/login');
  };

  const handleCallPicked = (call: Call) => {
    setCurrentCall(call);
    setIsRecording(true);
    setTranscript('');
  };
  
  // Mock real-time data for charts
  const [sentimentHistory, setSentimentHistory] = useState([
    { time: '10:00', sentiment: 0.2 },
    { time: '10:05', sentiment: -0.1 },
    { time: '10:10', sentiment: 0.6 },
    { time: '10:15', sentiment: -0.4 },
    { time: '10:20', sentiment: 0.8 },
    { time: '10:25', sentiment: 0.3 },
  ]);

  const emotionData = [
    { name: 'Happy', value: 35, color: '#06B6D4' },
    { name: 'Neutral', value: 40, color: '#8B5CF6' },
    { name: 'Angry', value: 15, color: '#EF4444' },
    { name: 'Sad', value: 10, color: '#F59E0B' },
  ];

  const callVolumeData = [
    { hour: '8AM', calls: 12 },
    { hour: '10AM', calls: 28 },
    { hour: '12PM', calls: 45 },
    { hour: '2PM', calls: 38 },
    { hour: '4PM', calls: 52 },
    { hour: '6PM', calls: 29 },
  ];

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const transcripts = [
        "Hello, I'm having trouble with my account access...",
        "This is really frustrating, I've been waiting for hours!",
        "Thank you so much for your help, that worked perfectly!",
        "I'm not sure I understand what you're asking me to do.",
        "Could you please transfer me to someone else?"
      ];
      
      const emotions = ['Happy', 'Angry', 'Sad', 'Neutral', 'Surprised'];
      const sentiments = [
        { score: 0.8, label: 'Positive' },
        { score: -0.6, label: 'Negative' },
        { score: 0.9, label: 'Positive' },
        { score: 0.1, label: 'Neutral' },
        { score: -0.3, label: 'Negative' }
      ];
      
      const randomIndex = Math.floor(Math.random() * transcripts.length);
      setTranscript(transcripts[randomIndex]);
      setEmotion(emotions[randomIndex]);
      setSentiment(sentiments[randomIndex]);
      setIsRecording(Math.random() > 0.3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Calls', value: '12', icon: Phone, color: 'from-cyan-400 to-blue-400', bgColor: 'bg-cyan-500/10', iconColor: 'text-cyan-400', textColor: 'text-cyan-300', change: '+2' },
    { label: 'Today\'s Calls', value: '247', icon: Activity, color: 'from-purple-400 to-pink-400', bgColor: 'bg-purple-500/10', iconColor: 'text-purple-400', textColor: 'text-purple-300', change: '+23' },
    { label: 'Avg Sentiment', value: '0.6', icon: TrendingUp, color: 'from-emerald-400 to-cyan-400', bgColor: 'bg-emerald-500/10', iconColor: 'text-emerald-400', textColor: 'text-emerald-300', change: '+0.1' },
    { label: 'Agents Online', value: '8', icon: Users, color: 'from-orange-400 to-yellow-400', bgColor: 'bg-orange-500/10', iconColor: 'text-orange-400', textColor: 'text-orange-300', change: '0' }
  ];

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'text-emerald-400';
    if (score < -0.3) return 'text-rose-400';
    return 'text-amber-400';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      'Happy': 'text-emerald-400',
      'Angry': 'text-rose-400',
      'Sad': 'text-blue-400',
      'Neutral': 'text-gray-400',
      'Surprised': 'text-purple-400'
    };
    return colors[emotion] || 'text-gray-400';
  };

  const chartConfig = {
    sentiment: {
      label: "Sentiment Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 bg-gray-800/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Live Dashboard
                </h1>
                <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <p className="text-lg text-gray-300">{getWelcomeMessage()}</p>
            <p className="text-sm text-gray-400">Real-time sentiment and emotion analysis</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 font-medium">System Online</span>
            </div>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full bg-gray-800/60 border border-gray-600/50 hover:border-cyan-500/50 p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 shadow-lg hover:shadow-cyan-500/20">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-sm font-bold">
                      {getInitials(getDisplayName() || userName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-56 bg-gray-800/95 backdrop-blur-xl border-gray-600/50 shadow-2xl rounded-2xl text-white" 
                align="end"
                sideOffset={5}
              >
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-200">{getDisplayName() || userName}</p>
                    <p className="text-xs text-gray-400">{userProfile?.email || userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="bg-gray-600/50" />
                
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer mx-2 rounded-xl">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer mx-2 rounded-xl">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-gray-600/50" />
                
                <DropdownMenuItem 
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer mx-2 rounded-xl"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/60 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 group cursor-pointer rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {stat.value}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/30' : stat.change === '0' ? 'text-gray-400 bg-gray-500/20 border border-gray-500/30' : 'text-rose-300 bg-rose-500/20 border border-rose-500/30'}`}>
                          {stat.change !== '0' && stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl ${stat.bgColor} border border-gray-600/30 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-500/50`}>
                      <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Live Transcript and Charts */}
          <div className="xl:col-span-2 space-y-6">
            {/* Live Transcript with Active Call Info */}
            <LiveTranscriptPanel 
              transcript={transcript}
              isRecording={isRecording}
              activeCall={currentCall}
            />

            {/* Charts Section */}
            <Tabs defaultValue="sentiment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 border border-gray-700/50 p-1 rounded-2xl backdrop-blur-xl">
                <TabsTrigger value="sentiment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-xl text-gray-300">
                  <span className="hidden sm:inline">Sentiment Trend</span>
                  <span className="sm:hidden">Sentiment</span>
                </TabsTrigger>
                <TabsTrigger value="emotions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl text-gray-300">
                  Emotions
                </TabsTrigger>
                <TabsTrigger value="volume" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 rounded-xl text-gray-300">
                  <span className="hidden sm:inline">Call Volume</span>
                  <span className="sm:hidden">Volume</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sentiment" className="space-y-4 mt-4">
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-200">Sentiment Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sentimentHistory}>
                          <XAxis dataKey="time" />
                          <YAxis domain={[-1, 1]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="sentiment" 
                            stroke="url(#sentimentGradient)" 
                            strokeWidth={3}
                            dot={{ fill: '#06B6D4', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: '#06B6D4', strokeWidth: 3, fill: '#ffffff' }}
                          />
                          <defs>
                            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#06B6D4" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4 mt-4">
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-200">Emotion Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={emotionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={window.innerWidth < 640 ? 60 : 80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {emotionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volume" className="space-y-4 mt-4">
                <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-200">Hourly Call Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={callVolumeData}>
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="calls" fill="url(#volumeGradient)" radius={[8, 8, 0, 0]} />
                          <defs>
                            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10F2C4" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Call Management and Analysis */}
          <div className="space-y-6">
            {/* Incoming Call List */}
            <IncomingCallList onCallPicked={handleCallPicked} />

            {/* Analysis Panel */}
            <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/60 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group rounded-3xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-200">Current Sentiment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-3xl font-bold ${getSentimentColor(sentiment.score)} group-hover:scale-105 transition-transform duration-300`}>
                    {sentiment.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    Score: {sentiment.score.toFixed(2)}
                  </div>
                  <Progress 
                    value={Math.abs(sentiment.score) * 50 + 50} 
                    className="w-full h-3 bg-gray-700 rounded-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Emotion */}
            <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:bg-gray-800/60 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group rounded-3xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-200">Detected Emotion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-2xl font-bold ${getEmotionColor(emotion)} group-hover:scale-105 transition-transform duration-300`}>
                    {emotion}
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 border border-gray-600/50 flex items-center justify-center hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20">
                      <span className="text-2xl">
                        {emotion === 'Happy' && '😊'}
                        {emotion === 'Angry' && '😠'}
                        {emotion === 'Sad' && '😢'}
                        {emotion === 'Neutral' && '😐'}
                        {emotion === 'Surprised' && '😲'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 rounded-3xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <span className="text-gray-200">Active Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentiment.score < -0.5 && (
                    <div className="flex items-center space-x-2 text-rose-300 p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl hover:bg-rose-500/20 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">High negative sentiment detected</span>
                    </div>
                  )}
                  {emotion === 'Angry' && (
                    <div className="flex items-center space-x-2 text-orange-300 p-3 bg-orange-500/10 border border-orange-500/30 rounded-2xl hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Customer appears angry</span>
                    </div>
                  )}
                  {sentiment.score > 0.5 && (
                    <div className="flex items-center space-x-2 text-emerald-300 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer">
                      <Activity className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Positive interaction detected</span>
                    </div>
                  )}
                  {sentiment.score >= -0.5 && sentiment.score <= 0.5 && emotion === 'Neutral' && (
                    <div className="flex items-center space-x-2 text-gray-400 p-3 bg-gray-500/10 border border-gray-500/30 rounded-2xl hover:bg-gray-500/20 transition-all duration-300 cursor-pointer">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">No active alerts</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
