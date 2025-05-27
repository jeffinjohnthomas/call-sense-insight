
import React, { useState, useEffect } from 'react';
import { Activity, Phone, TrendingUp, Users, AlertCircle, Clock, Mic, MicOff, Zap, Heart, Star, User, Settings, LogOut } from 'lucide-react';
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentCall, setCurrentCall] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral' });
  const [emotion, setEmotion] = useState('Neutral');
  const [isRecording, setIsRecording] = useState(false);
  
  // Get user info from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const userName = localStorage.getItem('userName') || 'User';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Neutral', value: 40, color: '#3B82F6' },
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
    { label: 'Active Calls', value: '12', icon: Phone, color: 'from-emerald-400 to-cyan-400', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', textColor: 'text-emerald-700', change: '+2' },
    { label: 'Today\'s Calls', value: '247', icon: Activity, color: 'from-blue-400 to-indigo-400', bgColor: 'bg-blue-50', iconColor: 'text-blue-600', textColor: 'text-blue-700', change: '+23' },
    { label: 'Avg Sentiment', value: '0.6', icon: TrendingUp, color: 'from-purple-400 to-pink-400', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', textColor: 'text-purple-700', change: '+0.1' },
    { label: 'Agents Online', value: '8', icon: Users, color: 'from-orange-400 to-yellow-400', bgColor: 'bg-orange-50', iconColor: 'text-orange-600', textColor: 'text-orange-700', change: '0' }
  ];

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'text-emerald-600';
    if (score < -0.3) return 'text-rose-600';
    return 'text-amber-600';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      'Happy': 'text-emerald-600',
      'Angry': 'text-rose-600',
      'Sad': 'text-blue-600',
      'Neutral': 'text-gray-600',
      'Surprised': 'text-purple-600'
    };
    return colors[emotion] || 'text-gray-600';
  };

  const chartConfig = {
    sentiment: {
      label: "Sentiment Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 font-inter">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">
        {/* Header with Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-gray-200/50">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Live Dashboard
              </h1>
            </div>
            <p className="text-lg text-gray-600">Welcome back, <span className="font-semibold text-blue-600">{userEmail}</span>!</p>
            <p className="text-sm text-gray-500">Real-time sentiment and emotion analysis</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm bg-emerald-100 px-4 py-2 rounded-full border border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 font-medium">System Online</span>
            </div>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative rounded-full bg-white p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-56 bg-white/95 backdrop-blur-xl border-gray-200 shadow-xl rounded-2xl" 
                align="end"
                sideOffset={5}
              >
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator className="bg-gray-200" />
                
                <DropdownMenuItem className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer mx-2 rounded-xl">
                  <User className="mr-2 h-4 w-4" />
                  <span>View Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer mx-2 rounded-xl">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-gray-200" />
                
                <DropdownMenuItem 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer mx-2 rounded-xl"
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
              <Card key={index} className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:bg-white/90 hover:border-gray-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group cursor-pointer rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-2xl font-bold ${stat.textColor}`}>
                          {stat.value}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-emerald-600 bg-emerald-100' : stat.change === '0' ? 'text-gray-500 bg-gray-100' : 'text-rose-600 bg-rose-100'}`}>
                          {stat.change !== '0' && stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
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
          {/* Live Transcript */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 rounded-3xl shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                  <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Live Transcription</CardTitle>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300">
                    {isRecording ? (
                      <>
                        <Mic className="h-4 w-4 text-rose-500" />
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-rose-600 font-medium">Recording</span>
                      </>
                    ) : (
                      <>
                        <MicOff className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Standby</span>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-2xl p-6 min-h-[200px] border border-gray-200 hover:border-gray-300 transition-all duration-300">
                  <p className="text-gray-700 leading-relaxed">
                    {transcript || "Waiting for incoming call..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <Tabs defaultValue="sentiment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/50 p-1 rounded-2xl border border-gray-200">
                <TabsTrigger value="sentiment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                  <span className="hidden sm:inline">Sentiment Trend</span>
                  <span className="sm:hidden">Sentiment</span>
                </TabsTrigger>
                <TabsTrigger value="emotions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                  Emotions
                </TabsTrigger>
                <TabsTrigger value="volume" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300 rounded-xl">
                  <span className="hidden sm:inline">Call Volume</span>
                  <span className="sm:hidden">Volume</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sentiment" className="space-y-4 mt-4">
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 rounded-3xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">Sentiment Over Time</CardTitle>
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
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
                          />
                          <defs>
                            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4 mt-4">
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 rounded-3xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">Emotion Distribution</CardTitle>
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
                <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 rounded-3xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">Hourly Call Volume</CardTitle>
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
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="100%" stopColor="#3B82F6" />
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

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Current Sentiment */}
            <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-rose-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-800">Current Sentiment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-3xl font-bold ${getSentimentColor(sentiment.score)} group-hover:scale-105 transition-transform duration-300`}>
                    {sentiment.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    Score: {sentiment.score.toFixed(2)}
                  </div>
                  <Progress 
                    value={Math.abs(sentiment.score) * 50 + 50} 
                    className="w-full h-3 bg-gray-200 rounded-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Emotion */}
            <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-800">Detected Emotion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-2xl font-bold ${getEmotionColor(emotion)} group-hover:scale-105 transition-transform duration-300`}>
                    {emotion}
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 hover:scale-110 transition-all duration-300 cursor-pointer">
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
            <Card className="bg-white/80 backdrop-blur-xl border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span className="text-gray-800">Active Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentiment.score < -0.5 && (
                    <div className="flex items-center space-x-2 text-rose-600 p-3 bg-rose-50 rounded-2xl border border-rose-200 hover:bg-rose-100 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">High negative sentiment detected</span>
                    </div>
                  )}
                  {emotion === 'Angry' && (
                    <div className="flex items-center space-x-2 text-orange-600 p-3 bg-orange-50 rounded-2xl border border-orange-200 hover:bg-orange-100 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Customer appears angry</span>
                    </div>
                  )}
                  {sentiment.score > 0.5 && (
                    <div className="flex items-center space-x-2 text-emerald-600 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 hover:bg-emerald-100 transition-all duration-300 cursor-pointer">
                      <Activity className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm font-medium">Positive interaction detected</span>
                    </div>
                  )}
                  {sentiment.score >= -0.5 && sentiment.score <= 0.5 && emotion === 'Neutral' && (
                    <div className="flex items-center space-x-2 text-gray-600 p-3 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
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
