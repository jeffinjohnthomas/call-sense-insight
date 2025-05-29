
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, User, Phone, Clock } from 'lucide-react';

interface Call {
  id: string;
  caller_name: string;
  caller_number: string;
  status: 'incoming' | 'active' | 'ended';
  agent_id?: string;
  started_at: string;
  answered_at?: string;
  duration_seconds: number;
}

interface LiveTranscriptPanelProps {
  transcript: string;
  isRecording: boolean;
  activeCall?: Call | null;
}

const LiveTranscriptPanel: React.FC<LiveTranscriptPanelProps> = ({
  transcript,
  isRecording,
  activeCall
}) => {
  const formatDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 rounded-3xl shadow-2xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle className="text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Live Transcription
          </CardTitle>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-700/50 border border-gray-600/50 hover:bg-gray-600/50 transition-all duration-300">
            {isRecording ? (
              <>
                <Mic className="h-4 w-4 text-rose-400" />
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-rose-300 font-medium">Recording</span>
              </>
            ) : (
              <>
                <MicOff className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Standby</span>
              </>
            )}
          </div>
        </div>
        
        {/* Active Call Info */}
        {activeCall && (
          <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                  <User className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-400">{activeCall.caller_name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Phone className="h-3 w-3" />
                    <span>{activeCall.caller_number}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-sm">
                  {activeCall.answered_at ? formatDuration(activeCall.answered_at) : '0:00'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900/50 rounded-2xl p-6 min-h-[200px] border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
          <p className="text-gray-300 leading-relaxed">
            {activeCall ? (
              transcript || `Connected to ${activeCall.caller_name}. Conversation will appear here...`
            ) : (
              transcript || "Waiting for incoming call..."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTranscriptPanel;
