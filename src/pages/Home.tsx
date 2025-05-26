
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Activity, BarChart3, Zap, Shield, Play, ChevronRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Analysis',
      description: 'Live sentiment and emotion detection from incoming helpdesk calls',
      delay: '0ms'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards with detailed emotion and sentiment metrics',
      delay: '100ms'
    },
    {
      icon: Zap,
      title: 'Speech-to-Text',
      description: 'Powered by cutting-edge AI for accurate transcription and analysis',
      delay: '200ms'
    },
    {
      icon: Shield,
      title: 'Emotion Recognition',
      description: 'Deep learning models trained on RAVDESS dataset for precise emotion detection',
      delay: '300ms'
    }
  ];

  const techStack = [
    'React.js', 'Python Flask', 'TensorFlow', 'Twilio API',
    'Google STT', 'WebSocket', 'MongoDB', 'Tailwind CSS'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Main Title with Staggered Animation */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-fade-in opacity-0 animation-delay-300">
                CallSense Insight
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in opacity-0 animation-delay-600">
                Advanced Sentiment Analysis & Emotion Recognition for Helpdesk Calls
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in opacity-0 animation-delay-900">
                Harness the power of AI to understand customer emotions in real-time. 
                Our platform combines speech-to-text technology with sophisticated sentiment 
                analysis to transform how businesses handle customer support.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 animation-delay-1200">
              <Link
                to="/dashboard"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  View Live Dashboard
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/demo"
                className="group border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm bg-white/5"
              >
                <span className="flex items-center gap-2">
                  Try Demo
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
            <span className="text-sm font-medium">Explore Features</span>
            <ArrowDown className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Features Section with Staggered Animation */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in opacity-0"
                  style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
                >
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-colors duration-300"></div>
                    <Icon className="relative h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 group-hover:scale-110 transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Technology Stack */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-xl p-4 font-semibold text-gray-200 hover:from-blue-600/80 hover:to-purple-600/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-600/30 hover:border-blue-500/50 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="group-hover:text-white transition-colors duration-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Transform Customer Support?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our comprehensive documentation and live demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="group bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Read Documentation
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/history"
                className="group border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/5"
              >
                <span className="flex items-center gap-2">
                  View Call History
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
