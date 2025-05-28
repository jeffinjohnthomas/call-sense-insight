
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Activity, BarChart3, Zap, Shield, Play, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

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

  const scrollToAuth = () => {
    document.getElementById('auth-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden font-inter">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Main Title with Glowing Effect */}
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-cyan-400 mr-3 animate-pulse" />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in opacity-0 animation-delay-300 drop-shadow-2xl">
                  CallSense Insight
                </h1>
                <Sparkles className="h-8 w-8 text-pink-400 ml-3 animate-pulse delay-500" />
              </div>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in opacity-0 animation-delay-600 drop-shadow-lg">
                Advanced Sentiment Analysis & Emotion Recognition for Helpdesk Calls
              </p>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in opacity-0 animation-delay-900">
                Harness the power of AI to understand customer emotions in real-time. 
                Our platform combines speech-to-text technology with sophisticated sentiment 
                analysis to transform how businesses handle customer support.
              </p>
            </div>
            
            {/* Neon CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 animation-delay-1200">
              <button
                onClick={scrollToAuth}
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden border border-cyan-400/30"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ArrowRight className="h-6 w-6" />
                  Get Started
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </button>
              <Link
                to="/demo"
                className="group border-2 border-purple-400 bg-gray-800/50 backdrop-blur-sm text-purple-300 hover:bg-purple-500/20 hover:text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <span className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Try Demo
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer group">
            <span className="text-sm font-medium group-hover:text-cyan-300">Explore Features</span>
            <ArrowDown className="h-6 w-6 group-hover:text-cyan-400" />
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Powerful Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 hover:border-cyan-500/50 rounded-3xl p-8 hover:bg-gray-800/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in opacity-0 cursor-pointer"
                  style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
                >
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-cyan-500/30 rounded-2xl blur-xl transition-colors duration-300"></div>
                    <Icon className="relative h-12 w-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:scale-110 transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Technology Stack
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 rounded-2xl p-6 font-bold text-gray-200 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-cyan-500/10 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 animate-fade-in opacity-0 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="transition-colors duration-300 group-hover:text-cyan-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div id="auth-section" className="relative px-6 py-20 sm:px-12 lg:px-16 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Ready to Transform Customer Support?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Join thousands of businesses already using CallSense Insight to improve their customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 border border-purple-400/30"
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/login"
                className="group bg-gray-800/60 text-gray-200 hover:bg-gray-700/60 hover:text-white border-2 border-gray-600 hover:border-cyan-400 px-12 py-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Sign In
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Explore More Resources
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Dive deeper into our comprehensive documentation and live demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="group bg-gray-800/60 border-2 border-gray-600 hover:border-purple-400 text-gray-200 hover:bg-gray-700/60 hover:text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Read Documentation
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/history"
                className="group bg-gray-800/60 border-2 border-gray-600 hover:border-cyan-400 text-gray-200 hover:bg-gray-700/60 hover:text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 backdrop-blur-sm"
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
