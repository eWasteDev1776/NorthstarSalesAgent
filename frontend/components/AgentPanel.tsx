import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * Agent Panel Component
 * Displays agent identity, stats, and activity status
 */
export default function AgentPanel() {
  const [companyName, setCompanyName] = useState('Your Company');
  const [agentStats, setAgentStats] = useState({
    leadsGenerated: 128,
    openRate: 42,
    replies: 16,
    bestTag: 'Tech Startups',
  });

  // Fetch company profile in real app
  useEffect(() => {
    // This would be an API call in a real application
    // api.profile.get().then(res => {
    //   if (res.data) {
    //     setCompanyName(res.data.companyName);
    //   }
    // });
  }, []);

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Agent Identity Card */}
      <div className="card-glow">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3 glow">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6 text-primary"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Northstar</h3>
            <p className="text-sm text-muted-foreground">
              sales agent for <span className="text-primary">{companyName}</span>
            </p>
          </div>
        </div>

        <div className="border-t border-border/20 pt-3 mt-3">
          <p className="text-sm mb-2 text-muted-foreground">Agent Stats</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-background-soft p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Leads</p>
              <p className="text-lg font-semibold">{agentStats.leadsGenerated}</p>
            </div>
            <div className="bg-background-soft p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Open Rate</p>
              <p className="text-lg font-semibold">{agentStats.openRate}%</p>
            </div>
            <div className="bg-background-soft p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Replies</p>
              <p className="text-lg font-semibold">{agentStats.replies}</p>
            </div>
            <div className="bg-background-soft p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Best Leads</p>
              <p className="text-sm font-medium truncate">{agentStats.bestTag}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Activity Indicator */}
      <div className="bg-background-soft rounded-2xl p-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse mr-3"></div>
          <div>
            <p className="text-sm font-medium">Agent is active</p>
            <p className="text-xs text-muted-foreground">Monitoring lead quality</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border/20">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Current workload</span>
            <span className="text-xs font-medium">42%</span>
          </div>
          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-glow">
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full btn btn-primary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Lead Search
          </button>
          
          <button className="w-full btn btn-secondary flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 mr-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Leads
          </button>
        </div>
      </div>
      
      {/* Agent Memory Summary */}
      <div className="flex-1 bg-background-soft rounded-2xl p-4 overflow-auto">
        <h3 className="font-medium mb-3 text-sm">Agent Memory</h3>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground p-2 bg-background rounded-lg">
            <span className="block mb-1 text-foreground font-medium">Company Context</span>
            <p>Software dev agency, B2B focus, 5-50 employee clients</p>
          </div>
          <div className="text-xs text-muted-foreground p-2 bg-background rounded-lg">
            <span className="block mb-1 text-foreground font-medium">Best Performing Subject Line</span>
            <p>"Quick thought about [Company]'s development team"</p>
          </div>
          <div className="text-xs text-muted-foreground p-2 bg-background rounded-lg">
            <span className="block mb-1 text-foreground font-medium">Recent Insight</span>
            <p>Tech leads are 3x more responsive than marketing leads</p>
          </div>
        </div>
      </div>
    </div>
  );
}
