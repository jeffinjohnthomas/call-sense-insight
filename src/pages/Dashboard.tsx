
import React, { useState, useEffect } from 'react';
import { Activity, Phone, TrendingUp, Users, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [currentCall, setCurrentCall] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral' });
  const [emotion, setEmotion] = useState('Neutral');
  
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Calls', value: '12', icon: Phone, color: 'text-green-400' },
    { label: 'Today\'s Calls', value: '247', icon: Activity, color: 'text-blue-400' },
    { label: 'Avg Sentiment', value: '0.6', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Agents Online', value: '8', icon: Users, color: 'text-yellow-400' }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Dashboard</h1>
          <p className="text-gray-400">Real-time sentiment and emotion analysis</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Transcript */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Live Transcription</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Recording</span>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[200px]">
                <p className="text-gray-300 leading-relaxed">
                  {transcript || "Waiting for incoming call..."}
                </p>
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Current Sentiment */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Current Sentiment</h3>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getSentimentColor(sentiment.score)}`}>
                  {sentiment.label}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Score: {sentiment.score.toFixed(2)}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      sentiment.score > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.abs(sentiment.score) * 50 + 50}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Current Emotion */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Detected Emotion</h3>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getEmotionColor(emotion)}`}>
                  {emotion}
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
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
            </div>

            {/* Alerts */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Alerts</h3>
              {sentiment.score < -0.5 && (
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">High negative sentiment detected</span>
                </div>
              )}
              {emotion === 'Angry' && (
                <div className="flex items-center space-x-2 text-orange-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">Customer appears angry</span>
                </div>
              )}
              {sentiment.score > 0.5 && (
                <div className="flex items-center space-x-2 text-green-400">
                  <Activity className="h-5 w-5" />
                  <span className="text-sm">Positive interaction</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
