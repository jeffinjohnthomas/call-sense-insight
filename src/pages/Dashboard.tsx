
import React, { useState, useEffect } from 'react';
import { Activity, Phone, TrendingUp, Users, AlertCircle, Clock, Mic, MicOff, Zap, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [currentCall, setCurrentCall] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral' });
  const [emotion, setEmotion] = useState('Neutral');
  const [isRecording, setIsRecording] = useState(false);
  
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
    { name: 'Happy', value: 35, color: '#06D6A0' },
    { name: 'Neutral', value: 40, color: '#118AB2' },
    { name: 'Angry', value: 15, color: '#EF476F' },
    { name: 'Sad', value: 10, color: '#FFD166' },
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
    { label: 'Active Calls', value: '12', icon: Phone, color: 'from-emerald-400 to-cyan-400', bgColor: 'bg-emerald-500/10', iconColor: 'text-emerald-400', change: '+2' },
    { label: 'Today\'s Calls', value: '247', icon: Activity, color: 'from-blue-400 to-indigo-400', bgColor: 'bg-blue-500/10', iconColor: 'text-blue-400', change: '+23' },
    { label: 'Avg Sentiment', value: '0.6', icon: TrendingUp, color: 'from-purple-400 to-pink-400', bgColor: 'bg-purple-500/10', iconColor: 'text-purple-400', change: '+0.1' },
    { label: 'Agents Online', value: '8', icon: Users, color: 'from-yellow-400 to-orange-400', bgColor: 'bg-yellow-500/10', iconColor: 'text-yellow-400', change: '0' }
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
      'Neutral': 'text-slate-400',
      'Surprised': 'text-purple-400'
    };
    return colors[emotion] || 'text-slate-400';
  };

  const chartConfig = {
    sentiment: {
      label: "Sentiment Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Live Dashboard
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">Real-time sentiment and emotion analysis</p>
          </div>
          <div className="flex items-center space-x-2 text-sm bg-emerald-500/10 px-3 py-2 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-medium">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent" style={{backgroundImage: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`}}>
                          {stat.value}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : stat.change === '0' ? 'text-slate-400 bg-slate-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                          {stat.change !== '0' && stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Live Transcript */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                  <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Live Transcription</CardTitle>
                  <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300">
                    {isRecording ? (
                      <>
                        <Mic className="h-4 w-4 text-rose-400" />
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm text-rose-400 font-medium">Recording</span>
                      </>
                    ) : (
                      <>
                        <MicOff className="h-4 w-4 text-slate-400" />
                        <span className="text-xs sm:text-sm text-slate-400">Standby</span>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900/50 rounded-xl p-4 min-h-[150px] sm:min-h-[200px] border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300">
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {transcript || "Waiting for incoming call..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <Tabs defaultValue="sentiment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 p-1 rounded-xl">
                <TabsTrigger value="sentiment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">
                  <span className="hidden sm:inline">Sentiment Trend</span>
                  <span className="sm:hidden">Sentiment</span>
                </TabsTrigger>
                <TabsTrigger value="emotions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300">
                  Emotions
                </TabsTrigger>
                <TabsTrigger value="volume" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300">
                  <span className="hidden sm:inline">Call Volume</span>
                  <span className="sm:hidden">Volume</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="sentiment" className="space-y-4 mt-4">
                <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Sentiment Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
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
                            dot={{ fill: '#06D6A0', strokeWidth: 2, r: 5 }}
                            activeDot={{ r: 7, stroke: '#06D6A0', strokeWidth: 3, fill: '#ffffff' }}
                          />
                          <defs>
                            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#06D6A0" />
                              <stop offset="100%" stopColor="#118AB2" />
                            </linearGradient>
                          </defs>
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4 mt-4">
                <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Emotion Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
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
                <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Hourly Call Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={callVolumeData}>
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="calls" fill="url(#volumeGradient)" radius={[4, 4, 0, 0]} />
                          <defs>
                            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06D6A0" />
                              <stop offset="100%" stopColor="#118AB2" />
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
          <div className="space-y-4 sm:space-y-6">
            {/* Current Sentiment */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>Current Sentiment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-2xl sm:text-3xl font-bold ${getSentimentColor(sentiment.score)} group-hover:scale-105 transition-transform duration-300`}>
                    {sentiment.label}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400">
                    Score: {sentiment.score.toFixed(2)}
                  </div>
                  <Progress 
                    value={Math.abs(sentiment.score) * 50 + 50} 
                    className="w-full h-2 bg-slate-700"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Negative</span>
                    <span>Neutral</span>
                    <span>Positive</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Emotion */}
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                  <span>Detected Emotion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-xl sm:text-2xl font-bold ${getEmotionColor(emotion)} group-hover:scale-105 transition-transform duration-300`}>
                    {emotion}
                  </div>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600 hover:border-slate-500 hover:scale-110 transition-all duration-300 cursor-pointer">
                      <span className="text-xl sm:text-2xl">
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
            <Card className="bg-slate-800/40 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  <span>Active Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentiment.score < -0.5 && (
                    <div className="flex items-center space-x-2 text-rose-400 p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 hover:bg-rose-500/20 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">High negative sentiment detected</span>
                    </div>
                  )}
                  {emotion === 'Angry' && (
                    <div className="flex items-center space-x-2 text-orange-400 p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300 cursor-pointer">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">Customer appears angry</span>
                    </div>
                  )}
                  {sentiment.score > 0.5 && (
                    <div className="flex items-center space-x-2 text-emerald-400 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer">
                      <Activity className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">Positive interaction detected</span>
                    </div>
                  )}
                  {sentiment.score >= -0.5 && sentiment.score <= 0.5 && emotion === 'Neutral' && (
                    <div className="flex items-center space-x-2 text-slate-400 p-3 bg-slate-500/10 rounded-xl border border-slate-500/20 hover:bg-slate-500/20 transition-all duration-300 cursor-pointer">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">No active alerts</span>
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
