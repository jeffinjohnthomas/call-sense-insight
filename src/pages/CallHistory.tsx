
import React, { useState } from 'react';
import { Search, Filter, Download, Play } from 'lucide-react';

const CallHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('all');

  const callHistory = [
    {
      id: 1,
      date: '2024-05-26',
      time: '14:30',
      duration: '5:24',
      transcript: 'Customer called about billing issues, was initially frustrated but satisfied with resolution.',
      sentiment: 'Positive',
      sentimentScore: 0.7,
      emotion: 'Happy',
      agent: 'Sarah Johnson'
    },
    {
      id: 2,
      date: '2024-05-26',
      time: '13:45',
      duration: '8:12',
      transcript: 'Technical support request, customer very angry about repeated issues with product.',
      sentiment: 'Negative',
      sentimentScore: -0.8,
      emotion: 'Angry',
      agent: 'Mike Chen'
    },
    {
      id: 3,
      date: '2024-05-26',
      time: '12:20',
      duration: '3:15',
      transcript: 'Quick question about account features, neutral interaction throughout.',
      sentiment: 'Neutral',
      sentimentScore: 0.1,
      emotion: 'Neutral',
      agent: 'Emily Davis'
    },
    {
      id: 4,
      date: '2024-05-25',
      time: '16:45',
      duration: '12:30',
      transcript: 'Complex technical issue resolved successfully, customer very grateful.',
      sentiment: 'Positive',
      sentimentScore: 0.9,
      emotion: 'Happy',
      agent: 'David Wilson'
    },
    {
      id: 5,
      date: '2024-05-25',
      time: '15:20',
      duration: '6:45',
      transcript: 'Cancellation request, customer disappointed but understanding.',
      sentiment: 'Negative',
      sentimentScore: -0.4,
      emotion: 'Sad',
      agent: 'Lisa Brown'
    }
  ];

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.transcript.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSentiment === 'all' || call.sentiment.toLowerCase() === filterSentiment;
    return matchesSearch && matchesFilter;
  });

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'text-green-400 bg-green-400/10';
      case 'negative': return 'text-red-400 bg-red-400/10';
      default: return 'text-yellow-400 bg-yellow-400/10';
    }
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      'Happy': '😊',
      'Angry': '😠',
      'Sad': '😢',
      'Neutral': '😐',
      'Surprised': '😲'
    };
    return emojis[emotion] || '😐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Call History</h1>
          <p className="text-gray-400">Search and analyze past customer interactions</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search transcripts, agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterSentiment}
                onChange={(e) => setFilterSentiment(e.target.value)}
                className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Call History Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Date & Time</th>
                  <th className="text-left p-4 font-semibold">Duration</th>
                  <th className="text-left p-4 font-semibold">Transcript Preview</th>
                  <th className="text-left p-4 font-semibold">Sentiment</th>
                  <th className="text-left p-4 font-semibold">Emotion</th>
                  <th className="text-left p-4 font-semibold">Agent</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call, index) => (
                  <tr key={call.id} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-transparent'}>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{call.date}</div>
                        <div className="text-gray-400 text-sm">{call.time}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{call.duration}</td>
                    <td className="p-4">
                      <div className="max-w-xs truncate text-gray-300">
                        {call.transcript}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(call.sentiment)}`}>
                        {call.sentiment}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        Score: {call.sentimentScore.toFixed(2)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getEmotionEmoji(call.emotion)}</span>
                        <span className="text-sm text-gray-300">{call.emotion}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{call.agent}</td>
                    <td className="p-4">
                      <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <Play className="h-4 w-4" />
                        <span className="text-sm">Replay</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No calls found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallHistory;
