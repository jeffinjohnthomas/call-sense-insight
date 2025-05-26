
import React, { useState, useEffect } from 'react';
import { Activity, Phone, TrendingUp, Users, AlertCircle, Clock, Mic, MicOff } from 'lucide-react';
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
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Neutral', value: 40, color: '#6B7280' },
    { name: 'Angry', value: 15, color: '#EF4444' },
    { name: 'Sad', value: 10, color: '#3B82F6' },
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
    { label: 'Active Calls', value: '12', icon: Phone, color: 'text-green-400', change: '+2' },
    { label: 'Today\'s Calls', value: '247', icon: Activity, color: 'text-blue-400', change: '+23' },
    { label: 'Avg Sentiment', value: '0.6', icon: TrendingUp, color: 'text-purple-400', change: '+0.1' },
    { label: 'Agents Online', value: '8', icon: Users, color: 'text-yellow-400', change: '0' }
  ];

  const getSentimentColor = (score) => {
    if (score > 0.3) return 'text-green-400';
    if (score < -0.3) return 'text-red-400';
    return 'text-yellow-400';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      'Happy': 'text-green-400',
      'Angry': 'text-red-400',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Live Dashboard
            </h1>
            <p className="text-gray-400">Real-time sentiment and emotion analysis</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">System Online</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-400' : stat.change === '0' ? 'text-gray-400' : 'text-red-400'}`}>
                          {stat.change !== '0' && stat.change}
                        </span>
                      </div>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Transcript */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Live Transcription</CardTitle>
                  <div className="flex items-center space-x-2">
                    {isRecording ? (
                      <>
                        <Mic className="h-5 w-5 text-red-400" />
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-400">Recording</span>
                      </>
                    ) : (
                      <>
                        <MicOff className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Standby</span>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[200px] border border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
                    {transcript || "Waiting for incoming call..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            <Tabs defaultValue="sentiment" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                <TabsTrigger value="sentiment">Sentiment Trend</TabsTrigger>
                <TabsTrigger value="emotions">Emotions</TabsTrigger>
                <TabsTrigger value="volume">Call Volume</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sentiment" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle>Sentiment Over Time</CardTitle>
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
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle>Emotion Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={emotionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
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

              <TabsContent value="volume" className="space-y-4">
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle>Hourly Call Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={callVolumeData}>
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="calls" fill="#8884d8" />
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
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Current Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-3xl font-bold ${getSentimentColor(sentiment.score)}`}>
                    {sentiment.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    Score: {sentiment.score.toFixed(2)}
                  </div>
                  <Progress 
                    value={Math.abs(sentiment.score) * 50 + 50} 
                    className="w-full"
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
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Detected Emotion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-2xl font-bold ${getEmotionColor(emotion)}`}>
                    {emotion}
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center border border-gray-600">
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
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sentiment.score < -0.5 && (
                    <div className="flex items-center space-x-2 text-red-400 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">High negative sentiment detected</span>
                    </div>
                  )}
                  {emotion === 'Angry' && (
                    <div className="flex items-center space-x-2 text-orange-400 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Customer appears angry</span>
                    </div>
                  )}
                  {sentiment.score > 0.5 && (
                    <div className="flex items-center space-x-2 text-green-400 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Positive interaction detected</span>
                    </div>
                  )}
                  {sentiment.score >= -0.5 && sentiment.score <= 0.5 && emotion === 'Neutral' && (
                    <div className="flex items-center space-x-2 text-gray-400 p-2 bg-gray-500/10 rounded-lg border border-gray-500/20">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">No active alerts</span>
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
