import { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';

// Log entry types to allow for different styling
type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'system';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  level: LogLevel;
}

/**
 * Agent Log Feed Component
 * Terminal-style log with typewriter animation for real-time agent activities
 */
export default function AgentLogFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Load initial logs (in a real app, this would be an API call)
  useEffect(() => {
    // Mock data for demo purposes
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        message: 'Agent initialized and ready',
        level: 'system',
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
        message: 'Received search query: "Find boutique gyms in Nashville that offer small classes"',
        level: 'info',
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
        message: 'Analyzing query... Lead type: Brick & Mortar, Location: Nashville, Keywords: boutique, gym, small classes',
        level: 'info',
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
        message: 'Using ScraperAPI to search Google Maps',
        level: 'info',
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
        message: 'Found 32 potential leads matching criteria',
        level: 'success',
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        message: 'Filtering leads by relevance score...',
        level: 'info',
      },
      {
        id: '7',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        message: 'Website for "FitStudio Nashville" returned 403 error',
        level: 'warning',
      },
      {
        id: '8',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        message: 'Applying auto-tags: "fitness", "boutique", "small-business"',
        level: 'info',
      },
      {
        id: '9',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        message: 'Qualified 18 leads after enrichment',
        level: 'success',
      },
      {
        id: '10',
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        message: 'Ready to generate outreach messages',
        level: 'system',
      },
    ];
    
    setLogs(mockLogs);
    
    // In a real app, this would be something like:
    // api.logs.get(50).then(res => {
    //   if (res.data) {
    //     setLogs(res.data);
    //   }
    // });
  }, []);

  // Set up event stream for real-time logs (would connect to backend in real app)
  useEffect(() => {
    // Simulate log stream with interval for demo purposes
    const newLogMessages = [
      'Analyzing new search query...',
      'Scanning website content for contact info',
      'Found email address with 92% confidence',
      'Enriching lead with LinkedIn profile data',
      'Generating personalized email template',
      'Added 3 new leads to queue',
    ];
    
    let count = 0;
    const interval = setInterval(() => {
      if (count < newLogMessages.length) {
        const newLog: LogEntry = {
          id: `stream-${Date.now()}`,
          timestamp: new Date().toISOString(),
          message: newLogMessages[count],
          level: ['info', 'info', 'success', 'info', 'info', 'success'][count] as LogLevel,
        };
        
        setLogs(prev => [...prev, newLog]);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 4000);
    
    return () => clearInterval(interval);
    
    // In a real app, this would be something like:
    // const eventSource = api.logs.stream();
    // 
    // eventSource.onmessage = (event) => {
    //   const log = JSON.parse(event.data);
    //   setLogs(prev => [...prev, log]);
    // };
    // 
    // return () => {
    //   eventSource.close();
    // };
  }, []);

  // Auto-scroll logs when new entries appear
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Format timestamp
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Filter logs
  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter);

  return (
    <div className="h-full flex flex-col rounded-2xl bg-background-soft shadow-glow p-1">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/20">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        <div className="text-xs text-muted-foreground">Agent Log Terminal</div>
        <div className="flex items-center space-x-3">
          {/* Filter dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as LogLevel | 'all')}
            className="text-xs bg-background text-foreground px-2 py-1 rounded"
          >
            <option value="all">All logs</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="system">System</option>
          </select>
          
          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`text-xs flex items-center ${autoScroll ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-3 h-3 mr-1"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            Auto-scroll
          </button>
        </div>
      </div>

      {/* Log content */}
      <div 
        ref={logContainerRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-muted-foreground text-center py-4">
            No logs to display
          </div>
        ) : (
          <div className="space-y-1">
            {filteredLogs.map((log, index) => {
              // Determine text color based on log level
              const levelColorClass = {
                info: 'text-foreground',
                success: 'text-success',
                warning: 'text-warning',
                error: 'text-destructive',
                system: 'text-primary',
              }[log.level];
              
              // Add typewriter animation to the latest log entry
              const isLatest = index === filteredLogs.length - 1;
              
              return (
                <div key={log.id} className="flex">
                  <span className="text-muted-foreground mr-2">[{formatTime(log.timestamp)}]</span>
                  <span className={`${levelColorClass} ${isLatest ? 'typewriter' : ''}`}>
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Terminal prompt */}
      <div className="border-t border-border/20 p-3 flex items-center font-mono text-sm">
        <span className="text-primary mr-2">&#62;</span>
        <div className="h-4 w-2 bg-primary animate-blink"></div>
      </div>
    </div>
  );
}
