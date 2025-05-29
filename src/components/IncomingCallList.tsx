
import React, { useState, useEffect } from 'react';
import { Phone, Clock, User, PhoneCall } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface IncomingCallListProps {
  onCallPicked: (call: Call) => void;
}

const IncomingCallList: React.FC<IncomingCallListProps> = ({ onCallPicked }) => {
  const [incomingCalls, setIncomingCalls] = useState<Call[]>([]);
  const [activeCalls, setActiveCalls] = useState<Call[]>([]);
  const [ringingAudio] = useState(() => {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwUBjCIzfPQeQ==';
    audio.loop = true;
    return audio;
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCalls();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('calls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calls'
        },
        (payload) => {
          console.log('Call update:', payload);
          fetchCalls();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      ringingAudio.pause();
    };
  }, []);

  const fetchCalls = async () => {
    try {
      const { data: calls, error } = await supabase
        .from('calls')
        .select('*')
        .order('started_at', { ascending: false });

      if (error) throw error;

      const incoming = calls?.filter(call => call.status === 'incoming') || [];
      const active = calls?.filter(call => call.status === 'active') || [];
      
      setIncomingCalls(incoming);
      setActiveCalls(active);

      // Play ringing sound if there are incoming calls
      if (incoming.length > 0) {
        ringingAudio.play().catch(console.error);
      } else {
        ringingAudio.pause();
      }
    } catch (error) {
      console.error('Error fetching calls:', error);
    }
  };

  const handlePickCall = async (call: Call) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to pick calls",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('calls')
        .update({ 
          status: 'active', 
          agent_id: user.id,
          answered_at: new Date().toISOString()
        })
        .eq('id', call.id);

      if (error) throw error;

      ringingAudio.pause();
      onCallPicked({ ...call, status: 'active', agent_id: user.id });
      
      toast({
        title: "Call picked successfully",
        description: `Connected to ${call.caller_name}`,
      });
    } catch (error) {
      console.error('Error picking call:', error);
      toast({
        title: "Error picking call",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Incoming Calls */}
      <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Phone className="h-5 w-5 text-cyan-400" />
            <span className="text-gray-200">Incoming Calls</span>
            {incomingCalls.length > 0 && (
              <div className="flex items-center space-x-2 ml-auto">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm font-medium">
                  {incomingCalls.length} waiting
                </span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incomingCalls.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No incoming calls</p>
            </div>
          ) : (
            <div className="space-y-3">
              {incomingCalls.map((call) => (
                <div 
                  key={call.id} 
                  className="flex items-center justify-between p-4 bg-gray-700/40 border border-gray-600/50 rounded-2xl hover:bg-gray-700/60 hover:border-red-500/50 transition-all duration-300 animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-500/20 border border-red-500/30 rounded-xl">
                      <User className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{call.caller_name}</h3>
                      <p className="text-sm text-gray-400">{call.caller_number}</p>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Waiting: {formatDuration(call.started_at)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handlePickCall(call)}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Pick Call
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Calls */}
      {activeCalls.length > 0 && (
        <Card className="bg-gray-800/40 backdrop-blur-xl border-gray-700/50 rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <PhoneCall className="h-5 w-5 text-emerald-400" />
              <span className="text-gray-200">Active Calls</span>
              <div className="flex items-center space-x-2 ml-auto">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">
                  {activeCalls.length} active
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeCalls.map((call) => (
                <div 
                  key={call.id} 
                  className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                      <User className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{call.caller_name}</h3>
                      <p className="text-sm text-gray-400">{call.caller_number}</p>
                      <div className="flex items-center space-x-1 text-xs text-emerald-400">
                        <Clock className="h-3 w-3" />
                        <span>Duration: {call.answered_at ? formatDuration(call.answered_at) : '0:00'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-medium">
                    In Progress
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncomingCallList;
