
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Activity, BarChart3, Zap, Shield, Play, ChevronRight, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 overflow-hidden font-inter">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Main Title with Staggered Animation */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in opacity-0 animation-delay-300">
                CallSense Insight
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed animate-fade-in opacity-0 animation-delay-600">
                Advanced Sentiment Analysis & Emotion Recognition for Helpdesk Calls
              </p>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto animate-fade-in opacity-0 animation-delay-900">
                Harness the power of AI to understand customer emotions in real-time. 
                Our platform combines speech-to-text technology with sophisticated sentiment 
                analysis to transform how businesses handle customer support.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in opacity-0 animation-delay-1200">
              <button
                onClick={scrollToAuth}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ArrowRight className="h-6 w-6" />
                  Get Started
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <Link
                to="/demo"
                className="group border-2 border-blue-400 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 backdrop-blur-sm bg-white/70"
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

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
            <span className="text-sm font-medium">Explore Features</span>
            <ArrowDown className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Features Section with Staggered Animation */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in opacity-0"
                  style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
                >
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-colors duration-300"></div>
                    <Icon className="relative h-12 w-12 text-blue-500 group-hover:text-blue-600 transition-colors duration-300 group-hover:scale-110 transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Technology Stack */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 font-semibold text-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-blue-300 animate-fade-in opacity-0 shadow-lg"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <span className="transition-colors duration-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div id="auth-section" className="relative px-6 py-20 sm:px-12 lg:px-16 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform Customer Support?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of businesses already using CallSense Insight to improve their customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center gap-2">
                  Create Account
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/login"
                className="group bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Sign In
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore More Resources
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Dive deeper into our comprehensive documentation and live demonstrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="group bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Read Documentation
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                to="/history"
                className="group bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
