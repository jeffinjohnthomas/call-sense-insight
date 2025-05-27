
import React from 'react';
import { Book, Code, Terminal, Database, Mic, Activity } from 'lucide-react';

const Documentation = () => {
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/calls/analyze',
      description: 'Analyze incoming call for sentiment and emotion',
      parameters: 'audio_url, call_id, customer_info'
    },
    {
      method: 'GET',
      endpoint: '/api/calls/history',
      description: 'Retrieve call history with analytics',
      parameters: 'page, limit, date_range'
    },
    {
      method: 'GET',
      endpoint: '/api/dashboard/metrics',
      description: 'Get real-time dashboard metrics',
      parameters: 'time_range, metric_type'
    },
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'User authentication endpoint',
      parameters: 'email, password'
    }
  ];

  const setupSteps = [
    {
      title: 'Clone Repository',
      command: 'git clone https://github.com/callsense/insight.git',
      description: 'Download the project files'
    },
    {
      title: 'Install Dependencies',
      command: 'npm install',
      description: 'Install all required packages'
    },
    {
      title: 'Environment Setup',
      command: 'cp .env.example .env',
      description: 'Configure environment variables'
    },
    {
      title: 'Start Development',
      command: 'npm run dev',
      description: 'Launch the development server'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Book className="h-12 w-12 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Documentation
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete guide to implementing and using CallSense Insight for your helpdesk operations
          </p>
        </div>

        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
            <Activity className="h-8 w-8 mr-3" />
            Project Overview
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              CallSense Insight is an advanced AI-powered platform that provides real-time sentiment analysis 
              and emotion recognition for helpdesk calls. Built with cutting-edge machine learning models, 
              it helps businesses understand customer emotions and improve support quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Core Technologies</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• React.js & TypeScript Frontend</li>
                  <li>• Python Flask Backend</li>
                  <li>• TensorFlow & RAVDESS Dataset</li>
                  <li>• Google Speech-to-Text API</li>
                  <li>• Twilio Voice Integration</li>
                </ul>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-3">Key Features</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Real-time emotion detection</li>
                  <li>• Sentiment analysis dashboard</li>
                  <li>• Call history & analytics</li>
                  <li>• WebSocket live updates</li>
                  <li>• RESTful API endpoints</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Instructions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
            <Terminal className="h-8 w-8 mr-3" />
            Setup Instructions
          </h2>
          <div className="space-y-6">
            {setupSteps.map((step, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 mb-3">{step.description}</p>
                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-green-400 text-sm">
                      {step.command}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
            <Code className="h-8 w-8 mr-3" />
            API Endpoints
          </h2>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      endpoint.method === 'GET' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-blue-300 font-mono">{endpoint.endpoint}</code>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 mb-1">{endpoint.description}</p>
                    <p className="text-sm text-gray-400">Parameters: {endpoint.parameters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Environment Variables */}
        <section>
          <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center">
            <Database className="h-8 w-8 mr-3" />
            Environment Configuration
          </h2>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Required Environment Variables</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
              <div className="text-green-400 mb-2"># API Configuration</div>
              <div className="text-gray-300">REACT_APP_API_URL=http://localhost:5000</div>
              <div className="text-gray-300">REACT_APP_TWILIO_ACCOUNT_SID=your_twilio_sid</div>
              <div className="text-gray-300">REACT_APP_GOOGLE_STT_API_KEY=your_google_key</div>
              <div className="text-green-400 mt-4 mb-2"># Database</div>
              <div className="text-gray-300">MONGODB_URI=mongodb://localhost:27017/callsense</div>
              <div className="text-green-400 mt-4 mb-2"># JWT Secret</div>
              <div className="text-gray-300">JWT_SECRET=your_jwt_secret_key</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
