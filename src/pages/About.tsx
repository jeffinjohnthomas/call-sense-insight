
import React from 'react';
import { Users, Target, Lightbulb, Award, Heart, Zap, Shield, BarChart3, Activity, Mic } from 'lucide-react';

const About = () => {
  const coreFeatures = [
    {
      icon: Activity,
      title: 'Real-Time Emotion Detection',
      description: 'Advanced AI models analyze voice patterns to detect emotions like happiness, frustration, anger, and satisfaction in real-time during customer calls.'
    },
    {
      icon: BarChart3,
      title: 'Sentiment Analysis Dashboard',
      description: 'Comprehensive analytics dashboard providing insights into customer sentiment trends, call quality metrics, and team performance indicators.'
    },
    {
      icon: Mic,
      title: 'Speech-to-Text Integration',
      description: 'Powered by Google Speech-to-Text API for accurate transcription and analysis of customer conversations with multilingual support.'
    },
    {
      icon: Zap,
      title: 'Machine Learning Models',
      description: 'Trained on the RAVDESS dataset using TensorFlow, our models achieve 94% accuracy in emotion recognition and sentiment classification.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with data encryption, GDPR compliance, and secure API endpoints to protect sensitive customer information.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Deep insights into call patterns, emotional trends, and customer satisfaction metrics to help improve support operations.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Lead AI Engineer',
      image: '👩‍💻',
      description: 'Expert in machine learning and natural language processing with 8+ years of experience in voice analysis.'
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      image: '👨‍💻',
      description: 'Specializes in React, Node.js, and real-time applications. Previously worked at major tech companies.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Data Scientist',
      image: '👩‍🔬',
      description: 'PhD in Computer Science with focus on emotion recognition and sentiment analysis algorithms.'
    },
    {
      name: 'David Kim',
      role: 'DevOps Engineer',
      image: '👨‍🔧',
      description: 'Infrastructure specialist ensuring scalable, reliable deployment and monitoring of AI models.'
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing the boundaries of AI and machine learning to solve real-world customer service challenges.'
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'Understanding that every customer interaction matters and emotions drive meaningful connections.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality solutions with accuracy and reliability at the forefront.'
    },
    {
      icon: Lightbulb,
      title: 'Transparency',
      description: 'Open communication, clear insights, and honest feedback to build trust with our clients and users.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Users className="h-12 w-12 text-blue-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About CallSense
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing customer support through advanced AI-powered emotion recognition and sentiment analysis
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                To empower businesses with cutting-edge AI technology that understands and analyzes customer emotions 
                in real-time, enabling superior customer service experiences and data-driven decision making. We believe 
                that by understanding emotions, we can bridge the gap between technology and human connection.
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-12 text-center">Core Features & Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="mb-4">
                    <Icon className="h-12 w-12 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/40 transition-all duration-300">
                    <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-700/40 transition-all duration-300"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-400 mb-12 text-center">Technology Excellence</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">Frontend Technologies</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js with TypeScript</li>
                    <li>• Tailwind CSS for responsive design</li>
                    <li>• WebSocket for real-time updates</li>
                    <li>• Recharts for data visualization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">Backend & AI</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Python Flask API</li>
                    <li>• TensorFlow & RAVDESS Dataset</li>
                    <li>• Google Speech-to-Text API</li>
                    <li>• MongoDB for data storage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Customer Support?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using CallSense Insight to improve customer satisfaction 
              and gain valuable insights from every conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Schedule a Demo
              </button>
              <button className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
