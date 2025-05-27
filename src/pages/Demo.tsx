
import React, { useState } from 'react';
import { Play, Pause, Mic, MicOff, BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

const Demo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [sentimentScore, setSentimentScore] = useState(0.7);

  const emotions = ['happy', 'sad', 'angry', 'neutral', 'surprised'];
  const callData = [
    { time: '14:30', emotion: 'neutral', sentiment: 0.6, caller: 'John Smith' },
    { time: '14:32', emotion: 'frustrated', sentiment: 0.3, caller: 'John Smith' },
    { time: '14:35', emotion: 'satisfied', sentiment: 0.8, caller: 'John Smith' },
  ];

  const demoMetrics = [
    { label: 'Total Calls Today', value: '127', icon: Users, color: 'text-blue-400' },
    { label: 'Average Sentiment', value: '0.72', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Call Duration Avg', value: '4:32', icon: Clock, color: 'text-purple-400' },
    { label: 'Emotion Accuracy', value: '94%', icon: BarChart3, color: 'text-yellow-400' },
  ];

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate real-time emotion detection
      const interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const randomSentiment = Math.random();
        setCurrentEmotion(randomEmotion);
        setSentimentScore(randomSentiment);
      }, 2000);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsRecording(false);
      }, 10000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Play className="h-12 w-12 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Interactive Demo
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience CallSense Insight's real-time emotion detection and sentiment analysis capabilities
          </p>
        </div>

        {/* Live Demo Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Live Call Analysis</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              {/* Recording Controls */}
              <div className="text-center mb-8">
                <button
                  onClick={handleRecordToggle}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-10 w-10 text-white" />
                  ) : (
                    <Mic className="h-10 w-10 text-white" />
                  )}
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                  )}
                </button>
                <p className="text-lg text-gray-300 mt-4">
                  {isRecording ? 'Recording & Analyzing...' : 'Click to Start Demo Call'}
                </p>
              </div>

              {/* Real-time Results */}
              {isRecording && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                  {/* Emotion Detection */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-300 mb-4">Current Emotion</h3>
                    <div className="text-center">
                      <div className={`text-6xl mb-4 ${
                        currentEmotion === 'happy' ? '😊' :
                        currentEmotion === 'sad' ? '😢' :
                        currentEmotion === 'angry' ? '😠' :
                        currentEmotion === 'surprised' ? '😲' : '😐'
                      }`}>
                        {currentEmotion === 'happy' ? '😊' :
                         currentEmotion === 'sad' ? '😢' :
                         currentEmotion === 'angry' ? '😠' :
                         currentEmotion === 'surprised' ? '😲' : '😐'}
                      </div>
                      <p className="text-2xl font-bold capitalize text-blue-400">{currentEmotion}</p>
                    </div>
                  </div>

                  {/* Sentiment Score */}
                  <div className="bg-gray-700/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4">Sentiment Score</h3>
                    <div className="text-center">
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-600"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${sentimentScore * 251.2} 251.2`}
                            className={`${sentimentScore > 0.6 ? 'text-green-400' : sentimentScore > 0.3 ? 'text-yellow-400' : 'text-red-400'}`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{(sentimentScore * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className={`text-lg font-semibold ${
                        sentimentScore > 0.6 ? 'text-green-400' : sentimentScore > 0.3 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {sentimentScore > 0.6 ? 'Positive' : sentimentScore > 0.3 ? 'Neutral' : 'Negative'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Demo Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Demo Dashboard Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:bg-gray-700/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                  <p className="text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sample Call History */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">Sample Call Analysis</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">Recent Call: Customer Support Session</h3>
                <p className="text-gray-400">Caller: John Smith | Duration: 4:32 | Status: Resolved</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {callData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400 font-mono">{entry.time}</span>
                        <span className="capitalize text-white">{entry.emotion}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">Sentiment:</span>
                          <span className={`font-semibold ${
                            entry.sentiment > 0.6 ? 'text-green-400' : entry.sentiment > 0.3 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {(entry.sentiment * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Integrate CallSense Insight into your helpdesk operations today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Start Free Trial
              </button>
              <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Demo;
