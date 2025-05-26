
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Activity, BarChart3, Zap, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Analysis',
      description: 'Live sentiment and emotion detection from incoming helpdesk calls'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards with detailed emotion and sentiment metrics'
    },
    {
      icon: Zap,
      title: 'Speech-to-Text',
      description: 'Powered by cutting-edge AI for accurate transcription and analysis'
    },
    {
      icon: Shield,
      title: 'Emotion Recognition',
      description: 'Deep learning models trained on RAVDESS dataset for precise emotion detection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative px-6 pt-20 pb-32 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              CallSense Insight
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Advanced Sentiment Analysis & Emotion Recognition for Helpdesk Calls
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Harness the power of AI to understand customer emotions in real-time. 
              Our platform combines speech-to-text technology with sophisticated sentiment 
              analysis to transform how businesses handle customer support.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              View Live Dashboard
            </Link>
            <Link
              to="/demo"
              className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Try Demo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="px-6 py-20 sm:px-12 lg:px-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'React.js', 'Python Flask', 'TensorFlow', 'Twilio API',
              'Google STT', 'WebSocket', 'MongoDB', 'Tailwind CSS'
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 font-semibold text-gray-200 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 sm:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Customer Support?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our comprehensive documentation and live demonstrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/docs"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Read Documentation
            </Link>
            <Link
              to="/history"
              className="border-2 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Call History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
